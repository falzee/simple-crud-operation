import { Button, Checkbox, Form, FormInstance, Input } from 'antd';
import background from '../images/bg-login-2.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch,useAppSelector } from '../app/hooks'
import {login,logout}  from '../features/AuthSlice'
import axios from 'axios';

const App = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values :any) => {
    console.log('Success:', values); 
  
    dispatch(login()) 
    navigate('/');
  };

  const onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
    navigate('/login')
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
// function setError(arg0: string) {
//   throw new Error('Function not implemented.');
// }

// function logIn(form: FormInstance<any>) {
//   throw new Error('Function not implemented.');
// }

// function googleSignIn() {
//   throw new Error('Function not implemented.');
// }
  // /* eslint-disable */ 
    // async (values:any) => {
    //     try {
    //       const response = await axios.post("http://localhost:5000/login", values);
    //         // If you want to get something back
    //         // return response.data;
    //     } catch (err) {
    //       console.error(err)
    //     }
    //   }
    // /* eslint-enable */
 // useEffect(()=> {
  //     dispatch(authActions.getAuth() )
  // }, [])
  // const auth = getAuth();
  // signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });