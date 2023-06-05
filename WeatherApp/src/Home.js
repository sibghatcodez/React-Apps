import React, { useState, useEffect } from 'react';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [IsLoading, setIsLoading] = useState(false)
  const [ErrorMSG, setError] = useState(null)

  useEffect(() => {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8e15249e3fmsh1611052637553d5p143ef6jsn622458d30cf0',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error(error));
  }, []);


  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${searchTerm}`,
        {
          headers: {
            'X-RapidAPI-Key': '8e15249e3fmsh1611052637553d5p143ef6jsn622458d30cf0',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setIsLoading(false);
        setError(null);
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
        <div className="home">
          
          {
            ErrorMSG && (
                <div className="card">
                    <div class="error">Location not found!</div>

                    <div className="searchBox">
                <input placeholder="Search for any location..." class="input" name="text" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>

                    <button class="card-button" onClick={() => {
                    handleSearch();
                    setIsLoading(true)
                }}>Search</button>
                </div>
            )
          }
          {IsLoading && !ErrorMSG && (
            <div class="card">                
                <div class="loader"></div>
            </div>
          )}
          {weatherData && !IsLoading && !ErrorMSG && (
              <div class="card">

                    <div className="searchBox">
                <input placeholder="Search for any location..." class="input" name="text" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>
            <div class="card-details">

                <div className="weather-details-1">
                    <p class="text-title">{weatherData.location.name},{weatherData.location.country}</p>
                    <img src={`http:${weatherData.current.condition.icon}`} alt="Weather Icon" />
                </div>

                <div className="weather-details">
                <p>Temp {weatherData.current.temp_c}°C</p>
                <p>Condition: {weatherData.current.condition.text}</p>
                <p>Wind: {weatherData.current.wind_kph} km/h</p>
                <p>Humidity: {weatherData.current.humidity}%</p>
                <p>Cloud: {weatherData.current.cloud}%</p>
            </div>
        </div>
                <button class="card-button" onClick={() => {
                    handleSearch();
                    setIsLoading(true)
                }}>Search</button>
            </div>
          )}
        </div>  
  );
}

export default Home;
