import "./App.css";
import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Component/Navbar/";
import CarouselComponent from "./Component/Carousel";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Test from "./Component/Content";
import Testasdf from "./Component/Testasdf";
import Create from "./Component/Category/create"
import Category from "./Component/Category/index"
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
          </Route>
          <Route exact path="/carousel">
            <CarouselComponent />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>

          <Route exact path="/admin/userForm">
            <Test />
          </Route>
          <Route exact path="/admin/categoryForm">
            <Create />
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
