import "./style.less"

import { Skeleton,Pagination,Button,Dropdown } from "antd"
import {CaretDownOutlined} from "@ant-design/icons"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState,Fragment } from "react"

import { formatCount } from "@/utils/format"
import {getPlaylistAction} from "@/redux/actions/playbar"
import {
    getHQSonglistAction,
    getSonglistCategoryAction} from "@/redux/actions/discover/songlist"
export default function SongList () {
    const dispatch = useDispatch()
    // const [before, setBefore] = useState(0)
    const [page,setPage] = useState(1)
    const [pageSize, setPageSize] = useState(35)
    // const [count, set]
    const {songlists,total,categories} = useSelector(state => ({
        songlists: state.songlist.get("hqSongList"),
        total: state.songlist.get("hqSongListCount"),
        categories: state.songlist.get("categories"),
    }))
    useEffect(() => {
        dispatch(getSonglistCategoryAction())
    },[dispatch])
    useEffect(() => {
        // console.log(before);
        const songToPage = Math.ceil(songlists.length/pageSize)
        const before = songlists[songlists.length-1]?.updateTime
        const limit = (page-songToPage) * pageSize
        if (limit > 100 ) {
            dispatch(getHQSonglistAction(100,before))
        } else if (limit > 0) {
            dispatch(getHQSonglistAction(limit, before))
        }
    },[page,songlists,dispatch])
    function playHandler(id) {
        return () => dispatch(getPlaylistAction(id))
    }
    function pageChangeHandler (curPage) {
        setPage(curPage)
    }
    console.log(categories);
    // console.log((page-1)*pageSize,page*pageSize)
    return <Skeleton loading={!songlists[(page-1)*pageSize] || categories===null} active>
        <div className="discover-songlist w980">
            <header className="songlist-hd">
                <h2 className="songlist-title">全部</h2>
                <Dropdown
                overlay={
                    <div className="songlist-menu">
                        <ul className="songlist-cat">
                            {categories && categories.map(category => (
                                <li key={category.id}>
                                    <dl>
                                        <dt>
                                            <i className={`sprite_icon2 songlist-cat-icon songlist-cat-icon${category.id}`}></i>
                                            <span>{category.cat}</span></dt>
                                        <dd>
                                        {category.group.map((item,idx,group) => (
                                            idx !== group.length-1 ?
                                            <Fragment>
                                            <a href="javascript:;">{item.name}</a>
                                            <span>|</span>
                                            </Fragment> :
                                            <a href="javascript:;">{item.name}</a>
                                        ))}
                                        </dd>
                                        
                                        
                                    </dl>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                trigger="click"
                arrow={true}>
                    <Button className="songlist-select">选择分类<CaretDownOutlined className="down-icon"/></Button>
                </Dropdown>
                <Button className="songlist-hot" type="primary">热门</Button>
            </header>
            <div className="songlist-content">
                <ul className="songlist-group">
                    {songlists.slice((page-1)*pageSize,page*pageSize).map(item => (
                        <li key={item.id}>
                            <div className="songlist-cover">
                            <div className="songlist-cover-mask">
                                <img src={item.coverImgUrl+"?param=140y140"} alt="" />
                                <button className="songlist-play sprite_icon" onClick={playHandler(item.id)}></button>
                                <div className="songlist-playcount"><div className="sprite_icon"></div>{formatCount(item.playcount||item.playCount)}</div>
                            </div>
                        </div>
                        <p className="songlist-name oneline">{item.name}</p>
                        <p className="songlist-author oneline">by&nbsp;<a href="javascript:;">{item.creator.nickname}</a></p>
                        </li>
                    ))}
                </ul>
                <Pagination 
                className="songlist-pagination"
                total={total} 
                current={page} 
                pageSize={pageSize}
                onChange={pageChangeHandler}
                />
            </div>
        </div>
    </Skeleton>
}