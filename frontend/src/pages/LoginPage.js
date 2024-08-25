import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/LoginPage.css'

export default function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Form handler
  const onFinishHandler = async(values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      dispatch(hideLoading())
      if (res.data.success) {
        // it register success(boolean) is true
        message.success("Login Successfully");
        localStorage.setItem("token", res.data.token);
        form.resetFields();
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  }


  return (
    <div className="login-page">
      <div className="login-container">
        <Link className="mb-10 brand-title"  to={"/"}>
          MedConnect
        </Link>
        <div className="login-form-container">
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="login-form"
          >
            <h2 className="form-title">Login</h2>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" className="input-field" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input
                type={passwordVisible ? "text" : "password"}
                className="input-field"
                suffix={
                  passwordVisible ? (
                    <EyeInvisibleOutlined
                      onClick={() => setPasswordVisible(false)}
                      className="toggle-password-icon"
                    />
                  ) : (
                    <EyeOutlined
                      onClick={() => setPasswordVisible(true)}
                      className="toggle-password-icon"
                    />
                  )
                }
              />
            </Form.Item>
            <div className="form-footer">
              <Link to="/register" className="register-link">
                Not a user? Register here!
              </Link>
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
