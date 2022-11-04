/* eslint-disable react-hooks/rules-of-hooks */
import './BookScreen.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'; 
import {Link} from 'react-router-dom';
import $ from 'jquery';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapScreen from '../screens/MapScreen';
import Loading from '../components/Loading.js';
const authcheckURL = 'http://localhost:5000/api/authentication';
const companies_URL = 'http://localhost:5000/api/data/companies';

const BookScreen = () => {

  // const [state, ] = useState({ city: "" , country: "" , lng: null, lat: null})
  // function callbackFunction (childData) {
  //       console.log(childData);
  // };



  // const [query, setQuery] = useState('');
  // function querySelect(e){
  //   setQuery(e.target.value);
  //   fetch(
  //     'https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&key=oTp9yDZGbfsrdvsiTTMH8VsLUjwDWed6&limit=10&q=d',
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(
  //         JSON.stringify(responseJson),
  //       );
  //     });
    // const city_URL = 'https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&key=oTp9yDZGbfsrdvsiTTMH8VsLUjwDWed6&limit=10&q=d';
    // axios.get(city_URL, {withCredentials: true}).then((response) => {
    //   console.log(response);

    // });
  // }

  // https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&key=oTp9yDZGbfsrdvsiTTMH8VsLUjwDWed6&limit=10&q=d

  // const [API_KEY] = useState('mcVE68813UHdm7Exiqs8');








  
  const [pst, stPost] = useState(null);
  const [dropdown1, setDro] = useState(' ');
  const [dropdown4, setmodl] = useState();
  const [dropdown3, setDrtt] = useState();
  const [dropdown5, setDr5] = useState();
  const [cars, setoptions1] = useState([]);
  const [modls, setmod] = useState([]);
  const [loading, setLoad] = useState(0);
  async function Load(){
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoad(1);
  }

  useEffect(() => { 
    axios.get(companies_URL).then((response) => {
      console.log(response);
      setoptions1(response.data[0].companies);
      setmod(response.data[0].models[0]);
    });
  }, []);
  const options1 = cars

  const options5 = [
    { text: 'New or Used ?', value: ''},
    { text: 'New', value: 'new'},
    { text: 'Used', value: 'used'}
  ]

  const options3 = [
    {  text: 'Choose color', value: '' },
    {  text: 'Red', value: 'red' },
    {  text: 'Blue', value: 'blue' },
    {  text: 'Brown', value: 'brown' },
    {  text: 'White', value: 'white' },
    {  text: 'Black', value: 'black' },
    {  text: 'Green', value: 'green' },
    {  text: 'Yellow', value: 'yellow' },
    {  text: 'Gray', value: 'gray' },
    {  text: 'Gold', value: 'gold' },
    {  text: 'Orange', value: 'orange' },
    {  text: 'Purple', value: 'purple' },
    {  text: 'Pink', value: 'pink' },
    {  text: 'Teal', value: 'teal' },
    {  text: 'Cyan', value: 'cyan' },
  ];


  const options4 = modls[dropdown1]
  function DRO (e) {
    setDro(e.target.value)
  }
  function Mod (e) {
    setmodl(e.target.value)

  }
  function DR5 (e) {
    setDr5(e.target.value)

  }


  function DRTT (e) {
    setDrtt(e.target.value);
    $('#color').css("border-color",e.target.value);
    $('#color').css("color",e.target.value);
  }

  useEffect(() => {
    axios.get(authcheckURL, {withCredentials: true}).then(async (response) => {
      stPost(response.data.authstate);

    }).catch(err => {console.log(err);
    stPost(err.response.data.authstate)});
  }, []);
  if (!pst) return null;

  if (pst === 'no'){
    return (
      <section id='screen'>
        <div>
          <p>to access to this page please Login for free</p>
          <Link to='/login'  >Login</Link>
        </div>
      </section>
    )
    
  }else if (loading === 1) {
    return(
      <div className='L_N_N_B'>
        
      <Loading />
      <div class='processing fade-in'>
          <p >Processing your pictures ...</p>
      </div>
      </div>
    )
  } else {
    return (
      <>
      <section  id='screen'>
            <form action='http://localhost:5000/api/book' method='POST' enctype="multipart/form-data">

              <div className='row'> 
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                <h4 >Select your car photos (more than one):</h4>
                <input type="file" className="form-control-file border form-ite" name="imageUrl" multiple required/>
            <h4 >Enter your phone number :</h4>
              <input className='form-ite' type='text' name='phonenum' placeholder='09911316157' required/><br/>

              
              
            <h4 >Mark your place :</h4>  


            <MapScreen /><br/>

            <select className='form-ite' id='Type' name='Type' onChange={DR5}  value={dropdown5} required>
                {options5.map( val => (
                  <option value={val.value}>{val.text}</option>
                ))}
              </select> <br/>

                </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                <h4>Some brief description about your car :</h4>  
              <input className='form-ite' type='text' name='name' placeholder='V6 0-100 5s' required/><br/>
              <h4>Enter the year of manufacture of the car :</h4>
              <input className='form-ite' type='number' name='year' placeholder='2010' required/><br/>

              <select className='form-ite' id='model' name='company' onChange={DRO}  value={dropdown1} required>
                {options1.map( val => (
                  <option value={val.value}>{val.text}</option>
                ))}
              </select> <br/>
              <select className='form-ite' id='mod' name='model' onChange={Mod}  value={dropdown4} required>
                {options4.map( val => (
                  <option value={val.value}>{val.text}</option>
                ))}
          
              </select> <br/>

              <select className='form-ite' id='color' name='color' onChange={DRTT}  value={dropdown3} required>
                {options3.map( val => (
                  <option value={val.value}>{val.text}</option>
                ))}
          
              </select> <br/>

              <textarea className='form-ite' type='text' name='description' placeholder='Compelete description about your car and ...' required></textarea>
              <h4>Price ($):</h4><input className='form-ite' placeholder='Leave it as agreement' type='text' name='price' />
                </div>                
              </div>
              <center>
              <button className='form-ite submit-btn' onClickCapture={Load} type='submit' >Submit</button>
              </center>


            </form>
      </section>
      </>
    );
  }

};

export default BookScreen;
