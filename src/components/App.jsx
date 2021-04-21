import React, { useState } from 'react';
import '../App.css';
import Vanta from './Vanta';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${API_URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? (
          (weather.main.temp > 16) ?
            'app-warm' : 'app'
        ) : 'app'
    }>
      <Vanta />
      <main>
        <div className='search-box'>
          <input 
            type='text'
            className='search-bar'
            placeholder='🔍'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div className='main-box'>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°c
            </div>
              <div className='weather'>{weather.weather[0].description}</div>
              <div className='humidity'>💦 {weather.main.humidity}%</div>
              
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;