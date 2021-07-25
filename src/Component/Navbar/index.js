import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { post } from "../../httpHelper";

const { SubMenu } = Menu;

export default class index extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };
  

  render() {
    return (
      
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Link to="/home">
            <Menu.Item key="mail" icon={<MailOutlined />}>
              Home Page
            </Menu.Item>
          </Link>

          <Link to="/carousel">
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
              Carousel
            </Menu.Item>
          </Link>

          <Link to="/signup">
            <Menu.Item key="app" icon={<UserAddOutlined />}>
              SignUp
            </Menu.Item>
          </Link>
          <Link to="/signin">
            <Menu.Item key="app" icon={<LoginOutlined />}>
              SignIn
            </Menu.Item>
          </Link>

          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title="Navigation Three - Submenu"
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Link to="/test">
            <Menu.Item key="app">Test</Menu.Item>
          </Link>
          <input
            type="text"
            onChange={(e) => this.props.onSearchKey(e)}
          ></input>
        </Menu>
        
      
    );
  }
}
