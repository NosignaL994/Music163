import './style.less'
import React,{useCallback} from "react"
import { useSelector,useDispatch } from 'react-redux';
import { setPlaylistAction } from '@/redux/actions/playbar';
import {getAndPlaySonglistAction} from "@/redux/actions/songlist"
import { formatCount } from '@/utils/format';
function MemoBtn ({type="button",onEvent="onClick",callbackProducer,feature,deps,children,className}) {
    const callback = callbackProducer(feature)
    const memoCallback = useCallback(callback,deps)
    return React.createElement(type,{className,[onEvent]:memoCallback},children)
}
export default function RcmdHot () {
    const dispatch = useDispatch()
    const {rcmdList,loginRcmdList,logined,songlists} = useSelector(state => ({
        rcmdList: state.songlist.get("rcmdList"),
        loginRcmdList: state.songlist.get("loginRcmdList"),
        logined: state.login.get("logined"),
        songlists: state.songlist.get("songlists")
    }))
    function playHandler (id) {
        return () => {
            if (songlists.has(id)) {
                dispatch(setPlaylistAction(songlists.get(id).tracks))
            } else {
                dispatch(getAndPlaySonglistAction(id))
            }
        }        
    }
    return <section className="discover-rcmd-hot">
        <header className="rcmd-hot-hd rcmd-main-hd">
            <h2 className="sprite_02 main-hd-title">
                <a href="javascript:;">热门推荐</a>
            </h2>
            <ul className="hot-hd-group">
                <li><a href="javascript:;">华语</a>|</li>
                <li><a href="javascript:;">流行</a>|</li>
                <li><a href="javascript:;">摇滚</a>|</li>
                <li><a href="javascript:;">民谣</a>|</li>
                <li><a href="javascript:;">电子</a></li>
            </ul>
            <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
        </header>
        <ul className="rcmd-hot-content">
            {
                (logined ? loginRcmdList : rcmdList).slice(0,8).map(item => (
                    <li key={item.id}>
                        <div className="hot-cover">
                            <div className="hot-cover-mask">
                                <img src={item.picUrl+"?param=140y140"} alt="" />
                                <MemoBtn className="hot-play sprite_icon" callbackProducer={playHandler} feature={item.id} deps={[songlists,dispatch]}></MemoBtn>
                                <div className="hot-playcount"><div className="sprite_icon"></div>{formatCount(item.playCount || item.playcount)}</div>
                            </div>
                        </div>
                        <a href="javascript:;"><p className="twoline">{item.name}</p></a>
                    </li>
                ))
            }
            
        </ul>
    </section>
}
