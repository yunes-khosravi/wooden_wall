import './HomeScreen.css';
import Product from '../components/Product'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';
import Recommendations from '../components/Recommendations'
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";

document.head.appendChild(styleLink);

const companies_URL = 'http://localhost:5000/api/data/companies';
const Rec = 'Recommendations ⬇'

const HomeScreen = () => {

  const [typedRec, setTypedRec] = useState('');
  const [cars, setoptions1] = useState([]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypedRec(Rec.slice(0, typedRec.length + 1));
      if (typedRec.length === Rec.length){
        setTypedRec('')
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [typedRec])

  useEffect(() => { 
    axios.get(companies_URL).then((response) => {
      console.log(response);
      setoptions1(response.data[0].companies);
      // setmod(response.data[0].models[0]);
    });
  }, []);
  const options1 = cars

  const options2 = [
    {  text: 'Newest', value: 0 },
    {  text: 'Low price', value: 1 },
    {  text: 'High price', value: 2 },
    // {  text: 'Agreement', value: 0 },
  ];

  const options3 = [
    {  text: 'All colors', value: '' },
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




  const [post, setPost] = useState(null);

  const baseURL = 'http://localhost:5000/api/book';
  const [dropdown1, setDro] = useState('Newest');
  const [dropdown2, setDrt] = useState();
  const [dropdown3, setDrtt] = useState();
  let count = 8;
  // const [count, setCount] = useState(10);


  async function clickhandeler (){
    var response = await fetch(`http://localhost:5000/api/book/new_search?sort=${$("#sort").val()}&color=${$("#color").val()}&company=${$("#company").val()}&searchname=${$("#searchname").val()}&count=${count}`)
    const json = await response.json();
    setPost(json)
 }


  function DRT (e) {
    setDrt(e.target.value)

  }
  function DRO (e) {
    setDro(e.target.value)

  }
  function DRTT (e) {
    setDrtt(e.target.value)

  }
  function counter () {
    count = count + 8;
    clickhandeler()
  }
  // function modelhandeler (e) {
   

  //   setSea(e.target.value)
  //   changehandler({search: e.target.value})
  // }


  // function changehandler () {

  //   axios.post(baseURL, {searchname: search, sort: dropdown1, model: dropdown2, count: count}).then((response) => {
  //     console.log(response.data);
  //     setPost(response.data);
  //   });

  // }


  useEffect(() => {   
      axios.get(baseURL).then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
 
  }, []);
  
  if (!post) return null;
  
  return (
    <>
    <section id='search'>
    

        <div className='select'>
          <select id='company' className='search-item' name='company' onChange={DRT}  value={dropdown2} >
            {options1.map( val => (
              <option value={val.value}>{val.text}</option>
            ))}
          </select> 
            
          <select id='sort' className='search-item' name='sort' onChange={DRO} value={dropdown1} >
            {options2.map( val => (
              <option value={val.value}>{val.text}</option>
            ))}
          </select>

          <select id='color' className='search-item' name='color' onChange={DRTT} value={dropdown3} >
            {options3.map( val => (
              <option value={val.value}>{val.text}</option>
            ))}
          </select>
        </div> 
        <input type="text" className='search-item' id='searchname' name='searchname' placeholder="Search.."  />
        <button className='search-item search-btn' onClick={clickhandeler}><i className="fa fa-search"></i></button>
        <input type="hidden" id='count' name='count' value={count} />
      
    </section>
    <section id='screen' >
      <div className='row'>
      {post.map( val => (
        <Product country={val.country} border_color={'#CAAD8C'} name={val.name} description={val.description} year={val.year} imgUrl={val.imgUrl} price={val.price} id={val._id} city={val.city} phonenum={val.phonenum}/>
      ))}
      </div>
      <center>
         <button className='more' type='submit' onClick={counter}>Click for more</button>
      </center>

    </section>
    
    <section id="Recommendations">
        <h2 id="rec">{typedRec}</h2>
        <Recommendations />
    </section></>
  );
};

export default HomeScreen;
