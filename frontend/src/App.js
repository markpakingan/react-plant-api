import './App.css';
import React,{useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './home/Homepage';
import Profile from './Profile';
import MyPlants from './plants/MyPlants';
import Myreviews from './reviews/Myreviews';
import Navbar from './nav/navbar';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import PlantGroupForm from './forms/PlantGroupForm';
import PlantDetails from './plants/PlantDetails';
import PlantList from './plants/PlantList';
import Logout from './logout/LogOut';
import CreatedAccount from './account/CreatedAccount';

function App() {

  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userName, setUsername] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      console.log("token value", token);
    }
  }, []); 

  
  return (
    <div className="App">
    

      <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
          <Routes> 
            <Route exact path ="/" element = {<Home isAuthenticated={isAuthenticated} userName={userName}/>} />
            <Route exact path ="/profile" element = {<Profile isAuthenticated={isAuthenticated} /> } />
            <Route exact path ="/myreviews" element = {<Myreviews />} />
            <Route exact path ="/myplants" element = {<MyPlants/>} />
            <Route exact path ="/login" element = {<LoginForm setIsAuthenticated={setIsAuthenticated}
              setUsername={setUsername} setToken={setToken} /> }/>
            <Route exact path ="/logout" element = {<Logout/>} />
            <Route exact path ="/signup" element = {<SignUpForm/>} />
            <Route exact path ="/create-plant-group" element = {<PlantGroupForm/>} />
            <Route exact path ="/edit-plant-group/:id" element = {<PlantGroupForm/>} />
            <Route exact path ="/plantlist" element = {<PlantList isAuthenticated={isAuthenticated}/>} />
            <Route exact path ="/plantlist/:id" element = {<PlantDetails/>} />
            <Route exact path ="/account-created" element = {<CreatedAccount/>} />
            
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;