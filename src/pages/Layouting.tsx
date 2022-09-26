import { Breadcrumb, Button, Layout, Menu } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import About from './About';
import Crud from './Crud';
import Home from './Home';

const { Header, Content, Footer } = Layout;

const Layouting: React.FC = () => (
  <Layout className="layout" >
    <Header style={{ backgroundColor:'transparent',padding:'0 10px' }}>
      <Navbar />     
    </Header>
    <Content style={{ padding: '0',height:'100vh' }}>
      <Outlet />
    </Content>
  </Layout>
);

export default Layouting;
