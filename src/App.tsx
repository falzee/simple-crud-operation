import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Navbar from './components/Navbar'
import Layouting from './pages/Layouting';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Crud from './pages/Crud';
import About from './pages/About';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Tcrud from './pages/Tcrud';
import { useAppDispatch,useAppSelector } from './app/hooks'


function App() {
  const isLogin = useAppSelector((state)=> state.auth.isLogin)
  return (
    <div className="App">
          <Routes>
          {isLogin && 
            <>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
            <Route element={<Layouting />}>
                <Route element={<Home/>} path="/"/>
                <Route element={<Home/>} path="/home"/>
                <Route element={<Tcrud/>} path="/crud"/>
                <Route element={<About/>} path="/about"/>
                <Route element={<ErrorPage/>} path="*"/>
            </Route>
            </>           
            //Tcrud is final crud
            }
            {!isLogin && 
            <>
              <Route element={<Login/>} path="/"/>
              <Route element={<Login/>} path="/login"/>
              <Route element={<Register/>} path="/register"/>
              <Route element={<ErrorPage/>} path="*"/>
            </>            
            }
            </Routes>

    </div>
  );
}

export default App;

{/* <Navbar />
      <Login /> 
      <Layouting />
      layouting crud <Crud />
      crud test <Tcrud />
      */}