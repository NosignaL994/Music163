import {Skeleton} from "antd"
import {useSelector} from "react-redux"
import "./style.less"

import Banner from "./components/Banner"
import RcmdHot from "./components/Hot";
import RcmdPersonal from "./components/Personal"
import RcmdNew from "./components/New";
import RcmdToplist from "./components/TopList";
import RcmdSinger from "./components/Singer";
import RcmdRadio from "./components/Radio";
import {getBannerAction} from "@/redux/actions/recommend"
import { 
    getTopSonglistAction,
    getLoginRcmdSonglistAction,
    getRcmdSongListAction } from "@/redux/actions/songlist";
import { getNewAlbumAction } from "@/redux/actions/album";
import { getTopSingerAction } from "@/redux/actions/singer";
import { getToplistsAction } from "@/redux/actions/toplist";
import {getHotRadioAction} from "@/redux/actions/radio"

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

function useRcmdData (logined) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBannerAction())
        dispatch(getRcmdSongListAction())
        dispatch(getTopSingerAction())
        dispatch(getTopSonglistAction())
        dispatch(getNewAlbumAction())
        dispatch(getToplistsAction())
        dispatch(getHotRadioAction())
    },[dispatch])
    useEffect(() => {
        logined && dispatch(getLoginRcmdSonglistAction())
    },[logined,dispatch])
}

export default function DscvRcmd () {
    // redux hook
    const {banners,songlist,album,toplist,singer,radio,logined} = useSelector(state => {
        return {
            banners: state.recommend.get("banners"),
            songlist: state.songlist.get("rcmdList").size,
            album: state.album.get("newList").size,
            toplist: state.toplist.get("toplists"),
            singer: state.singer.get("topList").size,
            radio: state.radio.get("hotList").size,
            logined: state.login.get("logined")
        }
    })
    const loaded = banners&&songlist&&album&&toplist&&singer&&radio
    useRcmdData(logined)
    console.log(123);
    // render
    return <Skeleton loading={!loaded} active>
        <Banner/>
        <div className="discover-rcmd w980">
            <div className="rcmd-main">
                <RcmdHot/>
                {logined && <RcmdPersonal/>}
                <RcmdNew/>
                <RcmdToplist/>
            </div>
            <div className="rcmd-aside">
                <RcmdSinger/>
                <RcmdRadio/>
            </div>
        </div>
    </Skeleton>
}
