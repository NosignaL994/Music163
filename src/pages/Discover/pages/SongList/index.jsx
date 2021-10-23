import "./style.less"

import { Skeleton } from "antd"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import SongListHeader from "./components/Header"
import SongListItems from "./components/Items"
import SongListPagination from "./components/Pagenation"
import {getSonglistCategoryAction} from "@/redux/actions/songlist"
export default function SongList () {
    const dispatch = useDispatch()
    const [cat,setCat] = useState("全部")
    const [page,setPage] = useState(1)
    const [pageSize] = useState(35)
    const [order,setOrder] = useState("hot")
    // const list = useSelector(state => state.songlist.getIn([cat,order]))
    useEffect(() => {
        dispatch(getSonglistCategoryAction())
    },[dispatch])
    return <div className="discover-songlist w980">
            <SongListHeader setCat={setCat} setPage={setPage} setOrder={setOrder} cat={cat} order={order} />
            <div className="songlist-content">
                <SongListItems page={page} pageSize={pageSize} cat={cat} order={order}/>
                <SongListPagination page={page} pageSize={pageSize} setPage={setPage} cat={cat}/>
            </div>
        </div>
    
}