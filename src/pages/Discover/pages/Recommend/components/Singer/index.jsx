import "./style.less"

import { Component } from "react";
import {connect} from "react-redux"
import { Fragment } from "react";

class RecommendSinger extends Component {
    render () {
        const {singers} = this.props
        return (
            <section className="recommend-aside-singer">
                <header className="recommend-aside-hd">
                    <span>入驻歌手</span>
                    <a href="javascript:;" className="recommend-aside-all">查看全部&nbsp;&gt;</a>
                </header>
                <div className="recommend-singer-content">
                <ul>
                    {
                        singers.map(item => (
                            <li key={item.id}><a href="javascript:;">
                                <img src={item.img1v1Url} alt="" className="recommend-singer-avatar"/>
                                <div className="recommend-singer-msg">
                                    <div className="recommend-singer-name">{item.name}</div>
                                    <div className="recommend-singer-alias">
                                        {item.alias.length && item.alias.reduce((acc, cur) => acc + " / " + cur)}
                                    </div>
                                    
                                </div>
                            </a></li>
                        ))
                    }
                </ul>
                <a href="javascript:;" className="recommend-singer-apply sprite_button">申请成为网易音乐人</a>
                </div>
            </section>
        )
    }
}

function mapStateToProps (state) {
    const discoverState = state.discover
    return {
        singers: discoverState.get("recommendSingers")
    }
}

export default connect(mapStateToProps, null)(RecommendSinger)