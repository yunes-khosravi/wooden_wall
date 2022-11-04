import './Mybooks.css';
import Product from '../components/Product'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import {Link} from 'react-router-dom';


const authcheckURL = 'http://localhost:5000/api/authentication';
const baseURL = 'http://localhost:5000/api/book/mybooks';

const Mybooks = () => {
  
  const [postt, stPost] = useState(null);
  const [ddd, stdPost] = useState(null);
  useEffect(() => {

    
      axios.get(authcheckURL, {withCredentials: true}).then(async (response) => {
        stdPost(response.data.authstate);
        axios.get(baseURL, {withCredentials: true}).then((respoe) => {
          stPost(respoe.data);
          console.log(respoe.data); }).catch(err => console.log(err));
  
      }).catch(err => {
        stdPost(err.response.data.authstate)});



      }, []);
if (ddd == 'yes') {
  if (!postt) return null;
}
if (!ddd) return null;

   
      
if (ddd == 'no'){
    return (
      <>
      <section id='screen'>
        <div>
          <p>to access to this page please Login for free</p>
          <Link to='/login'  >Login</Link>
        </div>
      </section></>
    );
    
  } else {
    return (
      <section id='screen'>
        <div className='row'>
        {postt.map( val => (
          <Product country={val.country} border_color={'#CAAD8C'} name={val.name} description={val.description} year={val.year} imgUrl={val.imgUrl} price={val.price} id={val._id} city={val.city} phonenum={val.phonenum} editmode={'yes'}/>
        ))}
        </div>
      </section>
       );
            
  }

};

export default Mybooks;
