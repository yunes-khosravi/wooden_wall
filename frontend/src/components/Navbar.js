/* eslint-disable jsx-a11y/img-redundant-alt */
import './Navbar.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
const Navbar = () => {

  const [w, setweather] = useState([null,null], null);
  const weather_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=057952587ebf8aa80fc659f6abcc8fc7&units=metric';
  useEffect(() => { 
  axios.get(weather_URL).then((response) => {
    const weatherData = response.data
    const icon_url = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"
    setweather(['Tehran', weatherData.main.temp, icon_url]);
  });
   
}, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand" to="/aboutus"><h2><span>W</span>ooden <span>W</span>all</h2></Link>
      <div class="nav-item weather">
          <h6>{w[0]} {w[1]} ℃</h6>
          <img id='navbar_img' src={w[2]} alt="IMAGE NOT FOUND" />
      </div>
      <ul className='navbar-nav ml-auto'>
      <li className='nav-item about'>
          <Link className="nav-link" to='/aboutus'>About us</Link>
      </li>

        <li className='nav-item cart'>
             <Link className="nav-link" to='/book'>Make one</Link>
        </li>
        <li className='nav-item'>
            <Link className="nav-link" to='/'>Home</Link>
        </li>


      </ul>

    </nav>
  );
}

export default Navbar;
