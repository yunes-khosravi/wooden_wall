/* eslint-disable jsx-a11y/alt-text */
import './ProductScreen.css';
import { useLocation } from 'react-router-dom'
import { Carousel } from 'react-bootstrap';

const ProductScreen = () => {
  const location = useLocation()
  const {id, name, year, description, imgurl, price, city, phonenum}  = location.state

  function Price () {
    if (price == '') {
      return (
        <h3>Agreement</h3>
      )
    } else {
     return (
      <h3>{price} $</h3>
     ) 
    }
  }

  return (
    <section id='screen'>
    <div className='row'>
      <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 left'>
      <Carousel className='carsp' interval={1000}>
        {imgurl.map((image, index) => {
          return (
            <Carousel.Item interval={5000}>
              <div className='carsole'>
                <img className="im" src={image} />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
              <h2>{name}</h2>
              <h3>{year}</h3>
              <p>{description}</p>
              <h4>{city}</h4>
              <Price />
      </div> 
      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 right'>
        <button className='btn btn-info btn-lg'>User contact data {phonenum}</button>
        
        <button className='btn btn-primary btn-lg'>Chat box</button>
      </div>  
    </div>  
    </section>
  );
};

export default ProductScreen;
