import React, {useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../forms/SearchForm";
import "./homepage.css";
import bloombuddylogo from "../images/Logo4.png"

const Home = ({ isAuthenticated, avatarImage }) => {
  const [searchResults, setSearchResults] = useState([]);
  const userName = localStorage.getItem("username")

  const handleSearch = (results) => {
    setSearchResults(results);
  };


  // console.log("userName in home page is", userName);
  // console.log("avatarImage in home:", avatarImage);


  return (
    <div 
    >
      {!isAuthenticated ? (
        <div className="home-logo">
          <img className="bloom-logo"src={bloombuddylogo} alt="company-logo"/>
          <h1>Bloom Buddy</h1>
          <h3><i>"Discover, Learn, Grow: Your Personal Botanical Journey Awaits"</i></h3>
          <Link to="/login">
            <button>Log In</button>
          </Link>

          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <div>

            <img src={avatarImage} alt="user-avatar" className="avatar-image"/>
            <h1>Welcome Back {userName}!</h1>


            <SearchForm onSearch={handleSearch} />

            <div>
                <ul>
                {searchResults.map((result) => (
                    <li key={result.id}> {result.name} </li>
                ))}
                </ul>
      </div>
        </div>
      )}

      
    </div>
  );
};

export default Home;
