import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../forms/SearchForm";
import "./homepage.css";

const Home = ({ isAuthenticated, userName }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="homepage-div">
      {!isAuthenticated ? (
        <div>
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
