import './App.css';
import React,{useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './home/Homepage';
import ProfileForm from './forms/ProfileForm';
import MyPlants from './plants/MyPlants';
import Myreviews from './reviews/Myreviews';
import Navbar from './nav/navbar';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import PlantGroupForm from './forms/PlantGroupForm';
import PlantDetails from './plants/PlantDetails';
import PlantList from './plants/PlantList';
import Logout from './logout/LogOut';
function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const storedToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);
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

      console.log("token value in app.js:", token);
    }
  }, []);
  
  return (
    <div className="App">
    

      <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
          <Routes> 
              <Route exact path ="/" element = {<Home isAuthenticated={isAuthenticated} userName={userName}/>} />
              <Route exact path ="/profile" element = {<ProfileForm isAuthenticated={isAuthenticated} token={token} userName={userName}/> } />
              <Route exact path ="/myreviews" element = {<Myreviews isAuthenticated={isAuthenticated}/>} />
              <Route exact path ="/myplants" element = {<MyPlants isAuthenticated={isAuthenticated}/>} />
              <Route exact path ="/login" element = {<LoginForm setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername} setToken={setToken} /> }/>
              <Route exact path ="/logout" element = {<Logout/>} />
              <Route exact path ="/signup" element = {<SignUpForm/>} />
              <Route exact path ="/create-plant-group" element = {<PlantGroupForm/>} />
              <Route exact path ="/edit-plant-group/:id" element = {<PlantGroupForm/>} />
              <Route exact path ="/plantlist" element = {<PlantList isAuthenticated={isAuthenticated}/>} />
              <Route exact path ="/plantlist/:id" element = {<PlantDetails/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;