import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router-dom";

export default class LoginPage extends React.Component {

	login = () => {
		window.location =
			"https://accounts.spotify.com/en/authorize?client_id=07bf4452c6e048a08f5ab7f6d00d16fc&redirect_uri=http://localhost:3000/search&response_type=token";
	};

	render() {
		if (window.location.hash) {
			return <Redirect to="/search" />;
		} else {
			return (
				<Grid
					container
					spacing={0}
					alignItems="center"
					justify="center"
					style={{ minHeight: "100vh" }}
				>
					<div>
						<Button
							onClick={() => this.login()}
							variant="contained"
							disableElevation
							fullWidth
							style={{backgroundColor: "#1DB954", color: "white"}}
						>
							Login With Spotify
						</Button>
					</div>
				</Grid>
			);
		}
	}
}
