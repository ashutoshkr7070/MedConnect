import React, {useState} from "react";
import "./styles/RegisterPage.css";
import { Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading());
      // the response coming from the register submittion
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        // it register success(boolean) is true
        message.success("Register Successfully");
        form.resetFields();
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
          <div className="register-page">
      
      <Form className="register-form" layout="vertical" onFinish={onFinishHandler}>
      <Link className="brand-title" to={"/"}>
          MedConenct
        </Link>
        <h2 className="form-title">Register</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input className="input-field" />
        </Form.Item>
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
          rules={[{ required: true, message: "Please enter your password" }]}
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
          <Link to="/login" className="login-link">
            Already registered? Click here to login
          </Link>
          <button type="submit" className="register-button">
            Register
          </button>
        </div>
      </Form>
    </div>
    </>
  );
}
