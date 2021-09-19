import "./style.less"

import { Skeleton } from "antd"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import SongListHeader from "./components/Header"
import SongListSonglists from "./components/Songlists"
import SongListPagination from "./components/Pagenation"
import {
    getSonglistAction,
    getSonglistCategoryAction} from "@/redux/actions/discover/songlist"
export default function SongList () {
    const dispatch = useDispatch()
    const [page,setPage] = useState(1)
    const [pageSize, setPageSize] = useState(35)
    const songlists = useSelector(state => state.songlist.get("hqSongList"))
    useEffect(() => {
        dispatch(getSonglistCategoryAction())
    },[dispatch])
    useEffect(() => {
        const offset = songlists.length
        const limit = page*pageSize - songlists.length
        if (limit > 100 ) {
            dispatch(getSonglistAction(100,offset))
        } else if (limit >= pageSize) {
            dispatch(getSonglistAction(limit, offset))
        }
    },[page,songlists,dispatch])
    return <Skeleton loading={!songlists[(page-1)*pageSize]} active>
        <div className="discover-songlist w980">
            <SongListHeader/>
            <div className="songlist-content">
                <SongListSonglists page={page} pageSize={pageSize}/>
                <SongListPagination page={page} pageSize={pageSize} setPage={setPage}/>
            </div>
        </div>
    </Skeleton>
}