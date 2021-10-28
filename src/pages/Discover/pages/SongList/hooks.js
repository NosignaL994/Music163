import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    getTopSonglistAction,
    getSonglistCategoryAction
} from "@/service/actions/songlist"
export function useSongListState () {
    const dispatch = useDispatch()
    const [cat,setCat] = useState("全部")
    const [page,setPage] = useState(1)
    const [order,setOrder] = useState("hot")
    const {categories,list} = useSelector(state => ({
        categories:state.songlist.get("categories"),
        list: state.songlist.getIn([cat,order])
    }))
    useEffect(() => {
        dispatch(getSonglistCategoryAction())
    },[dispatch])

    useEffect(() => {
        if (!categories) return
        const offset = list.length
        const limit = page*35 - offset
        if (limit > 100 ) {
            dispatch(getTopSonglistAction(100,offset,cat,order))
        } else if (limit > 0) {
            dispatch(getTopSonglistAction(limit, offset,cat,order))
        }
    },[categories,page,cat,order,dispatch])
    return {
        cat,
        setCat,
        page,
        setPage,
        order,
        setOrder,
        list
    }
}