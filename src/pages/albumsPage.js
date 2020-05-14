import { AppBar, Grid, Typography } from "@material-ui/core";
import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import AlbumCard from "../components/albumCard";
import { Pagination } from "@material-ui/lab";

let spotify = new SpotifyWebApi();
export default class AlbumsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.location.state.id,
			artist_name: this.props.location.state.artist_name,
			dataSource: [],
			totalPages: 0,
			offset: 0,
			page: 0,
		};
	}

	componentDidMount() {
		this.getAlbums();
	}

	getAlbums = (offset = 0, page = 1) => {
		spotify
			.getArtistAlbums(this.state.id, { offset: offset })
			.then((res) => {
				console.log(res);
				let total_pages = Math.floor(res.total / 20);
				if (total_pages > 100) {
					total_pages = 100;
				}
				let data = res.items;
				this.setState({
					dataSource: data,
					totalPages: total_pages,
					page: page,
				});
			})
			.catch((err) => console.log(err));
	};

	loadPage = (page) => {
		let offset = page * 20 - 20;
		this.getAlbums(offset, page);
	};

	render() {
		return (
			<>
				<AppBar style={{ backgroundColor: "#dedede", color: "black" }}>
					<Typography variant="h6" style={{ padding: 10 }}>
						{this.state.artist_name} albums
					</Typography>
				</AppBar>

				<div style={{ marginTop: 20, padding: 30 }}>
					<Grid
						container
						spacing={10}
						style={{ paddingTop: 20 }}
						justify="center"
					>
						{this.state.dataSource.map((album) => (
							<Grid key={album.id} item>
								<AlbumCard
									id={album.id}
									name={album.name}
									image={album.images[album.images.length - 2]}
									artists={album.artists}
									release_date={album.release_date}
									total_tracks={album.total_tracks}
									external_url={album.external_urls.spotify}
								></AlbumCard>
							</Grid>
						))}
					</Grid>
				</div>
				{this.state.totalPages > 1 ? (
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
