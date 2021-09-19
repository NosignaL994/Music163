import "./style.less"
import { Pagination } from "antd"
import { useSelector } from "react-redux"
export default function SongListPagination (props) {
    const total = useSelector(state => state.songlist.get("hqSongListCount"))
    const {page, pageSize, setPage} = props
    function pageChangeHandler (curPage) {
        setPage(curPage)
    }
    return <Pagination 
    className="songlist-pagination"
    total={total} 
    current={page} 
    pageSize={pageSize}
    onChange={pageChangeHandler}
    />
}