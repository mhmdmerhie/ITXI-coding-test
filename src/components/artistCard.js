import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

export default class ArtistCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.id,
			name: props.name,
			image: typeof props.image === "undefined" ? "https://www.theyearinpictures.co.uk/images//image-placeholder.png " : props.image.url,
			followers: props.followers,
			popularity: props.popularity,
			uri: props.uri,
			getAlbums: false,
		};
	}

	render() {
		
		return (
			<Card style={{ backgroundColor: "#dedede" }}>
				
					<CardContent>
						<CardMedia
							image={this.state.image}
							style={{
								width: 250,
								height: 250,
								marginRight: "auto",
								marginLeft: "auto",
							}}
							title={this.state.artist_name}
						/>
						<Typography noWrap>{this.state.name}</Typography>
						<Typography variant="body2" color="textSecondary" noWrap>
							{this.state.followers
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
							followers
						</Typography>
						<Rating
							value={(this.state.popularity * 1.0) / 20}
							pricision={0.1}
							readOnly
						/>
					</CardContent>
				
			</Card>
		);
	}
}
