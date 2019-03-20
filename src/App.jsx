import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Login from './page/login';
import Error from './page/error';
import UserList from './page/user';
import ProductList from './page/product/index/index';
import ProductSave from './page/product/index/save';
import ProductDetail from './page/product/index/detail';
import { HashRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./page/home";
import Layout from "./component/layout";
import CategoryList from './page/product/category';

class App extends Component {



  render() {

    let LayoutRouter =(
      <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={ProductList} />
            <Route exact path="/product-category/index/:categoryId?" component={CategoryList} />
            <Redirect exact from="/product-category" to="/product-category/index/:categoryId?" />
            <Route exact path="/product-save/:pid" component={ProductSave} />
            <Route exact path="/product-detail/:pid" component={ProductDetail} />
            <Route exact path="/user-index" component={UserList} />
            <Redirect exact from="/user" to="/user-index" />
            <Route component={Error} />
          </Switch>
        </Layout>
     );
    return (
        <Router>
          <Switch>
            <Route  path="/login" component={Login} />
            <Route render={props => LayoutRouter } />
          </Switch>
        </Router>
    );
  }
}

export default App;
