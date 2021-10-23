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
export default function Toplist () {
    const dispatch = useDispatch()
    const {songlists,toplists,curId} = useSelector(state => ({
        songlists: state.songlist.get("songlists"),
        toplists: state.toplist.get("toplists"),
        curId: state.toplist.get("curId")
    }))
    useEffect(() => {
        dispatch(getToplistsAction())
    }, [dispatch])
    useEffect(() => {
        if (toplists && curId === 0) dispatch(setToplistCurIdAction(toplists[0].id))
    }, [toplists,dispatch])
    return <Skeleton loading={!toplists || !songlists.get(curId)}>
        <div className="discover-toplist w980">
            <ToplistNav />
            <ToplistDetail/>
        </div>
    </Skeleton>
}