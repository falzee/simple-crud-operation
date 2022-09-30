import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


//button belum fix
const items: MenuProps['items'] = [
  {
    label: (
      <Link to='./'> Home</Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link to='./crud'> Crud</Link>
    ),
    key: 'crud',
  },
  {
    label: (
      <Link to='./about'> About</Link>
    ),
    key: 'about',
  },
  
  
];
// tambah class klo hover mau dirubah

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };


  return (
    <div className='navbar' style={{ display:'flex'}}>
          <Menu 
            className='navbar' 
            onClick={onClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            items={items} 
        />
        <div style={{ 
          margin:'0 30px 0 auto',
          zIndex:'200',
          }} >

        <Button type="primary">
          <a href="./login" style={{ color:'white'}}>Logout</a> 
        </Button>
        </div>
    </div>
  )
};

export default Navbar;