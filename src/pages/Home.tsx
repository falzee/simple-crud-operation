import { Button, Typography } from 'antd'
import Title from 'antd/lib/typography/Title'
import React from 'react'
import { Image } from 'antd';
import Table from '../images/table2.png'
import { Navigate, useNavigate } from 'react-router-dom';
const { Text, Link } = Typography;

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='home-container' 
    style={{
    width:'100vw',
    height:'inherit',    
    
    }}
    >
      <div className='home-title-container' 
      style={{position:'absolute',
      top:'30%',
      left:'10%',
      zIndex:'100'
      }} >
        <Typography.Title  style={{ margin: 0 }}>
          Simple    
          </Typography.Title>
        <Typography.Title  style={{ margin: 0 }}>
          CRUD   
          </Typography.Title>
        <Typography.Title  style={{ margin: 0 }}>
          Operations    
          </Typography.Title>
        <Typography.Title level={5} style={{ marginTop:"5px" }}>
          Using React Redux Typescript    
          </Typography.Title>
        <Button type="primary" onClick={()=> {
            navigate("/crud")
        }}>
          Try it out !
        </Button>
      </div>
      <img className='image-home' src={Table} alt="" />
    </div>
  )
}

export default Home

    {/* <Title>Simple</Title>
    <Title>CRUD</Title>
    <Title>Operations</Title> 
    border: '3px solid #73AD21',
    backgroundSize: '675px 510px',
    backgroundSize: '450px 340px'
     style={{position:'relative',width:'100vw',height:'inherit', 
    backgroundImage: `url(${Table})`,
    // backgroundColor:'yellow',
    backgroundPosition:'right bottom',
    backgroundRepeat:'no-repeat',
    backgroundSize: '675px 510px',
     // backgroundImage: `url(${Table})`,
    // // backgroundColor:'yellow',
    // backgroundPosition:'right bottom',
    // backgroundRepeat:'no-repeat',
    // backgroundSize: '675px 76%',
    }}
   */}