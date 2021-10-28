import "./style.less"

import { Skeleton } from "antd"

import SongListHeader from "./components/Header"
import SongListItems from "./components/Items"
import SongListPagination from "./components/Pagenation"
import { useSongListState } from "./hooks"
export default function SongList () {
    const {
        cat,
        setCat,
        page,
        setPage,
        order,
        setOrder,
        list
    } = useSongListState()
    return <div className="discover-songlist w980">
            <SongListHeader setCat={setCat} setPage={setPage} setOrder={setOrder} cat={cat} order={order} />
            <Skeleton className="songlist-content" loading={!(list && list.length > (page-1)*35)} active>
                <SongListItems page={page} pageSize={35} cat={cat} order={order}/>
                <SongListPagination page={page} pageSize={35} setPage={setPage} cat={cat}/>
            </Skeleton>
        </div>
    
}