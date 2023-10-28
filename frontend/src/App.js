import './App.css';
import React,{useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './home/Homepage';
import ProfileForm from './forms/ProfileForm';
import MyPlantGroups from './plants/MyPlantGroups';
import Myreviews from './reviews/Myreviews';
import Navbar from './nav/navbar';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import PlantGroupForm from './forms/PlantGroupForm';
import PlantDetails from './plants/PlantDetails';
import PlantList from './plants/PlantList';
import Logout from './logout/LogOut';
import ReviewForm from './forms/ReviewForm';
import MyGardenPicks from './plants/MyGardenPicks';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const storedToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);
  const [userId, setUserId] = useState("")
  const userName = localStorage.getItem("userName");
  const [avatarImage, setAvatarImage] = useState("")


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      console.log("token in app.js:", token);
      console.log("user_id in app.js", userId);
    }
  }, [token, userId]);
  
  return (
    <div className="App">
    

      <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
          <Routes> 
              <Route exact path ="/" element = {<Home isAuthenticated={isAuthenticated} userName={userName} avatarImage={avatarImage}/>} />
              <Route exact path ="/profile" element = {<ProfileForm isAuthenticated={isAuthenticated} token={token} userName={userName}/> } />
              <Route exact path ="/myreviews" element = {<Myreviews isAuthenticated={isAuthenticated}/>} />
              <Route exact path ="/my-plant-groups" element = {<MyPlantGroups isAuthenticated={isAuthenticated} />} />
              <Route exact path ="/mygardenpicks" element = {<MyGardenPicks isAuthenticated={isAuthenticated} />} />
              <Route exact path ="/login" element = {<LoginForm setIsAuthenticated={setIsAuthenticated}
                setToken={setToken} setAvatarImage={setAvatarImage}/> }/>
              <Route exact path ="/logout" element = {<Logout/>} />
              <Route exact path ="/signup" element = {<SignUpForm/>} />
              <Route exact path ="/create-review" element = {<ReviewForm/>} />
              <Route exact path ="/create-plant-group" element = {<PlantGroupForm userId={userId}/>} />
              <Route exact path ="/edit-plant-group/:id" element = {<PlantGroupForm userId={userId}/>} />
              <Route exact path ="/plantlist" element = {<PlantList isAuthenticated={isAuthenticated} userId={userId}/>} />
              <Route exact path ="/plantlist/:id" element = {<PlantDetails/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;