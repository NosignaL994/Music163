
import { notification } from "antd";
import "./style.less"

import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect,useCallback, useMemo } from "react";
import {
    setPlaySongAction,
    addPlaySongAction
} from "@/redux/actions/playbar"
import { setToplistCurIdAction } from "@/redux/actions/toplist";
import { getSonglistAction } from "@/redux/actions/songlist";



export default function RcmdTopList () {
const dispatch = useDispatch()
const {songlists,toplists} = useSelector(state => ({
    toplists: state.toplist.get("toplists"),
    songlists: state.songlist.get('songlists')
}))
useEffect(() => {
    for (const toplist of toplists) {
        if (!songlists.has(toplist.id)) {
            dispatch(getSonglistAction(toplist.id))
        }
    }
}, [toplists, dispatch])
function playHandler (track) {
    return () => dispatch(setPlaySongAction(track))
}
function addPlayHandler (track) {
    return () => {
        dispatch(addPlaySongAction(track))
        openNotification()
    }
}
function toToplistHandler (id) {
    return () => dispatch(setToplistCurIdAction(id))
}
// const toToplistHandler = useMemo(id => () => dispatch(setToplistCurIdAction(id)), [dispatch])
function openNotification () {
    notification.open({
        description: '',
        message: "已添加到播放列表",
        className:'addplay-notice',
        duration: 2
    });
}
// const fun = () => useCallback(() => {}, [])
return <section className="rcmd-toplist">
    <header className="rcmd-toplist-hd rcmd-main-hd">
        <h2 className="sprite_02 main-hd-title">
            <a href="javascript:;">榜单</a>
        </h2>
        <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
    </header>
    <div className="rcmd-toplist-content rcmd_toplist_bg">
        <ul>
            {
                toplists.slice(0,3).map(toplist => (
                    <li key={toplist.id}><dl>
                        <dt className="toplist-title">
                        <Link to="/discover/toplist" onClick={toToplistHandler(toplist.id)}><img src={toplist.coverImgUrl} alt="" /></Link>
                        <h3>
                            <a href="javascript:;">{toplist.name}</a>
                            <button className="toplist-play sprite_02"></button>
                            <button className="toplist-collect sprite_02"></button>
                        </h3>
                        </dt>
                        <dd>
                            <ol>
                                {songlists.get(toplist.id) && songlists.get(toplist.id).tracks.slice(0,10).map((track,idx) => (
                            <li key={track.id}>
                                <span className={idx < 3 ? "toplist-rank toplist-topthree" : "toplist-rank"} >{idx+1}</span>
                                <a className="toplist-song" href="javascript:;" >{track.name}</a>
                                <div className="toplist-songbtns">
                                    <button className="toplist-songbtns-play sprite_02" onClick={playHandler(track)}></button>
                                    <button className="toplist-songbtns-add sprite_icon2" onClick={addPlayHandler(track)}></button>
                                    <button className="toplist-songbtns-collect sprite_02"></button>
                                </div>
                            </li>
                            ))}
                            <li><Link to="/discover/toplist" onClick={toToplistHandler(toplist.id)} className="toplist-all">查看全部&nbsp;&gt;</Link></li>
                        </ol></dd>
                    </dl></li>

                ))
            }
        </ul>
    </div>
</section>
}