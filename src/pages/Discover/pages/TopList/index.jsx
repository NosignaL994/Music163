// import { Component } from "react";
import "./style.less"

import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { Skeleton } from "antd"

import ToplistNav from "./components/Nav"
import ToplistDetail from "./components/Detail"
import { 
    getToplistsAction,
    setToplistCurIdAction
} from "@/redux/actions/toplist"
import {
    getSonglistAction
} from "@/redux/actions/songlist"
import {getHotCommentAction} from "@/redux/actions/comment"
import { COMMENT_TYPE_SONGLIST } from "@/common/constant"
export default function Toplist () {
    const dispatch = useDispatch()
    const {toplistList,toplists,id} = useSelector(state => ({
        toplistList: state.toplist.get("toplistList"),
        toplists: state.toplist.get("toplists"),
        id: state.toplist.get("id")
    }))
    useEffect(() => {
        if (!toplistList) {
            dispatch(getToplistsAction())
        } else {
            dispatch(setToplistCurIdAction(toplistList[0].id))
            for (const toplist of toplistList) {
                dispatch(getSonglistAction(toplist.id))
            }
        }
    }, [toplistList,dispatch])
    useEffect(() => {
        toplistList && dispatch(getHotCommentAction(id,COMMENT_TYPE_SONGLIST,1))
    },[dispatch])
    return <Skeleton loading={!toplistList || !toplists.get(id)}>
        <div className="discover-toplist w980">
            <ToplistNav />
            <ToplistDetail/>
        </div>
    </Skeleton>
}