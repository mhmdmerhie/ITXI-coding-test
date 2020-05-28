import React from "react";
import { Redirect } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

let spotify = new SpotifyWebApi();
export default class AuthPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}

	componentDidMount() {
		this.timer = null;
		let hash = window.location.hash.substr(1);
		let token = hash.split("&")[0].split("=")[1];
		localStorage.setItem("token", token);
		this.setState({ redirect: true });
	}

	render() {
		return this.state.redirect ? (
			<Redirect
				to={{
					pathname: "/search",
				}}
			></Redirect>
		) : null;
	}
}
