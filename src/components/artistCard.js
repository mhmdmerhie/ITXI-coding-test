import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

export default class ArtistCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.id,
			name: props.name,
			image:
				typeof props.image === "undefined"
					? "https://www.theyearinpictures.co.uk/images//image-placeholder.png "
					: props.image.url,
			followers: props.followers,
			popularity: props.popularity,
			uri: props.uri,
			getAlbums: false,
			showFullname: false,
		};
	}

	toggleNoWrap = () => {
		this.setState({ showFullname: !this.state.showFullname });
	};

	render() {
		return (
			<Box width={300}>
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
						<div
							onMouseEnter={this.toggleNoWrap}
							onMouseLeave={this.toggleNoWrap}
						>
							{this.state.showFullname ? (
								<Typography>
								{this.state.name}
							</Typography>
							) : (
								<Typography noWrap display="block">
									{this.state.name}
								</Typography>
							)}
						</div>
						<Typography variant="body2" color="textSecondary">
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
			</Box>
		);
	}
}
