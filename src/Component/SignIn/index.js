import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './signin.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {post} from '../../httpHelper'
import { useHistory } from "react-router-dom";


const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const history = useHistory();
  
  const handleFormSubmit= (e) =>{

      post("/api/auth/signin", {
        username: e?.username,
        password: e?.password,
      }).then((response) => {
        localStorage.setItem("token", response?.data?.accessToken);
        localStorage.setItem("roles", response?.data?.roles);
        history.push("/home");
      }).catch(error => {
        console.log("login false");
      });

  };

  return (
    <Form 
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleFormSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" name="username"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" name="password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link to="/signup">
            
                Forgot password
            
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default SignIn;

