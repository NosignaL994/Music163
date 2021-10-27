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
// import {getBannerAction} from "./recommend"
import { useRcmdData } from "./hooks";



export default function DscvRcmd () {
    // redux hook
    const {songlist,album,toplist,singer,radio,logined} = useSelector(state => {
        return {
            songlist: state.songlist.get("rcmdList").size,
            album: state.album.get("newList").size,
            toplist: state.toplist.get("toplists"),
            singer: state.singer.get("topList").size,
            radio: state.radio.get("hotList").size,
            logined: state.login.get("logined")
        }
    })
    const loaded = songlist&&album&&toplist&&singer&&radio
    useRcmdData(logined)
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
