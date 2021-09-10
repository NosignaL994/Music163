import "./style.less"
import {Fragment, useState,useEffect,useRef } from "react";
import { Slider,Popover } from "antd"
import { useSelector,useDispatch } from "react-redux";

import {formatMMSS} from "@/utils/format"
import {
    setPlayIdxAction,
    setPlayUrlAction
} from "@/redux/actions/playbar"
import {switchVipGuideVisibleAction} from "@/redux/actions/vipguide"
import {isAccessible} from "@/utils/common"
import {formatSongUrl} from "@/utils/format"
export default function PlayBar () {
    // state
    const [progress,setProgress] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const [playing,setPlaying] = useState(false)
    const [sliderChanging,setSliderChanging] = useState(false)
    // ref
    const audio = useRef(null)
    // redux
    const dispatch = useDispatch()
    const {index, playlist,url} = useSelector(state => {
        const playbarState = state.playbar
        return {
            index: playbarState.get("playIdx"),
            playlist: playbarState.get("playlist"),
            url: playbarState.get("playUrl")
        }
    })

    useEffect(() => {
        if (!playlist.length) return
        index !== -1 && dispatch(setPlayUrlAction(playlist[index].id))
    },[index, playlist])

    useEffect(() => {
        if (!url) return
        audio.current.play().then(() => setPlaying(true))
        .catch(error => setPlayUrlAction(formatSongUrl(playlist[index].id)))
        
    },[url])

    useEffect(() => {
        if (!playlist.length) return
        index === -1 && dispatch(setPlayIdxAction(0))
    }, [playlist])
    function timeUpdateHandler (event) {
        if (sliderChanging) return
        const duration = playlist[index].dt
        const currentTime = event.target.currentTime * 1000
        const progress = (currentTime * 100) / duration
        setCurrentTime(currentTime)
        setProgress(progress)
    }
    function endedHandler () {
        setPlaying(false)
        const idx = index === playlist.length-1 ? 0 : index+1
        dispatch(isAccessible(playlist[idx]) ? setPlayIdxAction(idx) : switchVipGuideVisibleAction())
    
    }
    function sliderChangeHandler (value) {
        const duration = playlist[index].dt
        const newCurrentTime = (value * duration) / 100
        setSliderChanging(true)
        setProgress(value)
        setCurrentTime(newCurrentTime)
    }
    function sliderAfterChangeHandler () {
        setSliderChanging(false)
        audio.current.currentTime = currentTime / 1000
    }
    function switchChangeHandler () {
        if (!audio.current) return
        playing ? audio.current.pause() : audio.current.play()
        setPlaying(!playing)
    }
    function switchPrevHandler () {
        if (index > 0) {
            dispatch(isAccessible(playlist[index-1]) ? setPlayIdxAction(index-1):switchVipGuideVisibleAction())
        } else if (index === 0) replay()
    }
    function switchNextHandler () {
        if (index < playlist.length-1) {
            dispatch(isAccessible(playlist[index+1]) ? setPlayIdxAction(index+1):switchVipGuideVisibleAction())
        } else if (index === playlist.length-1) replay()
    }
    function playlistPlayHandler(idx) {
        return () => dispatch(setPlayIdxAction(idx))
    }
    function replay () {
        setProgress(0)
        setCurrentTime(0)
        audio.current.currentTime = 0
    }
    const song = index !== -1 && playlist.length && playlist[index]
    return <Fragment>
        <div className="playbar sprite_playbar">
            <div className="playbar-player w980">
                <div className="playbar-controls">
                    <button className="playbar-prev sprite_playbar" onClick={switchPrevHandler}></button>
                    <button 
                    className={playing ? 
                    "playbar-switch sprite_playbar playbar-switch-pause" :
                    "playbar-switch sprite_playbar playbar-switch-play"} 
                    onClick={switchChangeHandler}></button>
                    <button className="playbar-next sprite_playbar" onClick={switchNextHandler}></button>
                </div>
                <a href="javascript:;" className="playbar-cover">
                    <img src={song ? song.al.picUrl : "https://s4.music.126.net/style/web2/img/default/default_album.jpg"} alt="" />
                    <div className="playbar-cover-mask sprite_playbar"></div>
                </a>
                <div className="playbar-info">
                    <div className="playbar-songinfo">
                        {song && <a href="javascript:;" className="playbar-song">{song.name}</a>}
                        <div className="playbar-artists">
                        {
                            song && song.ar.map((item,idx,arr) => (
                                idx === arr.length-1 ? <a href="javascript:;" key={item.id}>{item.name}</a> : <Fragment key={item.id}>
                                    <a href="javascript:;" key={item.id}>{item.name}</a>&nbsp;/&nbsp;
                                </Fragment>
                            ))
                        }
                        </div>
                        
                    </div>
                    <div className="playbar-progress">
                        <Slider 
                        tooltipVisible={false}
                        disabled={song ? false : true}
                        defaultValue={0} 
                        value={progress} 
                        onChange={sliderChangeHandler} 
                        onAfterChange={sliderAfterChangeHandler} />
                        <span className="playbar-currentTime">{formatMMSS(currentTime)}</span>&nbsp;/&nbsp;
                        <span className="playbar-time">{song ? formatMMSS(song.dt) : formatMMSS(0)}</span>
                    </div>
                </div>
                
                <div className="playbar-btns">
                    <button className="playbar-btns-pip sprite_pip"></button>
                    <button className="playbar-btns-add sprite_playbar"></button>
                    <button className="playbar-btns-share sprite_playbar"></button>
                    <div className="split-line sprite_playbar"></div>
                    <button className="playbar-btns-volumn sprite_playbar"></button>
                    <button className="playbar-btns-order sprite_playbar"></button>
                    <Popover 
                    title="播放列表" 
                    overlayClassName="playbar-playlist" 
                    // defaultVisible={true}
                    content={(
                        playlist.length  ? 
                        (<ul>
                            {playlist.map((song,songIdx) => (
                                <li key={song.id} className={songIdx === index ? "playlist-active" : ""} onClick={playlistPlayHandler(songIdx)}>
                                    <div className="playbar-playlist-songinfo">
                                        <span className="playlist-songinfo-song">{song.name}</span>
                                        <span>&nbsp;-&nbsp;</span>
                                        {song.ar.map((artist,idx) => (
                                            (idx === 0) ? <a key={artist.id}>{artist.name}</a> : 
                                            <Fragment key={artist.id}>&nbsp;/&nbsp;<a key={artist.id}>{artist.name}</a></Fragment>
                                        ))}
                                    </div>
                                    <div className="playbar-playlist-btns">
                                        <button className="sprite_playlist playlist-btns-collect"></button>
                                        <button className="sprite_playlist playlist-btns-forward"></button>
                                        <button className="sprite_playlist playlist-btns-download"></button>
                                        <button className="sprite_playlist playlist-btns-delete"></button>
                                    </div>
                                </li>
                            ))}
                        </ul>) : (
                            <div className="playbar-playlist-empty">
                                播放列表为空，快去添加歌曲吧～
                            </div>
                        )
                    )}>
                        <button className="playbar-btns-playlist sprite_playbar">{playlist ? playlist.length : 0}</button>
                    </Popover>
                    
                </div>
            </div>
        </div>
        {song && <audio 
        ref={audio} 
        src={url}
        preload="auto"
        onTimeUpdate={timeUpdateHandler}
        onEnded={endedHandler}
        ></audio>}
    </Fragment>
}