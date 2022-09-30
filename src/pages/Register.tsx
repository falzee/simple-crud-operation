import { Button, Checkbox, Form, Input } from 'antd';
import background from '../images/bg-login-2.png'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postReg } from '../features/AuthSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../app/hooks';


//belum dirapiin
const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    try {
      await dispatch(postReg(values));
      // if (isLogin === true){
        navigate('/')
      // }else{
      //  navigate('/login', { replace: true });
      // }
      console.log('Success:', values); 
    } catch (error) {
      // if (error.response.status === 400) {
      //   navigate('/login', { replace: true })
      // }
      // catch and handle any rejected Promises or thrown errors
    }
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            className='auth-item'
            label="Password"
            name="password"
            rules={[
              {
                pattern: new RegExp(
                  /^[0-9a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                ),
                message: 'Please input your password without space character!',
              },
              {
                  min: 6,
                  message: 'The password must be minimum 6 character'
              },
              {
                required: true,
                message: 'Please input your Password!'
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
