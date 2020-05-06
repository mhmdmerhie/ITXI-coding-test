import { AppBar, Grid, Typography } from "@material-ui/core";
import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import AlbumCard from "../components/albumCard";
import SearchPage from "./searchPage";

let spotify = new SpotifyWebApi();
export default class AlbumsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.location.state.id,
			artist_name: this.props.location.state.artist_name,
			dataSource: [],
			renderArtists: false,
		};
	}

	componentDidMount() {
		spotify
			.getArtistAlbums(this.state.id)
			.then((res) => {
				let data = res.items;
				this.setState({ dataSource: data });
			})
			.catch((err) => console.log(err));
	}

	renderArtists = () => {
		this.setState({ renderArtists: true });
	};

	render() {
		if (this.state.renderArtists) {
			return <SearchPage getAlbums={false}></SearchPage>;
		}
		return (
			<>
				<AppBar style={{backgroundColor: "#dedede", color:"black"}}>
					<Typography variant="h6" style={{padding: 10}}>{this.state.artist_name} albums</Typography>
				</AppBar>

				<div style={{ marginTop: 20, padding: 30 }}>
					<Grid container spacing={10} style={{paddingTop: 20}}>
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
			</>
		);
	}
}
