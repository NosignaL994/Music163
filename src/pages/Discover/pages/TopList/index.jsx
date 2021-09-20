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
    const {toplistList,toplists} = useSelector(state => ({
        toplistList: state.toplist.get("toplistList"),
        toplists: state.toplist.get("toplists")
    }))
    const [id, setId] = useState(0)
    const [index,setIndex] = useState(0)
    useEffect(() => {
        if (!toplistList) {
            dispatch(getToplistListAction())
        } else {
            for (const toplist of toplistList) {
                dispatch(getToplistDetailAction(toplist.id))
            }
            setId(toplistList[0].id)
        }
    }, [toplistList,dispatch])
    // useEffect(() => {
    //     id !== 0 && dispatch(getToplistDetailAction(id))
    // }, [id,dispatch])
    return <Skeleton loading={!toplistList || !toplists[id]}>
        <div className="discover-toplist w980">
            <ToplistNav setId={setId} setIndex={setIndex} id={id}/>
            {/* <Switch>
                {Object.values(toplists).map(item => (
                    <Route key={item.id} path={`/discover/toplist/id=${item.id}`} render={ToplistDetail}/>
                ))}
            </Switch> */}
            <ToplistDetail id={id} index={index}/>
        </div>
    </Skeleton>
}