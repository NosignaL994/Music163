import Header from "./Header";
import Login from "./Login"
import PlayBar from "./PlayBar"
import VipGuide from "./VipGuide"
import BackTop from './BackTop';
import Footer from "./Footer"
import BuyGuide from './BuyGuide';
import { BrowserRouter } from "react-router-dom";

export default function Wrapper({children}) {
    return <BrowserRouter>
    <Header/>
    <Login/>
    <VipGuide/>
    <BuyGuide/>
    <BackTop/>
    <PlayBar/>
    {children}
    <Footer/>
  </BrowserRouter>
}