
import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/Home';
import Users from './components/Users';

import {Navbar,Footer} from './components/Layout'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userlist" element={<Users />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
   
    </>
    
  );
}

export default App;
