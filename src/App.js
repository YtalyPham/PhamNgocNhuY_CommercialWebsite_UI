import "./App.css";
import React from "react";
import Navbar from "./Component/Navbar/";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import  "./Component/Content/content.css";
import User_ProductDetail from "./Component/Product/productdetailuser";
import Category from "./Component/Category/index";
import Brand from "./Component/Brand/index";
import ProductDetail from "./Component/ProductDetail/index";

import Home from "./Component/Product/index";
import Product from "./Component/Product/productadmin";
class App extends React.Component {
  handleSearchKey(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <Router>
        <Navbar onSearchKey={(e) => this.handleSearchKey(e)} />

        <Switch>
          <Route exact path="/home">
            <h1>home page</h1>
            <Home/>
          </Route>
          <Route exact path="/productdetail/:id">
           <User_ProductDetail/>
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/admin/brand">
            <Brand />
          </Route>
          <Route exact path="/admin/product">
            <Product />
          </Route>

          <Route exact path="/admin/productdetail">
            <ProductDetail />
          </Route>

          <Route exact path="/admin/category">
            <Category />
          </Route>

        </Switch>
      </Router>
    );
  }
}

export default App;
