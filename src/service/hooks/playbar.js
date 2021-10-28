import { useDispatch, useSelector } from "react-redux"
import { getSonglistAction } from "@/service/actions/songlist"
import { getAlbumAction }from "@/service/actions/album"
import { setPlaylistAction } from "@/service/actions/playbar"
import { useCallback } from "react"
export function usePlayListHandler () {
    const dispatch = useDispatch()
    const songlists = useSelector(state => state.songlist.get("songlists"))
    const playHandler = useCallback(function (id) {
        return () => {
            if (songlists.has(id)) {
                dispatch(setPlaylistAction(songlists.get(id).tracks))
            } else {
                // dispatch返回的期约解决为最后的action对象，data是请求回来的数据
                dispatch(getSonglistAction(id))
                .then(({data}) => dispatch(setPlaylistAction(data.tracks)))
            }
        }
    },[songlists])
    return playHandler
}

export function usePlayAlbumHandler () {
    const dispatch = useDispatch()
    const albums = useSelector(state => state.album.get("albums"))
    const playHandler = useCallback(function (id) {
        return () => {
            if (albums.has(id)) {
                dispatch(setPlaylistAction(albums.get(id).tracks))
            } else {
                // dispatch返回的期约解决为最后的action对象，data是请求回来的数据
                dispatch(getAlbumAction(id))
                .then(({data}) => dispatch(setPlaylistAction(data.songs)))
            }
        }
    },[albums])
    return playHandler
}