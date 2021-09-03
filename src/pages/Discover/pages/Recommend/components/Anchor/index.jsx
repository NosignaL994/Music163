import "./style.less"

import { Component } from "react";
import {connect} from "react-redux"
class RecommendAnchor extends Component {
    render () {
        const {anchors} = this.props
        return (
            <section className="recommend-aside-anchor">
                <header className="recommend-aside-hd">
                    <span>热门主播</span>
                </header>
                <div className="recommend-anchor-content">
                    <ul>
                        {
                            anchors.map(item => (
                                <li key={item.id}><a href="javascript:;">
                                    <img src={item.picUrl} alt="" className="recommend-anchor-avatar"/>
                                    <div className="recommend-anchor-text">
                                        <div className="recommend-anchor-name ondline">{item.name}</div>
                                        <div className="recommend-anchor-category oneline">{item.category}</div>
                                    </div>
                                </a></li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        )
    }
}
function mapStateToProps (state) {
    const discoverState = state.discover
    return {
        anchors: discoverState.get("recommendAnchors")
    }
}
export default connect(mapStateToProps, null)(RecommendAnchor)