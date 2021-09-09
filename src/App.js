

// import '@/assets/styles/reset.css'
import '@/assets/styles/base.css'

import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Header from "./components/Header";
import Login from "./components/Login"
import PlayBar from "./components/PlayBar"
import Vip from "./components/Vip"
import Footer from "./components/Footer"
import Discover from './pages/Discover';
import Download from './pages/Download';
import Friend from './pages/Friend';
import Mine from './pages/Mine';
import Musician from './pages/Musician';
import Shop from './pages/Shop';



function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Login/>
      <Vip/>
      <Switch>
        <Route path="/discover" component={Discover}/>
        <Route path="/musician" component={Musician}/>
        <Route path="/mine" component={Mine}/>
        <Route path="/friend" component={Friend}/>
        <Route exact path="/" component={Discover}/>
        {/* // <Redirect from="/" to="/discover"/> */}
      </Switch>
      <PlayBar/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
