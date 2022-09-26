import { Typography, Table } from 'antd'
import React from 'react'

type Props = {}

const ErrorPage = (props: Props) => {
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
      paddingBottom:'15%'
    }}
    >
      <Typography.Title level={1} style={{ display:'flex', width:'300px' }}>
        404 Not Found   
      </Typography.Title> 
    
    </div>
  )
}

export default ErrorPage