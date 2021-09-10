import "./style.less"

import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"

import { formatDay,formatCount } from "@/utils/format"

import { getPlaylistAction } from "@/redux/actions/discover"

export default function RcmdPersonal () {
    // state
    const [date, setDate] = useState((new Date()).getDate())
    const [day, setDay] = useState(formatDay(new Date().getDay()))

    // useEffect(() => console.log(111))

    // redux
    const dispatch = useDispatch()
    const {songList} = useSelector(state => {
        const dscvState = state.discover
        return {
            songList: dscvState.get("songList")
        }
    })
    function playHandler(id) {
        return () => dispatch(getPlaylistAction(id))
    }
    return songList && <section className="rcmd-personal">
        <header className="rcmd-personal-hd recommend-main-hd">
            <h2 className="sprite_02 main-hd-title">
                <a href="javascript:;">个性化推荐</a>
            </h2>
            <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
        </header>
        <ul className="rcmd-personal-content">
            <li>
                <div href="javascript:;" className="personal-cover personal-date">
                    <div className="personal-weekday sprite_date">{day}</div>
                    <div className="personal-day sprite_date">{date}</div>
                </div>
                <a href="javascript:;" className="personal-title">每日歌曲推荐</a>
                <p>根据你的口味生成，<br/>每天6:00更新</p>
            </li>
            {
                songList.slice(0,3).map(item => (
                    <li key={item.id}>
                        <div href="javascript:;" className="personal-cover">
                            <img src={item.picUrl} alt="" />
                            <div className="personal-cover-mask">
                                <button className="personal-play sprite_icon" onClick={playHandler(item.id)}></button>
                                <div className="personal-playcount"><div className="sprite_icon"></div>{formatCount(item.playcount)}</div>
                            </div>
                        </div>
                        <a href="javascript:;" className="personal-title">{item.name}</a>
                        <p>{item.copywriter}</p>
                    </li>
                ))
            }
        </ul>
    </section>
}