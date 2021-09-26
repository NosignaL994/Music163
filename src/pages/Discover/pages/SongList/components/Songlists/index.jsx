import "./style.less"
import { useSelector,useDispatch } from "react-redux"

import {setPlaylistAction} from "@/redux/actions/playbar"
import { formatCount } from "@/utils/format"

// import { useDispatch } from "react-redux"

export default function SongListSonglists (props) {
    const dispatch = useDispatch()
    const topAllList = useSelector(state => state.songlist.get("topAllList"))

    function playHandler(id) {
        return () => dispatch(setPlaylistAction(id))
    }
    const {page, pageSize} = props
    // console.log(props.page, props.pageSize)
    return <ul className="songlist-group">
    {topAllList.slice((page-1)*pageSize,page*pageSize).map((item,idx) => (
        <li key={item.id+idx}>
            <div className="songlist-cover">
                <div className="songlist-cover-mask">
                    <img src={item.coverImgUrl+"?param=140y140"} alt="" />
                    <button className="songlist-play sprite_icon" onClick={playHandler(item.id)}></button>
                    <div className="songlist-playcount"><div className="sprite_icon"></div>{formatCount(item.playcount||item.playCount)}</div>
                </div>
            </div>
            <p className="songlist-name oneline">{item.name}</p>
            <p className="songlist-author oneline">by&nbsp;<a href="javascript:void(0)">{item.creator.nickname}</a></p>
        </li>
    ))}
</ul>

}