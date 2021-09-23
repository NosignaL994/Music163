// import "@/assets/styles/antGlobal.less"
import '@/assets/styles/base.css'

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Header from "./components/Header";
import Login from "./components/Login"
import PlayBar from "./components/PlayBar"
import VipGuide from "./components/VipGuide"
import BackTop from './components/BackTop';
import Footer from "./components/Footer"
import Discover from './pages/Discover';
import Friend from './pages/Friend';
import Mine from './pages/Mine';
import Musician from './pages/Musician';
import BuyGuide from './components/BuyGuide';

import '@/assets/styles/reset.less'
import '@/assets/styles/antdCmpReset.less'
// import {}

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Login/>
      <VipGuide/>
      <BuyGuide/>
      <Switch>
        <Route path="/discover" component={Discover}/>
        <Route path="/musician" component={Musician}/>
        <Route path="/mine" component={Mine}/>
        <Route path="/friend" component={Friend}/>
        <Route exact path="/" component={Discover}/>
        {/* // <Redirect from="/" to="/discover"/> */}
      </Switch>
      <BackTop/>
      <PlayBar/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
