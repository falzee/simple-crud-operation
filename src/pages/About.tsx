import { Typography } from 'antd'
import React from 'react'
import Table from '../images/table4.png'
import TableHover from '../images/table6.png'

type Props = {}

const About = (props: Props) => {
  return (
    <div 
      className='about-container' style={{ 
      display:'flex',
      flexDirection:'column',
      padding:'0',
      width:'100vw',
      height:'inherit', 
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center',
      paddingBottom:'15%',
      
    }}
    >
      <Typography.Title level={5} 
      style={{ 
        display:'flex',
        width:'300px',
        zIndex:'100'
        }}>
        This Prototype is created using react redux and typescript , with Json-server fake API   
      </Typography.Title> 
      <div style={{ 
        display:'flex',
        position:'absolute',
        justifyContent:'center',
        bottom:'0',
        left:'0',
        right:'0',
        zIndex:'0'
      }}>
        <div className='about-bot' style={{ display:'inline-block',position:'relative'}}>
          <img className='bot' src={Table} style={{ alignSelf:'end'}}  alt="Table" />
          <img className='bot-hover' src={TableHover} style={{ alignSelf:'end'}} alt="Hovering Table" />
        </div>
      </div>
    
    </div>
    
  )
}

export default About

{/* <div className='about-bot' style={{ display:'flex',justifyContent:'center',
  position:'relative',bottom:'0',left:'0',right:'0'}}>
      <img className='bot' src={Table} style={{ alignSelf:'flex-end'}}  alt="" />
      <img className='bot-hover' src={TableHover} style={{ alignSelf:'flex-end'}} alt="" />
    </div> */}

    {/* textAlign:'center',
      width:'500px',
      margin:'0 auto 0 auto' */}
