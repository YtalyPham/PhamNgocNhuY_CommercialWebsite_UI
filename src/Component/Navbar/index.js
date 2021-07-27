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
    roles: JSON.stringify(localStorage.getItem("roles")),
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  handleLogout = () => {
    localStorage.removeItem("roles")
    localStorage.removeItem("token")
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
        {JSON.stringify(localStorage.getItem("roles")).indexOf("ROLE_ADMIN") >= 0 && (
          <>
            <Link to="/admin/category">
              <Menu.Item key="app" icon={<AppstoreOutlined />}>
                Category
              </Menu.Item>
            </Link>

            <Link to="/admin/productdetail">
              <Menu.Item key="app" icon={<AppstoreOutlined />}>
                ProductDetail
              </Menu.Item>
            </Link>
            <Link to="/admin/brand">
              <Menu.Item key="app">Brand</Menu.Item>
            </Link>
          </>
        )}
        {!localStorage.getItem("token") && (
          <>
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
          </>
        )}

        {localStorage.getItem("token") && (
          <Menu.Item
            onClick={this.handleLogout}
            key="app"
            icon={<LoginOutlined />}
          >
            Logout
          </Menu.Item>
        )}

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

        <input type="text" onChange={(e) => this.props.onSearchKey(e)}></input>
      </Menu>
    );
  }
}
