import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import AlbumsPage from './pages/albumsPage';
import LoginPage from './pages/loginPage';
import SearchPage from './pages/searchPage';

function App() {
  return (
    <BrowserRouter>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/search" component={SearchPage} />  
    <Route exact path="/albums" component={AlbumsPage} />
    </BrowserRouter>
  );
}

export default App;