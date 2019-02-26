import React, { Component } from "react";
import ReactDom from "react-dom";
import Login from "./page/login";
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
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/"
              render={props => (
                <Layout>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product" component={Home} />
                    <Route exact path="/product-category" component={Home} />
                    <Redirect from="*" to="/" />
                  </Switch>
                </Layout>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;