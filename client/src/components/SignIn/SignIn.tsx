import React,{useState} from 'react'
import { UserOutlined } from '@ant-design/icons';
import classes from './SignIn.module.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { SignType } from './types/SignType';
import axios from 'axios'
import { BASEURL } from '../../config/baseUrl'


const baseURL = BASEURL


export const SignIn = () => {

  const onFinish = async (values: SignType) => {
    console.log(baseURL)
    try {
      const res = await axios({
        baseURL,
        method: 'post',
        url: '/auth/login',
        data: {
          email: values.email,
          password: values.password,
          repassword: values.repassword
        }
      })

      const token = res.data.data.token
      localStorage.setItem('token', token)
      window.location.reload();
    } catch (error) {
      message.error('登录失败')
    }


  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={classes.LoginCard}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="repassword"
          name="repassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>

  )
}
