

import React, { Component } from "react";
import {Skeleton} from "antd"
import {connect, useSelector} from "react-redux"

import "@/assets/styles/reset.css"
import "./style.less"

import Banner from "./components/Banner"
import RecommendHot from "./components/Hot";
import RcmdPersonal from "./components/Personal"
import RecommendNew from "./components/New";
import RecommendToplist from "./components/TopList";
import RecommendSinger from "./components/Singer";
import RecommendAnchor from "./components/Anchor";
import {
    getBannerAction,
    getRcmdSongListAction,
    getRecommendNewAction,
    getRecommendToplistAction,
    getRecommendSingerAction,
    getRecommendAnchorAction,
    getPersonalSongListAction} from "@/redux/actions/discover"
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DscvRcmd () {
    // redux hook
    const {loading, logined} = useSelector(state => {
        const {discover:dscvState, login:loginState} = state
        // const loginState = state.login
        return {
            loading: !dscvState.get("banners") || 
            !dscvState.get("songList") || 
            !dscvState.get("news") || 
            !dscvState.get("risingToplist") || 
            !dscvState.get("newToplist") || 
            !dscvState.get("originalToplist") ||
            !dscvState.get("recommendSingers") || 
            !dscvState.get("recommendAnchors"),
            logined: loginState.get("logined")
        }
    })
    const dispatch = useDispatch()

    // react hook
    useEffect(() => {
        dispatch(getBannerAction())
        dispatch(getRcmdSongListAction())
        dispatch(getRecommendNewAction())
        dispatch(getRecommendToplistAction())
        dispatch(getRecommendSingerAction())
        dispatch(getRecommendAnchorAction())
    },[])
    useEffect(() => logined && dispatch(getPersonalSongListAction()), [logined])

    // render
    return <Skeleton loading={loading} active>
        <Banner/>
        <div className="discover-recommend-content w980">
            <div className="recommend-content-main">
                <RecommendHot/>
                {logined && <RcmdPersonal/>}
                <RecommendNew/>
                <RecommendToplist/>
            </div>
            <div className="recommend-content-aside">
                <RecommendSinger/>
                <RecommendAnchor/>
            </div>
        </div>
    </Skeleton>
}

// class DiscoverRecommend extends Component {

//     componentDidMount () {
//         const {getBannerAction, getHotRecommendAction, getRecommendNewAction,getRecommendToplistAction,getRecommendSingerAction, getRecommendAnchorAction} = this.props
//         getBannerAction()
//         getHotRecommendAction()
//         getRecommendNewAction()
//         getRecommendToplistAction()
//         getRecommendSingerAction()
//         getRecommendAnchorAction()
//     }
//     render () {
//         const {loading} = this.props
//         return (
//             <Skeleton loading={loading} active>
//                 <Banner/>
//                 <div className="discover-recommend-content w980">
//                     <div className="recommend-content-main">
//                         <RecommendHot/>
//                         <RcmdPersonal/>
//                         <RecommendNew/>
//                         <RecommendToplist/>
//                     </div>
//                     <div className="recommend-content-aside">
//                         <RecommendSinger/>
//                         <RecommendAnchor/>
//                     </div>
//                 </div>
//             </Skeleton>
//         )
//     }
// }
// function mapStateToProps (state) {
//     const discoverState = state.discover
//     return {
//         loading: !discoverState.get("banners") || !discoverState.get("hotRecommends") || !discoverState.get("recommendNews") || !discoverState.get("risingToplist") || !discoverState.get("newToplist") || !discoverState.get("originalToplist") ||
//         !discoverState.get("recommendSingers") || !discoverState.get("recommendAnchors")
//     }
// }
// export default connect(mapStateToProps, {
//     getBannerAction,
//     getHotRecommendAction,
//     getRecommendNewAction,
//     getRecommendToplistAction,
//     getRecommendSingerAction,
//     getRecommendAnchorAction
// })(DiscoverRecommend)