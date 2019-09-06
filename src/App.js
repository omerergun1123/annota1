import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";
import MainPage from "./pages/index";
import ImageView from "./pages/imageview"


class App extends Component {
  render () {
        return <Router>
            <Switch>
                <Route exact path= "/" component={MainPage}  />
                <Route exact path= "/annotateImage" component={ImageView}  />
                <Route exact path= "/MainPage" component={MainPage}  />
            </Switch>
        </Router>
    }
}
export default App;