

// import React, { Component } from "react";
import {Skeleton} from "antd"
import {useSelector} from "react-redux"

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
    getRcmdToplistAction,
    getRecommendNewAction,
    // getRecommendToplistAction,
    getRcmdSingerAction,
    getRecommendAnchorAction,
    getPersonalSongListAction} from "@/redux/actions/discover"
// import { getToplistListAction } from "@/redux/actions/toplist";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DscvRcmd () {
    // redux hook
    const {loaded, logined} = useSelector(state => {
        const {discover:dscvState, login:loginState,toplist:toplistState,singer:singerState} = state
        // const loginState = state.login
        // console.log(dscvState.get("recommendAnchors"))
        // console.log(dscvState.get("songList"))
        // console.log(dscvState.get("news"))
        // console.log(toplistState.get("toplists"))
        // console.log(singerState.get("singers"))
        // console.log(dscvState.get("recommendAnchors"))
        // console.log(dscvState.get("banners")!==null &&
        // dscvState.get("songList")!==null &&
        // dscvState.get("news")!==null &&
        // toplistState.get("toplists") &&
        // singerState.get("singers") &&
        // dscvState.get("recommendAnchors")!==null)
        return {
            loaded: dscvState.get("banners")!==null &&
            dscvState.get("songList")!==null &&
            dscvState.get("news")!==null &&
            Object.keys(toplistState.get("toplists")).length &&
            Object.keys(singerState.get("singers")).length &&
            dscvState.get("recommendAnchors")!==null,
            logined: loginState.get("logined")
        }
    })
    const dispatch = useDispatch()

    // react hook
    useEffect(() => {
        dispatch(getBannerAction())
        dispatch(getRcmdSongListAction())
        dispatch(getRcmdToplistAction())
        dispatch(getRecommendNewAction())
        dispatch(getRcmdSingerAction())
        dispatch(getRecommendAnchorAction())
    },[dispatch])
    useEffect(() => {
        logined && dispatch(getPersonalSongListAction())
        !logined && dispatch(getRcmdSongListAction())
    }, [logined,dispatch])
    // console.log(loaded)
    // render
    return <Skeleton loading={!loaded} active>
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
