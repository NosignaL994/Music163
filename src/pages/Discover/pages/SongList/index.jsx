import "./style.less"

import { Skeleton } from "antd"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import SongListHeader from "./components/Header"
import SongListSonglists from "./components/Songlists"
import SongListPagination from "./components/Pagenation"
import {
    getTopSonglistAction,
    getSonglistCategoryAction} from "@/redux/actions/songlist"
export default function SongList () {
    const dispatch = useDispatch()
    const [page,setPage] = useState(1)
    const [pageSize] = useState(35)
    const topAllList = useSelector(state => state.songlist.get("topAllList"))
    useEffect(() => {
        dispatch(getSonglistCategoryAction())
    },[dispatch])
    useEffect(() => {
        const offset = topAllList.length
        const limit = page*pageSize - topAllList.length
        if (limit > 100 ) {
            dispatch(getTopSonglistAction(100,offset))
        } else if (limit >= pageSize) {
            dispatch(getTopSonglistAction(limit, offset))
        }
    },[page,topAllList,dispatch])
    return <Skeleton loading={!topAllList[(page-1)*pageSize]} active>
        <div className="discover-songlist w980">
            <SongListHeader/>
            <div className="songlist-content">
                <SongListSonglists page={page} pageSize={pageSize}/>
                <SongListPagination page={page} pageSize={pageSize} setPage={setPage}/>
            </div>
        </div>
    </Skeleton>
}