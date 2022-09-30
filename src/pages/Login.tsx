import { Button, Checkbox, Form, FormInstance, Input, message } from 'antd';
import background from '../images/bg-login-2.png';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch,useAppSelector } from '../app/hooks'
import { postLogIn}  from '../features/AuthSlice'
// import {login,logout}  from '../features/AuthSlice'


const App = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isLogin,error,loading} = useAppSelector((state)=> state.auth)

  // const successMessage = () => {
  //   message.success('Successfully Logged in');
  // };
  const errorMessage = () => {
    message.error('Please Enter Correct Email Address and Password');
  };
  //bisa login tapi state gk berubah
  const onFinish = (values: any) => {
      dispatch(postLogIn(values));
      navigate('/' , { replace: true }); 

      // console.log('Success:', values);
  };
  console.log(isLogin)  
  // console.log(isLogin) 
  useEffect(() => {
    if (error) {
      errorMessage();
    }
  }, [error]);
  
  const onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
    navigate('/login');
  };

  return (
    <div className='container-page' 
    style={{ backgroundImage: `url(${background})` ,
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    position:'relative'}}>
      <div className='auth-container'>
        <h1>Login</h1>
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
            <Button type="primary" htmlType="submit" >
              Login
            </Button>
          </Form.Item>
        </Form>
          <div className='bottom-auth'>
            <p>Don't have any account yet?</p>
            <Link to='/register'>Sign Up Here!</Link>
          </div>
      </div>
    </div>
  );
};

export default App;
