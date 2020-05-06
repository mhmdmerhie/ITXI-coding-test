import { ButtonBase, Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
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
			getAlbums: props.getAlbums? props.getAlbums : false,
		};
	}

	componentDidMount() {
		let hash = window.location.hash.substr(1);
		let token = hash.split("&")[0].split("=")[1];
		this.setState({ token: token,  getAlbums: false });
		spotify.setAccessToken(token);
		this.checkForPreviousState();
	}

	checkForPreviousState = () => {
		let prev_state = localStorage.getItem('searchTerm')
		let data = localStorage.getItem('data')
		if (prev_state !== null){
			localStorage.removeItem('searchTerm')
			localStorage.removeItem('data')
			this.setState({searchTerm: prev_state, dataSource: JSON.parse(data)})
		} 
	}

	handleChange = (e) => {
		this.setState({searchTerm: e.target.value})
	}

	handleKeyPress = (e) => {
		e.persist();
		this.setState({ searchTerm: e.target.value });

		// Check if the pressed key is return and the search field is not empty
		if (e.keyCode === 13 && e.target.value !== "") {
			this.search();
		} else {
			if (this.state.searchTerm === "") {
				this.setState({dataSource: []})
			}
			else{
			// If user entered a character in the search field wait for 1 second before sending the request
			setTimeout(this.search, 1000);
			}
		}
	};

	search = () => {
		let searchTerm = this.state.searchTerm;
		spotify
			.searchArtists(searchTerm)
			.then((res) => {
				this.setState({ dataSource: res.artists.items });
			})
			.catch((err) => console.log(err));
	};

	render() {
		if (this.state.getAlbums === true) {
			localStorage.setItem('searchTerm', this.state.searchTerm)
			localStorage.setItem('data', JSON.stringify(this.state.dataSource))
			return <Redirect push to={{pathname: "/albums", state: {id: this.state.id, artist_name: this.state.artist_name}}}></Redirect>
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
									<IconButton onClick={()=>this.search()}>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="filled"
						fullWidth
						onChange={(e) => {this.handleChange(e)}}
						onKeyDown={this.handleKeyPress}
						value={this.state.searchTerm}
					></TextField>
				</header>
				<div style={{ marginTop: 20, padding: 30 }}>
					<Grid container spacing={10} justify="center">
						{this.state.dataSource.map((artist) => (
							<Grid key={artist.id} item>
								<ButtonBase  
									onClick={() =>
										this.setState({ getAlbums: true, id: artist.id, artist_name: artist.name })
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
			</>
		);
	}
}
