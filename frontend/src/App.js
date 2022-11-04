import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react'; 

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import BookScreen from './screens/BookScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import About from './screens/About';
import Mybooks from './screens/Mybooks';
import Editbook from './screens/Editbook';
import Comments from './screens/Comments';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Favorites from './components/Favorites';
import Change from './screens/Change';


function App() {


  return (
    <Router>
      <SideDrawer />
      <Navbar />


      <main>
        <Switch>
          <Route exact path='/'component={HomeScreen}/>
           <Route exact path='/login'component={Login}/>
          <Route exact path='/register'component={Register}/>
          <Route exact path='/product'component={ProductScreen}/>
          <Route exact path='/book'component={BookScreen}/>
          <Route exact path='/aboutus'component={About}/>
          <Route exact path='/mybooks'component={Mybooks}/>
          <Route exact path='/favorites'component={Favorites}/>
          <Route exact path='/editbook'component={Editbook}/>
          <Route exact path='/comments'component={Comments}/>
          <Route exact path='/change'component={Change}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
