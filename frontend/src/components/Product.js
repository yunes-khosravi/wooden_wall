import './Product.css';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import { Carousel } from 'react-bootstrap';


const favoritesURL = 'http://localhost:5000/api/favorites';


const Product = (props) => {

  const country_icon_url = "https://flagcdn.com/24x18/" + props.country.toLowerCase() + ".png"
  function confrimdel () {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete cart ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletehandeler()
        },
        {
          label: 'No',
        }
      ]
    });
  };


  const [fav, setfav] = useState('null');
 
  const imgurl = props.imgUrl;
 

  useEffect(() => { 
    axios.get(`http://localhost:5000/api/favorites/${props.id}`, {withCredentials: true}).then((response) => {
      console.log(response.data.favstate); 
      setfav(response.data.favstate)

  });
   
  }, []);
  function onclickhandel(){
    
    if (fav === false) {
      
      axios.post(favoritesURL + `?productId=${props.id}`, {}, {withCredentials: true}).then((respo) => {
        console.log(respo.data.favstate); 
        
    });setfav(true)
    }
    else if (fav === true) {
      console.log(fav);
      axios.delete(favoritesURL + `?productId=${props.id}`, {withCredentials: true}).then((respo) => {
        console.log(respo);
        
    });setfav(false)
    }

  }
  function Save(props) {
    if (fav === true) {
      return <button onClick={onclickhandel}  type='submit'>
        <i className="fa-solid fa-bookmark fa-2x"></i>
      </button>
    } else if (fav === false){
      
      return <button onClick={onclickhandel} type='submit'>
        <i className="fa-regular fa-bookmark fa-2x"></i>
      </button>
    } else {
      return null
    }
  } 
  function Price () {
    if (props.price == -1) {
      return (
        <h6>Agreement</h6>
      )
    } else {
     return (
      <h6>Price : {props.price} $</h6>
     ) 
    }
  }
  function deletehandeler () {

      console.log(props.id);
      const deleteURL = `http://localhost:5000/api/book/${props.id}`;  
      axios.delete(deleteURL, {withCredentials: true})
      window.location.reload();
  }


  function Editmode (){
    if (props.editmode == 'yes') {
      return (
        <>
        <button className="xmark" onClick={confrimdel} ><i className="fa-solid fa-xmark fa-2x"></i></button>
        <Link className="edit" to={{ pathname: "/editbook", state: {id : props.id, imgurl: imgurl, year: props.year, description: props.description, price: props.price, name: props.name, city: props.city, phonenum: props.phonenum}  }} ><i class="fa-solid fa-pen-to-square fa-2x"></i></Link>
        </>
      )
    } else {
      return null
    }
  }



    // function clickhandler () {

    //   axios.post(favoritesURL, {productId: props.id}).then((response) => {
    //     console.log(response.data);
    //     sePost(response.data);
    //   });
    // }


    return (
       
      <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 puff-in-center'>
        <div className='book' style={{border: '3px solid ' + props.border_color}}>
       
       
      <Carousel interval={1000}>
        {imgurl.map((image, index) => {
          return (
            <Carousel.Item interval={5000}>
              <div style={{ height: 200, background: "#F5F5F5", color: "white" }}>
                  <img src={image} />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
          <Editmode />
          <div className='bookfooter'>
            <div className='topfooter'>
            <Save /> 
             <h5>{props.name}</h5>
             <img className='flag' src={country_icon_url} srcset="https://flagcdn.com/32x24/za.png 2x,https://flagcdn.com/48x36/za.png 3x" alt="South Africa"/>
          
            </div>

            <div className='bottomfooter'>
            <Price />
            </div>
          </div>

          <div className='view'>
            <Link className='view-btn' to={{ pathname: "/product", state: {id : props.id, imgurl: imgurl, year: props.year, description: props.description, price: props.price, name: props.name, city: props.city, phonenum: props.phonenum}  }}>View more</Link> 
          </div>
     
        </div>
      </div>
    )
};

export default Product;