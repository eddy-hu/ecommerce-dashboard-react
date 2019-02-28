import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Login from './page/login';
import Error from './page/error';
import UserList from './page/user';
import { HashRouter } from 'react-router-dom'



import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./page/home";
import Layout from "./component/layout";

class App extends Component {



  render() {

    let LayoutRouter =(
      <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Home} />
            <Route exact path="/product-category" component={Home} />
            <Route exact path="/user-index" component={UserList} />
            <Redirect exact from="/user" to="/user-index" />
            <Route component={Error} />
          </Switch>
        </Layout>
     );
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              exact
              render={props => LayoutRouter }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
