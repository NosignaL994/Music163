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
import {
    getBannerAction,
    getRcmdSongListAction,
    getRcmdToplistAction,
    getRcmdNewAction,
    getRcmdSingerAction,
    getPersonalSongListAction} from "@/redux/actions/discover/recommend"
import {getHotRadioAction} from "@/redux/actions/discover/radio"

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DscvRcmd () {
    // redux hook
    const {loaded, logined} = useSelector(state => {
        const {recommend,login,toplist,singer,radio} = state
        return {
            loaded: 
            recommend.get("banners")!==null &&
            recommend.get("songList")!==null &&
            recommend.get("news")!==null &&
            !toplist.get("toplists").isEmpty() &&
            Object.keys(singer.get("singers")).length &&
            // discover.get("recommendAnchors")!==null,
            //  && 
            radio.get("hotRadio")!==null,
            logined: login.get("logined")
        }
    })
    const dispatch = useDispatch()

    // react hook
    useEffect(() => {
        dispatch(getBannerAction())
        dispatch(getRcmdSongListAction())
        dispatch(getRcmdToplistAction())
        dispatch(getRcmdNewAction())
        dispatch(getRcmdSingerAction())
        dispatch(getHotRadioAction())
    },[dispatch])
    useEffect(() => {
        logined && dispatch(getPersonalSongListAction())
        !logined && dispatch(getRcmdSongListAction())
    }, [logined,dispatch])
    // console.log(loaded)
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
