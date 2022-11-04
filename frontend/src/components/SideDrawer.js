import './SideDrawer.css';
import '../screens/HomeScreen.css'
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import React, { useState, useEffect} from 'react'; 
import DayNightToggle from 'react-day-and-night-toggle'
const authcheckURL = 'http://localhost:5000/api/authentication';


const SideDrawer = () => {





  const [pst, stPost] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false)
  useEffect(() => {
    axios.get(authcheckURL, {withCredentials: true}).then(async (response) => {
      stPost(response.data.authstate);

    }).catch(err => {
    stPost(err.response.data.authstate)});
  }, []);
  if (!pst) return null;
  


  
  var slider = $(".slider");
  var slide_cont = true ;

  function slider_controler_show () {
    $(function() {
      slider.css("left",`0px`);
        });
        $(function() {
          $(".slider").removeClass("slide-right");
        });
        $(function() {
          $(".slider").addClass("slide-left");
      });
  };

  function slider_controler_hide () {
    $(function() {
      slider.css("left",`-300px`);
        });
          $(function() {
        $(".slider").removeClass("slide-left");
      });
      $(function() {
        $(".slider").addClass("slide-right");
    });
  };

  function slide_controler () {

    slide_cont=!slide_cont;
    if(slide_cont==true)
    {
      slider_controler_show ()
    }  else {
      slider_controler_hide ()
    }
  };
  function Fingerprint () {
    if (pst == 'no') {
       return (
         <i className="fa-solid fa-fingerprint red fa-3x"></i>
       )
    } else {
      return (
        <i className="fa-solid fa-fingerprint blue fa-3x"></i>
      )
    }
  }

  function Hr () {
    if (pst == 'no') {
       return (
        <hr className="hr-red"/>
       )
    } else {
      return (
        <hr className="hr-blue"/>
      )
    }
  }

  function Log () {
    if (pst == 'no') {
       return (
        <Link className="blue" onClick={slide_controler} to='/login'><span className='login'>Log in</span><i className="fa-solid fa-right-to-bracket fa-2x "></i></Link>
       )
    } else {
      return (
        <a className='red' onClick={slide_controler} href='http://localhost:5000/api/log'><span className='login red'>Log out</span><i className="fa-solid fa-right-to-bracket fa-2x "></i></a>
      )
    }
  }
  function DarkMode (){
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode){
    $("#sidedrawer").css('background-color','black');
    $("#screen").css('background-color','black');
    }
    else if (isDarkMode) { 
      $("#sidedrawer").css('background-color','#F5F5F5');
      $("#screen").css('background-color','#F5F5F5');
    }

  }

  return (
    <section className='slider slide-left' id='sidedrawer'>
      <div className='logos'>
      <i className='fa-regular fa-circle-user fa-4x'></i>
      <Fingerprint />
      </div>
      <Hr />
      <div className='lists'>
        <div className='link'>
        <Log />
        </div>
        <div className='link sidercart'>
        <Link onClick={slide_controler} to='/book'><span class='carts'>Add one</span><i class="fa-solid fa-add fa-2x"></i></Link>
        </div>
        <div className='link'>
        <Link onClick={slide_controler} to='/mybooks'><span class='chat'>My carts</span><i class="fa-solid fa-id-card fa-2x"></i></Link>
        </div>
        <div className='link'>
        <Link onClick={slide_controler} to='/favorites'><span class='favorites'>Favorites</span><i class="fa-solid fa-bookmark fa-2x"></i></Link>
        </div>
        <div className='link siderabout'>
        <Link onClick={slide_controler} to='/aboutus'><span class='aboutus'>About us</span><i class="fa-solid fa-address-book fa-2x"></i></Link>
        </div>
        <div className='link'>
        <Link onClick={slide_controler} to='/comments'><span class='aboutus'>Comments</span><i class="fa-solid fa-message fa-2x"></i></Link>
      </div>
      </div>
      <div className='nightmod'>
        <DayNightToggle onChange={() => DarkMode()} checked={isDarkMode}/>
      </div>
      <div className='sidebtn'>
        <button className='menubtn' onClick={slide_controler} disable><i className='fa fa-bars fa-2x'></i></button>
      </div>


    </section>
  );
}

export default SideDrawer;
