import {
	ButtonBase,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	BottomNavigation,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Pagination } from "@material-ui/lab";
import React from "react";
import { Redirect } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistCard from "../components/artistCard";

let spotify = new SpotifyWebApi();
export default class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: "",
			searchTerm: "",
			dataSource: [],
			getAlbums: false,
			totalPages: 1,
			offset: 0,
			page: 0,
			timeout: 0,
			error: null,
		};
	}

	componentDidMount() {
		this.timer = null;
		let hash = window.location.hash.substr(1);
		let token = hash.split("&")[0].split("=")[1];
		this.setState({ token: token });
		spotify.setAccessToken(token);
		this.checkForPreviousState();
	}

	checkForPreviousState = () => {
		let search_term = localStorage.getItem("searchTerm");
		let data = localStorage.getItem("data");
		let total_pages = localStorage.getItem("totalPages");
		let page = localStorage.getItem("page");
		if (search_term !== null) {
			if (this.state.getAlbums) {
				localStorage.removeItem("searchTerm");
				localStorage.removeItem("data");
				localStorage.removeItem("totalPages");
				localStorage.removeItem("page");
			}
			this.setState({
				searchTerm: search_term,
				dataSource: JSON.parse(data),
				totalPages: parseInt(total_pages),
				page: parseInt(page),
			});
		}
	};

	handleChange = (e) => {
		clearTimeout(this.timer);
		this.setState({ searchTerm: e.target.value });
		this.timer = setTimeout(() => {
			if (this.state.searchTerm.trim() !== "") this.search();
		}, 1000);
	};

	handleKeyPress = (e) => {
		e.persist();
		this.setState({ searchTerm: e.target.value });
		if (e.keyCode === 13 && e.target.value.trim() !== "") {
			this.search();
		}
		if (e.keyCode === 8 && this.state.searchTerm === "") {
			this.setState({ dataSource: [], totalPages: 1, page: 0, error: null });
		}
	};

	search = (offset = 0, page = 1) => {
		let searchTerm = this.state.searchTerm;
		spotify
			.searchArtists(searchTerm, { offset: offset })
			.then((res) => {
				console.log(res);
				if (res.artists.items.length === 0) {
					this.setState({ error: "no results" });
				} else {
					let total_pages = Math.floor(res.artists.total / 20);
					if (total_pages > 100) {
						total_pages = 100;
					}
					this.setState({
						dataSource: res.artists.items,
						totalPages: total_pages,
						page: page,
						error: null,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				switch (err.status) {
					case 401:
						this.setState({ error: "unauthorized" });
						break;
					case 404:
						this.setState({ error: 404 });
						break;
					default:
						break;
				}
			});
	};

	loadPage = (page) => {
		let offset = page * 20 - 20;
		this.search(offset, page);
	};

	login = () => {
		window.location =
			"https://accounts.spotify.com/en/authorize?client_id=07bf4452c6e048a08f5ab7f6d00d16fc&redirect_uri=http://localhost:3000/search&response_type=token";
	};

	renderError = () => {
		switch (this.state.error) {
			case "unauthorized":
				return (
					<Dialog open={true}>
						<DialogTitle>Token expired</DialogTitle>
						<DialogContent>
							Your session has expired please login again
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									this.login();
								}}
							>
								Login
							</Button>
						</DialogActions>
					</Dialog>
				);
			case "no results":
				return (
					<Typography variant="h5" color="textSecondary">
						No results found
					</Typography>
				);
			default:
				break;
		}
	};

	render() {
		if (this.state.getAlbums === true) {
			localStorage.setItem("searchTerm", this.state.searchTerm);
			localStorage.setItem("data", JSON.stringify(this.state.dataSource));
			localStorage.setItem("totalPages", this.state.totalPages);
			localStorage.setItem("page", this.state.page);
			return (
				<Redirect
					push
					to={{
						pathname: "/albums",
						state: { id: this.state.id, artist_name: this.state.artist_name },
					}}
				></Redirect>
			);
		}
		return (
			<>
				<header>
					<TextField
						label="Search"
						placeholder="search for an artist"
						InputProps={{
							endAdornment: (
								<InputAdornment>
									<IconButton onClick={() => this.search()}>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="filled"
						fullWidth
						onChange={(e) => this.handleChange(e)}
						onKeyDown={(e) => this.handleKeyPress(e)}
						value={this.state.searchTerm}
					></TextField>
				</header>
				<div style={{ marginTop: 20, padding: 30 }}>
					<Grid container spacing={10} justify="center">
						{this.state.error !== null ? this.renderError() : null}
						{this.state.dataSource.map((artist) => (
							<Grid key={artist.id} item>
								<ButtonBase
									onClick={() =>
										this.setState({
											getAlbums: true,
											id: artist.id,
											artist_name: artist.name,
										})
									}
								>
									<ArtistCard
										id={artist.id}
										name={artist.name}
										image={artist.images[artist.images.length - 2]}
										followers={artist.followers.total}
										popularity={artist.popularity}
										uri={artist.uri}
									></ArtistCard>
								</ButtonBase>
							</Grid>
						))}
					</Grid>
				</div>
				{this.state.totalPages !== 1 ? (
					<Grid container justify="center">
						<Pagination
							size="large"
							count={this.state.totalPages}
							page={this.state.page}
							onChange={(event, page) => this.loadPage(page)}
						/>
					</Grid>
				) : null}
			</>
		);
	}
}
