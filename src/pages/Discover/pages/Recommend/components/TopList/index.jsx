
import { notification } from "antd";
import "./style.less"

import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    setPlaySongAction,
    addPlayAction} from "@/redux/actions/playbar"
import { setToplistIndexAction } from "@/redux/actions/discover/toplist";
    
    export default function RcmdTopList () {
    const dispatch = useDispatch()
    const {toplistList,toplists} = useSelector(state => ({
        toplists: state.toplist.get("toplists"),
        toplistList: state.toplist.get('toplistList')
    }))
    function playHandler (track) {
        return () => dispatch(setPlaySongAction(track))
    }
    function addPlayHandler (track) {
        return () => {
            dispatch(addPlayAction(track))
            openNotification()
        }
    }
    function toToplistHandler (index) {
        return () => dispatch(setToplistIndexAction(index))
    }
    function openNotification () {
        notification.open({
            description: '',
            message: "已添加到播放列表",
            className:'addplay-notice',
            duration: 2
            // icon: null,
        });
    }
    // const rcmdToplists = [toplists[riseToplistId],toplists[newToplistId],toplists[originalToplistId]]
    // console.log(rcmdToplists)
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
                    toplistList.slice(0,3).map((toplist,index) => (
                        toplist && <li key={toplist.id}><dl>
                            <dt className="toplist-title">
                            <Link to="/discover/toplist" onClick={toToplistHandler(index)}><img src={toplist.coverImgUrl} alt="" /></Link>
                            <h3>
                                <a href="javascript:;">{toplist.name}</a>
                                <button className="toplist-play sprite_02"></button>
                                <button className="toplist-collect sprite_02"></button>
                            </h3>
                            </dt>
                            <dd>
                                <ol>
                                    {toplists.get(toplist.id) && toplists.get(toplist.id).tracks.slice(0,10).map((track,idx) => (
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
                                <li><Link to="/discover/toplist" onClick={toToplistHandler(index)} className="toplist-all">查看全部&nbsp;&gt;</Link></li>
                            </ol></dd>
                        </dl></li>

                    ))
                }
            </ul>
        </div>
    </section>
}