

// import { Component } from "react";
import { Switch, Route } from "react-router-dom";


import DiscoverNav from "./components/Nav"
import DiscoverSongList from "./pages/SongList"
import DiscoverRecommend from "./pages/Recommend"
import DiscoverTopList from "./pages/TopList"

export default function Discover () {
    return (
        <main>
            <DiscoverNav/>
            {/* <DiscoverLogin/> */}
            <Switch>
                <Route path="/discover/recommend" component={DiscoverRecommend}/>
                <Route path="/discover/songlist" component={DiscoverSongList}/>
                <Route path="/discover/toplist" component={DiscoverTopList}/>
                <Route exact path="/" component={DiscoverRecommend}/>
                {/* <Redirect from="/discover" to="/discover/recommend"/> */}
            </Switch>
        </main>
    )
}
// class Discover extends Component {
//     render () {
        
//     }
// }

// export default Discover