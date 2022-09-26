import { Button, Checkbox, Form, Input } from 'antd';
import background from '../images/bg-login-2.png'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//belum dirapiin
const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values : any) => {
    console.log('Success:', values);
    navigate('/login');
  };

  const onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='container-page' style={{ backgroundImage: `url(${background})` ,backgroundSize: 'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',position:'relative'}}>
    <div className='auth-container'>
    <h1>Register</h1>
    <Form
      form={form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='vertical'
      requiredMark={false}
    >

          <Form.Item
            className='auth-item'
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            className='auth-item'
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                pattern: new RegExp(
                  /^[0-9a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                ),
                message: 'Please input your password without space character!',
              },
              {
                  min: 8,
                  message: 'The password must be minimum 8 character'
              }
            ]}
          >

          <Input.Password placeholder="Password" />
          
          </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign up!
        </Button>
      </Form.Item>
    </Form>
        <div className='bottom-auth'>
        <p>Already have an account?</p>
        <Link to='/login'>Login here</Link>
        </div>
    </div>
    </div>
  );
};

export default Register;
