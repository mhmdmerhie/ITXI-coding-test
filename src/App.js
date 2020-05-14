import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AlbumsPage from "./pages/albumsPage";
import LoginPage from "./pages/loginPage";
import SearchPage from "./pages/searchPage";
import NotFoundPage from "./pages/notFoundPage";
import ServerErrorPage from "./pages/serverErrorPage";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<Route exact path="/search" component={SearchPage} />
				<Route exact path="/albums" component={AlbumsPage} />
				<Route path="" component={NotFoundPage} />
				<Route path="/error" component={ServerErrorPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
