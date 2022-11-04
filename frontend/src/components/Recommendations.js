import './Recommendations.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import {Link} from 'react-router-dom';
import Product from '../components/Product'
import Loading from './Loading.js';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


const authcheckURL = 'http://localhost:5000/api/authentication';
const Recommendations_URL = 'http://localhost:5000/api/recommendations';

const Recommendations = () => {



    
    const [posttt, setPostt] = useState([]);
    const [pstr, stPostt] = useState([]);
    useEffect(() => {
        axios.get(Recommendations_URL, {withCredentials: true}).then((response) => {
            setPostt(response.data);
    
        });
      }, []);

      useEffect(() => {
        axios.get(authcheckURL, {withCredentials: true}).then(async (response) => {
          stPostt(response.data.authstate);
    
        }).catch(err => {
        stPostt(err.response.data.authstate)});
      }, []);


      if (!pstr) return null;
    
      if (pstr === 'no'){
        return (
          <section id='screen'>
            <div>
              <p>to access to Recommendations pleasae log in</p>
              <Link to='/login'  >Login</Link>
            </div>
          </section>
        )
        
      } else {
        if (posttt.length != 0){
    return(
      
        <div id='screen'>
        <div className='row'>
        {posttt.map( val => (
          <Product name={val.name} border_color={'#82CD47'} country={val.country} description={val.description} year={val.year} imgUrl={val.imgUrl} price={val.price} id={val._id} city={val.city} phonenum={val.phonenum}/>
        ))}
        </div>
      </div>
    )}else{
      return (
        <>
        <Loading />
        </>
      )
    }


    }

};

export default Recommendations;    