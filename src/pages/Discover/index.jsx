

import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import DiscoverNav from "./components/Nav"
// import DiscoverLogin from "./components/Login"
import DiscoverRecommend from "./pages/Recommend"
import DiscoverTopList from "./pages/TopList"

class Discover extends Component {
    render () {
        return (
            <main>
                <DiscoverNav/>
                {/* <DiscoverLogin/> */}
                <Switch>
                    <Route path="/discover/recommend" component={DiscoverRecommend}/>
                    <Route path="/discover/toplist" component={DiscoverTopList}/>
                    <Route exact path="/" component={DiscoverRecommend}/>
                    {/* <Redirect from="/discover" to="/discover/recommend"/> */}
                </Switch>
            </main>
        )
    }
}

export default Discover