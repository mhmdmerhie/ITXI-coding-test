import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";

export default class AlbumCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.id,
			name: this.props.name,
			image: typeof this.props.image === "undefined" ? "https://www.theyearinpictures.co.uk/images//image-placeholder.png ": this.props.image.url,
			artists: this.props.artists,
			release_date: this.props.release_date,
			total_tracks: this.props.total_tracks,
			external_url:
				typeof this.props.external_url === "undefined"
					? ""
					: this.props.external_url,
		};
	}

	openSpotifyPreview = () => {
		window.open(this.state.external_url, "_blank");
	};

	render() {
		return (
			<Box width={300}>
                <Card style={{justifyContent: "center", backgroundColor: "#dedede"}} key={this.state.id}>
					<CardContent maxwidth={300}>
						<CardMedia
							image={this.state.image}
							style={{ width: 250, height: 250, marginRight: "auto", marginLeft:"auto" }}
                            title={this.state.name}
						/>
						<Typography>{this.state.name}</Typography>
						
							{this.state.artists.map((artist) => {
								return (
									<Typography variant="body2" color="textPrimary">
										{artist.name}{" "}
									</Typography>
								);
							})}
						<Typography gutterBottom variant="subtitle2" color="textSecondary">
							{this.state.release_date}
						</Typography>
						<Typography gutterBottom variant="subtitle2" color="textSecondary">
							{this.state.total_tracks} tracks
						</Typography>
						<CardActions>
							<Button
								onClick={() => this.openSpotifyPreview()}
								variant="contained"
								disableElevation
                                fullWidth
                                style={{backgroundColor: "#1DB954", color: "#dedede"}}
                                
							>
								Preview Album On Spotify
							</Button>
						</CardActions>
					</CardContent>
                    </Card>
			</Box>
		);
	}
}
