import "./style.less"

import { Button } from "antd";
import { 
    PlayCircleOutlined,
    PlusOutlined,
    FolderAddOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    CommentOutlined,
    ClockCircleOutlined,
    PlayCircleFilled } from "@ant-design/icons"
import { useSelector,useDispatch } from "react-redux"
import { Fragment } from "react";

import { formatDate,formatMMSS } from "@/utils/format";
import {setPlaySongAction,addPlayAction,setPlaylistAction} from "@/redux/actions/playbar"
import { NavLink } from "react-router-dom";

export default function ToplistDetail () {
    const dispatch = useDispatch()
    const {toplists, toplistList,index} = useSelector(state => ({
        toplists: state.toplist.get("toplists"),
        toplistList: state.toplist.get("toplistList"),
        index: state.toplist.get("index")
    }))
    function toplistPlayHandler (toplist) {
        return () => dispatch(setPlaylistAction(toplist))
    }
    function songPlayHandler (track) {
        return () => dispatch(setPlaySongAction(track))
    }
    function addPlayHandler (track) {
        return () => dispatch(addPlayAction(track))
    }
    
    const toplist = toplistList[index]
    const detail = toplists.get(toplist.id)
    const {month, day} = formatDate(toplist.updateTime)
    // console.log(detail)

    return <div className="toplist-detail">
        <header className="toplist-detail-hd">
            <img src={detail.coverImgUrl+"?param=150y150"} alt="" />
            <div className="toplist-info">
                <h2 className="toplist-name">{detail.name}</h2>
                <div className="toplist-updatetime"><ClockCircleOutlined />&nbsp;最近更新：{month}月{day}日&nbsp;&nbsp;&nbsp;<span>({toplist.updateFrequency})</span></div>
                <div className="toplist-btns">
                    <Button type="primary" className="toplist-play" onClick={toplistPlayHandler(detail.tracks)}><PlayCircleOutlined/>播放</Button>
                    <Button type="primary" className="toplist-add"><PlusOutlined /></Button>
                    <Button className="ant-btn-normal-reset"><FolderAddOutlined />({detail.subscribedCount})</Button>
                    <Button className="ant-btn-normal-reset"><ShareAltOutlined />({detail.shareCount})</Button>
                    <Button className="ant-btn-normal-reset"><DownloadOutlined />下载</Button>
                    <Button className="ant-btn-normal-reset"><CommentOutlined />({detail.commentCount})</Button>
                </div>
            </div>
        </header>
        <div className="toplist-detail-songs">
            <div className="toplist-songshd">
                <h2>歌曲列表</h2>
                <span>{detail.trackCount}首歌</span>
                <div className="toplist-playcount">播放：<span>{detail.playCount}</span>次</div>
            </div>
            <table className="toplist-songstable">
                <thead>
                    <tr>
                        <th className="toplist-rank-th"></th>
                        <th className="toplist-name-th">标题</th>
                        <th className="toplist-long-th">时长</th>
                        <th className="toplist-singer-th">歌手</th>
                    </tr>   
                </thead>
                <tbody>
                    {detail.tracks.map((item,idx) => (
                        <tr key={item.id} className={idx<3 ? "toplist-top3" : ""}>
                            <td className="toplist-rank"><div>{idx+1}</div></td>
                            <td>
                                {idx<3 && <img src={item.al.picUrl+"?param=50y50"} alt=""/>}
                                <button onClick={songPlayHandler(item)}><PlayCircleFilled /></button>
                                <a href="javascript:;">{item.name}</a>
                                
                                {item.alia.length>0 && 
                                <span className="toplist-alia">
                                    {item.alia.map((alia,idx) => (
                                        <Fragment key={idx}>{idx === 0 && " - "}{alia}{idx !== item.alia.length-1 && " / "}</Fragment>
                                    ))}
                                </span>
                                }
                                
                            </td>
                            <td>
                                <span className="toplist-duration">{formatMMSS(item.dt)}</span>
                                <div className="toplist-songbtns">
                                    <button className="toplist-songadd sprite_icon2" onClick={addPlayHandler(item)}></button>
                                    <button className="toplist-songcollect sprite_table"></button>
                                    <button className="toplist-songforward sprite_table"></button>
                                    <button className="toplist-songdownload sprite_table"></button>
                                </div>
                            </td>
                            <td>{item.ar.map((artist,index) => (
                                index === item.ar.length-1 ? <a href="javascript:;" key={index}>{artist.name}</a> :
                                <Fragment key={index}><a href="javascript:;">{artist.name}</a>&nbsp;/&nbsp;</Fragment>
                            ))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {detail.trackCount > detail.tracks.length && <div className="toplist-download-guide">
            <div>查看更多内容，请下载客户端</div>
            <NavLink to="/download">立即下载</NavLink>
        </div>}
    </div>
}