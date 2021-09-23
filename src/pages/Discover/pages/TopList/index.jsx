// import { Component } from "react";
import "./style.less"

import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Skeleton } from "antd"

import ToplistNav from "./components/Nav"
import ToplistDetail from "./pages/Detail"
import { getToplistListAction,getToplistDetailAction } from "@/redux/actions/discover/toplist"

export default function Toplist () {
    const dispatch = useDispatch()
    const {toplistList,toplists,index} = useSelector(state => ({
        toplistList: state.toplist.get("toplistList"),
        toplists: state.toplist.get("toplists"),
        index: state.toplist.get("index")
    }))
    useEffect(() => {
        if (!toplistList) {
            dispatch(getToplistListAction())
        } else {
            for (const toplist of toplistList) {
                dispatch(getToplistDetailAction(toplist.id))
            }
        }
    }, [toplistList,dispatch])
    return <Skeleton loading={!toplistList || !toplists.get(toplistList[index].id)}>
        <div className="discover-toplist w980">
            <ToplistNav />
            <ToplistDetail/>
        </div>
    </Skeleton>
}