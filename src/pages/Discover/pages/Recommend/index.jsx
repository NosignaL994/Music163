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
import { useRcmdData,useRcmdLoaded } from "./hooks";



export default function DscvRcmd () {
    // redux hook
    const logined = useSelector(state => state.user.get("logined"))
    useRcmdData()
    const loaded = useRcmdLoaded()
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
