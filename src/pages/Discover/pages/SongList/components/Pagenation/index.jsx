import "./style.less"
import { Pagination } from "antd"
import { useCallback } from "react"
import { useSelector } from "react-redux"
export default function SongListPagination ({cat,page,setPage}) {
    const {total} = useSelector(state => state.songlist.get(cat))
    const pageChangeHandler = useCallback(function (curPage) {
        setPage(curPage)
    }, [setPage])
    return <Pagination 
    className="songlist-pagination"
    total={total}
    current={page} 
    pageSize={35}
    onChange={pageChangeHandler}
    />
}