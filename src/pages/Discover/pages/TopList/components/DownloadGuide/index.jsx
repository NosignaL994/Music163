import "./style.less"

import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export default function DownloadGuide () {
    const {curId,songlists} = useSelector(state => ({
        curId: state.toplist.get("curId"),
        songlists: state.songlist.get("songlists")
    }))
    const detail = songlists.get(curId)
    return detail.trackCount > detail.tracks.length && <div className="toplist-download-guide">
        <div>查看更多内容，请下载客户端</div>
        <NavLink to="/download">立即下载</NavLink>
    </div>
}