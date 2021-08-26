

import React, { Component } from "react";
import {Skeleton} from "antd"
import {connect} from "react-redux"

import "@/assets/styles/reset.css"
import "./style.less"

import Banner from "./components/Banner"
import RecommendHot from "./components/HotRecommend";
import RecommendNew from "./components/New";
import RecommendToplist from "./components/TopList";
import RecommendSinger from "./components/Singer";
import RecommendAnchor from "./components/Anchor";
import {getBannerAction, getHotRecommendAction, getRecommendNewAction,getRecommendToplistAction, getRecommendSingerAction, getRecommendAnchorAction} from "@/redux/actions/discover"

class DiscoverRecommend extends Component {

    componentDidMount () {
        const {getBannerAction, getHotRecommendAction, getRecommendNewAction,getRecommendToplistAction,getRecommendSingerAction, getRecommendAnchorAction} = this.props
        getBannerAction()
        getHotRecommendAction()
        getRecommendNewAction()
        getRecommendToplistAction()
        getRecommendSingerAction()
        getRecommendAnchorAction()
    }
    render () {
        const {loading} = this.props
        return (
            <Skeleton loading={loading} active>
                <Banner/>
                <div className="discover-recommend-content w980">
                    <div className="recommend-content-main">
                        <RecommendHot/>
                        <RecommendNew/>
                        <RecommendToplist/>
                    </div>
                    <div className="recommend-content-aside">
                        <RecommendSinger/>
                        <RecommendAnchor/>
                    </div>
                </div>
            </Skeleton>
        )
    }
}
function mapStateToProps (state) {
    const discoverState = state.discover
    return {
        loading: !discoverState.get("banners") || !discoverState.get("hotRecommends") || !discoverState.get("recommendNews") || !discoverState.get("risingToplist") || !discoverState.get("newToplist") || !discoverState.get("originalToplist") ||
        !discoverState.get("recommendSingers") || !discoverState.get("recommendAnchors")
    }
}
export default connect(mapStateToProps, {
    getBannerAction,
    getHotRecommendAction,
    getRecommendNewAction,
    getRecommendToplistAction,
    getRecommendSingerAction,
    getRecommendAnchorAction
})(DiscoverRecommend)