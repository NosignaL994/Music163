import Discover from "./Discover";

import {Switch,Route} from "react-router-dom"

export default function Pages () {
    return <Switch>
        <Route path="/discover" component={Discover}/>
        <Route exact path="/" component={Discover}/>
    </Switch>
}