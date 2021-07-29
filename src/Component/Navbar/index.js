import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Input, Button, Checkbox,notification  } from 'antd';
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  LoginOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link, useLocation  } from "react-router-dom";
import { get } from "../../httpHelper";
import { GlobalContext} from '../../context';

const { SubMenu } = Menu;

export default () => {
   const {setListProduct} = useContext(GlobalContext);

  const [current, setCurrent] = useState('mail');
  const [roles, setRoles] = useState(JSON.stringify(localStorage.getItem("roles")));

  const {pathname} = useLocation();

   const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'Logout Success, Have a nice day !',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("roles");
    localStorage.removeItem("token");
    openNotification();
  };

  const submitSearch = (e) => {
    console.log(e);
    get(`/product/searchAll/${e?.target?.value}`).then(res => {
      setListProduct(res?.data?.data)
    }).catch(err => {
      console.log(err)
    })
  }



    return (
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Link to="/home">
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Home Page
          </Menu.Item>
        </Link>
        {JSON.stringify(localStorage.getItem("roles")).indexOf("ROLE_ADMIN") >=
          0 && (
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
              <Menu.Item key="app" icon={<AppstoreOutlined />}>
                Brand
              </Menu.Item>
            </Link>
            <Link to="/admin/product">
              <Menu.Item key="app" icon={<AppstoreOutlined />}>
                Product
              </Menu.Item>
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
            onClick={handleLogout}
            key="app"
            icon={<LoginOutlined />}
          >
            Logout
          </Menu.Item>
        )}

       {pathname === '/home' && <Input type="text" placeholder="Search" onPressEnter={submitSearch} />}

        
      </Menu>
    );
  }

