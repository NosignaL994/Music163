import { 
    getTopSonglistAction,
    getLoginRcmdSonglistAction,
    getRcmdSongListAction } from "@/redux/actions/songlist";
import { getNewAlbumAction } from "@/redux/actions/album";
import { getTopSingerAction } from "@/redux/actions/singer";
import { getToplistsAction } from "@/redux/actions/toplist";
import {getHotRadioAction} from "@/redux/actions/radio"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
export function useRcmdData (logined) {
    const dispatch = useDispatch()
    useEffect(() => {
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