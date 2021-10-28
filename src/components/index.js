import Header from "./Header";
import LoginGuide from "./LoginGuide"
import PlayBar from "./PlayBar"
import VipGuide from "./VipGuide"
import BackTop from './BackTop';
import Footer from "./Footer"
import BuyGuide from './BuyGuide';
import { BrowserRouter } from "react-router-dom";

export default function Wrapper({children}) {
    return <BrowserRouter>
    <Header/>
    <LoginGuide/>
    <VipGuide/>
    <BuyGuide/>
    <BackTop/>
    <PlayBar/>
    {children}
    <Footer/>
  </BrowserRouter>
}