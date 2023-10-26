import React, { useState } from 'react';
import axios from 'axios';
import "./searchForm.css"
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://perenual.com/api/species-list?key=sk-Z1lH652d505e13f822256&q=${query}`);
      setResults(response.data.data);
      console.log("response", response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handeClick = (group_id)=> {
    navigate(`/plantlist/${group_id}`)
  };

  return (
    <div className='full-body'>
      
      <div className='search-form'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button onClick={handleSearch} className='search-button'>Search</button>
      </div>
      

      <div className={`${results.length > 0 ? "search-result-list" : ""}`}>
        {results.map((result) => 
          <div key={result.id} className='search-result-item'>
            <div> {result.default_image? 
              (<img src={result.default_image.thumbnail} 
              alt={result.common_name} />): ("")} 
            </div>

            <div>ID: {result.id} </div>
            <div>Other Names: {result.other_name} </div>
            <div>Scientific Name: {result.scientific_name} </div>
            <div>Cycle: {result.cycle} </div>

            <button onClick={()=>handeClick(result.id)}>Check Plant</button>
            
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchComponent;
