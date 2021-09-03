import './style.less'

import {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
// import { Route } from 'react-router'

import debounce from '@/utils/debounce'
import {getSearchSuggestAction, searchIptAction, searchFocusChangeAction} from "@/redux/actions/header"


class Header extends Component {
    
    handleIptChange = debounce(event => {
        const searchValue = event.target.value.trim()
        this.props.searchIptAction(searchValue)
        if (searchValue) {
            this.props.getSearchSuggestAction(searchValue)
        }
    }, 400)

    handleIptFocus = debounce(() => {
        this.props.searchFocusChangeAction(true)
    }, 400)
    handleIptBlur = debounce(() => {
        this.props.searchFocusChangeAction(false)
    }, 400)

    render () {
        const {searchValue,searchSuggest, searchFocused} = this.props
        // console.log(searchSuggest);
        // console.log(searchFocused);
        return (
        <header className="site-hd">
            <div className="site-hd-wrapper w1100">
                <div className="site-hd-left">
                    <h1>
                        <a href="/" className="logo sprite_01"></a>
                    </h1>
                        
                    <ul className="site-hd-group">
                        <li><NavLink exact to="/" isActive={(match, location) => (match || location.pathname.match(/^\/discover\//))} activeClassName="hd-group-active">发现音乐</NavLink></li>
                        <li><NavLink to="/mine" activeClassName="hd-group-active">我的音乐</NavLink></li>
                        <li><NavLink to="/friend" activeClassName="hd-group-active">朋友</NavLink></li>
                        <li><NavLink to="/shop" activeClassName="hd-group-active">商城</NavLink></li>
                        <li><NavLink to="/musician" activeClassName="hd-group-active">音乐人</NavLink></li>
                        <li><NavLink to="/download" activeClassName="hd-group-active">下载客户端</NavLink></li>
                    </ul>
                </div>
                <div className="site-hd-right">
                    <div className="search-box">
                        <input type="text" className="search sprite_01" placeholder="音乐/视频/电台/用户" onChange={this.handleIptChange} onBlur={this.handleIptBlur} onFocus={this.handleIptFocus}/>
                        <div className={searchFocused && searchValue ? "search-suggest" : "search-suggst dsp-none"}>
                            <a href="javascript:;" className="searchUser">搜"{searchValue}"相关用户&nbsp;&gt;</a>
                            {
                                searchSuggest.songs && (
                                    <div className="search-suggest-item search-suggest-songs">
                                        <h3><i className="icon"></i>单曲</h3>
                                        <ul>
                                        {searchSuggest.songs.map(item => <li key={item.id}><a href="javascript:;">{item.name}-{item.artists.map(artist => artist.name + ' ')}</a></li>)}
                                        </ul>
                                    </div>
                                )
                            }
                            
                            {
                                searchSuggest.artists && (
                                    <div className={"search-suggest-item search-suggest-artists"}>
                                        <h3><i className="icon"></i>歌手</h3>
                                        <ul>
                                        {searchSuggest.artists.map(item => <li key={item.id}><a href="javascript:;">{item.name}</a></li>)}
                                        </ul>
                                    </div> 
                                )
                            }
                            
                            {
                                searchSuggest.albums && (
                                    <div className="search-suggest-item search-suggest-albums">
                                        <h3><i className="icon"></i>专辑</h3>
                                        <ul>
                                            {searchSuggest.albums.map(item => <li key={item.id}><a href="javascript:;">{item.name}-{item.artist.name}</a></li>)}
                                        </ul>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                    <NavLink className="create-center" to="/create-center">创作者中心</NavLink>
                    <a href="javascript:;" className="login">登录</a>
                </div>
            </div>
            
        </header>
        )
       
    }
}

function mapStateToProps (state) {
    const headerState = state.header
    return {
        searchSuggest: headerState.get("searchSuggest"),
        searchValue: headerState.get("searchValue"),
        searchFocused: headerState.get("searchFocused")
    }
}

// function mapDispatchToProps () {
//     return {
//         getSearchSuggestAction
//     }
// }

export default connect(mapStateToProps, {
    getSearchSuggestAction,
    searchIptAction,
    searchFocusChangeAction
})(Header)