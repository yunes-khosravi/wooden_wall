import './Comments.css';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import {Link} from 'react-router-dom';



const Comments = () => {

  const [post, setPost] = useState(null);
  const baseURL = 'http://localhost:5000/api/authentication';


useEffect(() => {   
    axios.get(baseURL, {withCredentials: true}).then((response) => {
      console.log(response.data);
      setPost(response.data);
    });

}, []);

if (!post) return null;
if (post.authstate == 'yes') {
  return (
    <section id='screen'>
        {/* <form method='post' action='http://localhost:5000/api/comment' enctype="multipart/form-data">
          <p>from : {post.firstname} {post.lastname}</p>
          <input type="hidden" name='firstname' value={post.firstname} />
          <input type="hidden" name='lastname' value={post.lastname} />
          <textarea name='comment' placeholder='Your comment'></textarea>
          <h3>Your score to this site </h3>
          <input type="range" class="form-control-range" name='score'></input>
          <button class="btn btn-primary" type='submit'>send commet</button>
        </form> */}
        <center>
          <h1>Sorry this feature is for the next version</h1>
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

export default Comments;
