import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './home/Homepage';
import Profile from './Profile';
import Myplants from './plants/Myplants';
import Myreviews from './reviews/Myreviews';
import Navbar from './nav/navbar';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import PlantList from './plants/PlantList';

function App() {
  return (
    <div className="App">
    

      <BrowserRouter>
          <Navbar/>
          <Routes> 
            <Route exact path ="/" element = {<Home/>} />
            <Route exact path ="/profile" element = {<Profile/>} />
            <Route exact path ="/myplants" element = {<Myplants/>} />
            <Route exact path ="/myreviews" element = {<Myreviews/>} />
            <Route exact path ="/login" element = {<LoginForm/>} />
            <Route exact path ="/signup" element = {<SignUpForm/>} />
            <Route exact path ="/plantlist" element = {<PlantList/>} />
            
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;