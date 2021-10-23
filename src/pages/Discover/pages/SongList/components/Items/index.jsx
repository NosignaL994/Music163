import "./style.less"
import { useSelector,useDispatch } from "react-redux"
import { Skeleton } from "antd"
import { useEffect } from "react"

import {setPlaylistAction} from "@/redux/actions/playbar"
import {getTopSonglistAction} from "@/redux/actions/songlist"
import { formatCount } from "@/utils/format"

// import { useDispatch } from "react-redux"

export default function SongListItems ({cat,order,page}) {
    const dispatch = useDispatch()
    const {categories,list} = useSelector(state => ({
        categories: state.songlist.get("categories"),
        list: state.songlist.getIn([cat,order])
    }))
    // const abc = useSelector(state => state.songlist.get(cat))
    // console.log(abc);
    function playHandler(id) {
        return () => dispatch(setPlaylistAction(id))
    }
    useEffect(() => {
        if (!categories) return
        // console.log(1);
        const offset = list.length
        const limit = page*35 - offset
        if (limit > 100 ) {
            dispatch(getTopSonglistAction(100,offset,cat,order))
        } else if (limit > 0) {
            dispatch(getTopSonglistAction(limit, offset,cat,order))
        }
    },[categories,page,cat,order,dispatch])

    // console.log(list);
    return <Skeleton loading={!(list && list.length > (page-1)*35)} active>
        <ul className="songlist-group">
            {list && list.slice((page-1)*35,page*35).map((item,idx) => (
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
    </Skeleton>
   
}