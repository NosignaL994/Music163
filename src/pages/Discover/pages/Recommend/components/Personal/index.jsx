import "./style.less"

import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"

import { formatDay,formatCount } from "@/utils/format"
import { usePlayListHandler } from "@/service/hooks/playbar"
import MemoBtn from "@/components/MemoBtn"

export default function RcmdPersonal () {
    // state
    const [date] = useState((new Date()).getDate())
    const [day] = useState(formatDay(new Date().getDay()))

    // redux
    const {loginRcmdList} = useSelector(state => ({
        loginRcmdList: state.songlist.get("loginRcmdList"),
        songlists: state.songlist.get("songlists")
    }))
    const playHandler = usePlayListHandler()
    
    return loginRcmdList && <section className="rcmd-personal">
        <header className="rcmd-personal-hd rcmd-main-hd">
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
                loginRcmdList.slice(0,3).map(item => (
                    <li key={item.id}>
                        <div href="javascript:;" className="personal-cover">
                            <div className="personal-cover-mask">
                                <img src={item.picUrl+"?param=140y140"} alt="" />
                                <MemoBtn className="personal-play sprite_icon" onClick={playHandler(item)}></MemoBtn>
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