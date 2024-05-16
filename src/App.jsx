import { useState, useEffect } from 'react'
import { CiLocationOn } from "react-icons/ci";
import './App.css'

function App() {
  const [error, setError] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('')

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city.trim() === '') {
        return;
      }
      const API_KEY = '19a7056560ad4cb6f04ab957b076cf12';
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const response = await fetch(api);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
          setError('');
        } else {
          setWeatherData(null);
          setError(data.message);
        }
      } catch (error) {
        setWeatherData(null);
        setError('Error fetching weather data');
      }
    };

    const intervalId = setInterval(fetchWeatherData, 5000);

    return () => clearInterval(intervalId); 
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  }

  return (
    <>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div id='MainBox' className="flex-1 flex-col bg-black text-white p-4 min-h-screen">
        <input 
          type="text" 
          value={city} 
          onChange={handleInputChange} 
          placeholder="Enter city name" 
          className=" Input
            
          "
        />

        {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
          <div id='Text' className="flex-1">
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </div>
            <div id='Location' className="flex mt-4">
              <p id='CityName' className="mr-4">{weatherData.main.temp}°C</p>
              <p id='CityName' className="flex items-center"><CiLocationOn className="mr-1" />{weatherData.name}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
