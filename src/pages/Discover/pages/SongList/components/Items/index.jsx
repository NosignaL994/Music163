import "./style.less"
import { useSelector } from "react-redux"

import MemoBtn from "@/components/MemoBtn"
import { formatCount } from "@/utils/format"
import { usePlayListHandler } from "@/service/hooks/playbar"


export default function SongListItems ({cat,order,page}) {
    const list = useSelector(state => state.songlist.getIn([cat,order]))
    const playHandler = usePlayListHandler()
    return <ul className="songlist-group">
            {list && list.slice((page-1)*35,page*35).map((item,idx) => (
                <li key={item.id+idx}>
                    <div className="songlist-cover">
                        <div className="songlist-cover-mask">
                            <img src={item.coverImgUrl+"?param=140y140"} alt="" />
                            <MemoBtn className="songlist-play sprite_icon" onClick={playHandler(item.id)}></MemoBtn>
                            <div className="songlist-playcount"><div className="sprite_icon"></div>{formatCount(item.playcount||item.playCount)}</div>
                        </div>
                    </div>
                    <p className="songlist-name oneline">{item.name}</p>
                    <p className="songlist-author oneline">by&nbsp;<a href="javascript:void(0)">{item.creator.nickname}</a></p>
                </li>
            ))}
        </ul>
}