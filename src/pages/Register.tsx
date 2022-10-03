import { Button, Form, Input, message } from 'antd';
import background from '../images/bg-login-2.png'
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postReg, reset } from '../features/AuthSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';



const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isReg,error,loading} = useAppSelector((state)=> state.auth)
  const auth = useAppSelector((state)=> state.auth)

useEffect(() => {
  form.setFieldsValue(auth)
 }, [form, auth])

  const successMessage = () => {
    message.success('Account Successfully Created');
  };
  const errorMessage = () => {
    message.error('Error...');
  };
  const loadMessage = () => {
    const hide = message.loading('Please Wait..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 200);
  };
  
  const onFinish = () => {
    form.validateFields()
			.then((values:any) => {
			  dispatch(postReg(values));
        
			})
			.catch((error) => error.message);
  };

  useEffect(() => {
    if (error) {
      errorMessage();
      navigate('/register' , { replace: true }); 
     
    }else if(loading){
      loadMessage();
    }else if (isReg){
      successMessage();
      navigate('/login' , { replace: true }); 
    }
    dispatch(reset());
  }, [error,loading,isReg]);
  console.log(isReg)

  const onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div 
    className='container-page' 
    style={{ 
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      position:'relative'}}
    >
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
