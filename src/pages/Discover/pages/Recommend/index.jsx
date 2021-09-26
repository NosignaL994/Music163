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

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DscvRcmd () {
    // redux hook
    const {loaded, logined} = useSelector(state => {
        // console.log(state);
        // const {recommend,login,toplist,singer,radio} = state
        // console.log(state?.recommend.get("banners"))
        // console.log(state?.songlist.get("rcmdList").size)
        // console.log(state?.album.get("newList").size )
        // console.log(state?.toplist.get("toplists"))
        // console.log(state?.singer.get("topList").size)
        // console.log(state?.radio.get("hotList").size)
        return {
            loaded: 
            state?.recommend.get("banners") &&
            state?.songlist.get("rcmdList").size  &&
            state?.album.get("newList").size  &&
            state?.toplist.get("toplists") &&
            state?.singer.get("topList").size &&
            state?.radio.get("hotList").size ,
            logined: state.login.get("logined")
        }
    })
    const dispatch = useDispatch()

    // react hook
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
