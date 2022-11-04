import './Editbook.css';
import { useLocation , useHistory} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import $ from 'jquery';
import { setDriver } from 'mongoose';
const Editbook = (props) => {

    const location = useLocation()
    let history = useHistory();
    function update_a_book (){
      history.push('/mybooks')
      axios.put(book_url, {City : $("#city").val(),
                           Phonenum : $("#phonenum").val(),
                           Year : $("#year").val(),
                           Name : $("#name").val(),
                           Description : $("#description").val(),
                           Price : $("#price").val(),
                           Id : $("#id").val(),
                          } , {withCredentials: true}).then(async (respoe) => {
        console.log('updated sucsus full'); 
                              
      }).catch(err => console.log(err));
    }
    const book_url = 'http://localhost:5000/api/book/one';
    var {id, name, year, description, price, city, phonenum}  = location.state
    console.log(id);
    const [imgurl, seturl] = useState([]);
    const imageURL = 'http://localhost:5000/api/image' ;

    useEffect(() => { 
      axios.get(imageURL + `?id=${id}`,  {withCredentials: true}).then((response) => {
        
        seturl(response.data.imgUrl)
  
    });
  }, []);
    
    return (
      <section id='screen'>
                  {imgurl.map((image, index) => {
                    
                    
                    function confrimdel () {
                        confirmAlert({
                        title: 'Confirm to delete',
                        message: 'Are you sure to delete cart ?',
                        buttons: [
                            {label: 'Yes', onClick: () => deletehandeler()},
                            {label: 'No',} ]
                        });
                    };

                    function deletehandeler () { 
                        axios.delete(imageURL + `?imgUrl=${image}&id=${id}`,  {withCredentials: true})
                        delete imgurl[index]
                        window.location.reload();
                    }

                     
          return (
              <>
              <a className="editxmark" onClick={confrimdel} >
                <div className='imgpages'>
                <img className='editimg'  src={image} />
                </div>
                </a>
                </>
          );
        })}

            <form>
              <input id='phonenum' className='form-ite' type='text' defaultValue={phonenum} placeholder='phonenumber' />
              <input id='city' className='form-ite' type='text' defaultValue={city} placeholder='city' />
              <input id='year' className='form-ite' type='number' defaultValue={year}  placeholder='year' />
              <input id='name' className='form-ite' type='text' defaultValue={name}  placeholder='name' />
              <textarea id='description' className='form-ite' type='text' defaultValue={description} placeholder='description' ></textarea>
              <input id='price' className='form-ite' type='number' defaultValue={price} placeholder='price' />
              <input id='id' className='form-ite' type="hidden" defaultValue={id} />
              <button className='form-ite submit-btn' onClick={update_a_book}>submit</button>
            </form>
            
      </section>
    );
  };
  
  export default Editbook;
  