import './style.less'
import { Component } from "react";
import { NavLink } from "react-router-dom"

class DiscoverNav extends Component {
    render () {
        return (
            <nav className="discover-nav">
                <ul className="w1100">
                    <li className="discover-nav-item"><NavLink exact to="/" activeClassName="discover-nav-active">推荐</NavLink></li>
                    <li className="discover-nav-item"><NavLink to="/discover/toplist" activeClassName="discover-nav-active">排行榜</NavLink></li>
                    <li className="discover-nav-item"><NavLink to="/discover/songlist" activeClassName="discover-nav-active">歌单</NavLink></li>
                    <li className="discover-nav-item"><NavLink to="/discover/radio" activeClassName="discover-nav-active">主播电台</NavLink></li>
                    <li className="discover-nav-item"><NavLink to="/discover/singer" activeClassName="discover-nav-active">歌手</NavLink></li>
                    <li className="discover-nav-item"><NavLink to="/discover/new" activeClassName="discover-nav-active">新碟上架</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default DiscoverNav