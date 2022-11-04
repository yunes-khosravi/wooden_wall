import './Change.css';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import {Link} from 'react-router-dom';



const ChangeP = () => {

  const [post, setPost] = useState(null);
  const baseURL = 'http://localhost:5000/api/authentication';


useEffect(() => {   
    axios.get(baseURL, {withCredentials: true}).then((response) => {
      console.log(response.data);
      setPost(response.data);
    });

}, []);

if (!post) return null;
if (post.authstate === 'yes') {
  return (
    <section className='change'>
        <center>
          <h2 className='h2'>We detected that your pictures have some problems...!</h2>
          <p>Please try again</p><Link to='/book'  >Make one</Link>
        </center>
    </section>
  );
} else {
  return (
    <>
    <section id='screen'>
      <div>
        <p>to access to this page please Login for free</p>
        <Link to='/login'  >Login</Link>
      </div>
    </section></>
  );
}
}

export default ChangeP;

