import './style.css'

import { Component } from "react";
import {connect} from "react-redux"

class RecommendHot extends Component {
    render () {
        const {hotRecommends} = this.props
        return (
            <section className="discover-recommend-hotRecommend">
                <header className="recommend-hotRecommend-hd recommend-main-hd">
                    <h2 className="sprite_02 main-hd-title">
                        <a href="javascript:;">热门推荐</a>
                    </h2>
                    <ul className="hotRecommend-hd-group">
                        <li><a href="javascript:;">华语</a>|</li>
                        <li><a href="javascript:;">流行</a>|</li>
                        <li><a href="javascript:;">摇滚</a>|</li>
                        <li><a href="javascript:;">民谣</a>|</li>
                        <li><a href="javascript:;">电子</a></li>
                    </ul>
                    <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
                </header>
                <ul className="recommend-hotRecommend-content">
                    {
                        hotRecommends.map(item => (
                            <li key={item.id}><a href="javascript:;"><img src={item.picUrl} alt="" /><p>{item.name}</p></a></li>
                        ))
                    }
                    
                </ul>
            </section>
        )
    }
}

function mapStateToProps (state) {
    const discoverState = state.discover
    return {
        hotRecommends: discoverState.get("hotRecommends")
    }
}

export default connect(mapStateToProps, null)(RecommendHot)