import { 
    getTopSonglistAction,
    getLoginRcmdSonglistAction,
    getRcmdSongListAction
} from "@/service/actions/songlist";
import { getNewAlbumAction } from "@/service/actions/album";
import { getTopSingerAction } from "@/service/actions/singer";
import { getToplistsAction } from "@/service/actions/toplist";
import {getHotRadioAction} from "@/service/actions/radio"
import {getBannerAction} from "./components/Banner/actions"

import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
export function useRcmdData () {
    const logined = useSelector(state => state.user.get("logined"))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBannerAction())
        dispatch(getRcmdSongListAction())
        dispatch(getTopSingerAction())
        dispatch(getTopSonglistAction())
        dispatch(getNewAlbumAction())
        dispatch(getToplistsAction())
        dispatch(getHotRadioAction())
    },[dispatch])
    useEffect(() => {
        logined && dispatch(getLoginRcmdSonglistAction())
    },[logined,dispatch])
}

export function useRcmdLoaded () {
    const {songlist,album,toplist,singer,radio} = useSelector(state => {
        return {
            banner: state.banner.get("banners"),
            songlist: state.songlist.get("rcmdList").size,
            album: state.album.get("newList").size,
            toplist: state.toplist.get("toplists"),
            singer: state.singer.get("topList").size,
            radio: state.radio.get("hotList").size
        }
    })
    const loaded = songlist&&album&&toplist&&singer&&radio
    return loaded
}