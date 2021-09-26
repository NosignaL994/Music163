import "./style.less"

import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export default function DownloadGuide () {
    const {id,toplists} = useSelector(state => ({
        id: state.toplist.get("id"),
        toplists: state.toplist.get("toplists")
    }))
    const detail = toplists.get(id)
    return detail.trackCount > detail.tracks.length && <div className="toplist-download-guide">
        <div>查看更多内容，请下载客户端</div>
        <NavLink to="/download">立即下载</NavLink>
    </div>
}