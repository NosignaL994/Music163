import "./style.less"
import React, { Component, Fragment, useLayoutEffect } from "react";
import {connect} from "react-redux"
import { Slider,Popover } from "antd"

import {formatSongUrl,formatMMSS} from "@/utils/format"
import {setPlayIdxAction} from "@/redux/actions/playbar"
import { Link } from "react-router-dom";
class PlayBar extends Component {
    state = {
        progress: 0,
        currentTime: 0,
        playing: false,
        sliderChanging: false,
    }
    audio = React.createRef()
    componentDidUpdate (prevProps) {
        if (this.props.playIdx === prevProps.playIdx && this.props.playlist === prevProps.playlist) return
        this.audio.current.play().then(_ => this.setState({playing: true}))
    }
    timeUpdateHandler = event => {
        const {sliderChanging} = this.state
        const {playIdx, playlist} = this.props
        const duration = playlist[playIdx].dt
        if (sliderChanging) return
        const currentTime = event.target.currentTime * 1000
        const progress = (currentTime * 100) / duration
        this.setState({currentTime, progress})
    }
    endedHandler = () => {
        this.setState({playing: false})
        const {playIdx,setPlayIdxAction,playlist} = this.props
        if (playIdx === playlist.length-1) {
            setPlayIdxAction(0)
        } else {
            setPlayIdxAction(playIdx-1)
        }
    }
    sliderChangeHandler = value => {
        const { playIdx, playlist } = this.props
        const duration = playlist[playIdx].dt
        const newCurrentTime = (value * duration) / 100
        this.setState({sliderChanging:true,progress: value, currentTime: newCurrentTime})
    }
    sliderAfterChangeHandler = () => {
        this.setState({sliderChanging: false})
        this.audio.current.currentTime = this.state.currentTime / 1000
    }
    switchChangeHandler = () => {
        if (this.props.playIdx === -1) return
        const {playing} = this.state
        const audio = this.audio.current;
        if (playing) {
            audio.pause()
        } else {
            audio.play()
        }
        this.setState({playing: !playing})
    }
    switchPrevHandler = () => {
        const {playIdx,setPlayIdxAction} = this.props
        if (playIdx > 0) {
            setPlayIdxAction(playIdx-1)
        } 
    }
    switchNextHandler = () => {
        const {playIdx,setPlayIdxAction,playlist} = this.props
        if (playIdx < playlist.length-1) {
            setPlayIdxAction(playIdx+1)
        }
    }
    
    render () {
        const { progress, currentTime, playing } = this.state
        const { playIdx, playlist } = this.props
        const song = playIdx !== -1 && playlist[playIdx]
        const picUrl = song && song.al.picUrl
        const name = song && song.name
        const duration = song && song.dt
        const artists = song && song.ar
        const id = song && song.id
        const url = song && formatSongUrl(id)
        return (
            <Fragment>
                <div className="playbar sprite_playbar">
                    <div className="playbar-player w980">
                        <div className="playbar-controls">
                            <button className="playbar-prev sprite_playbar" onClick={this.switchPrevHandler}></button>
                            <button className={playing ? "playbar-switch sprite_playbar playbar-switch-pause" : "playbar-switch sprite_playbar playbar-switch-play"} onClick={this.switchChangeHandler}></button>
                            <button className="playbar-next sprite_playbar" onClick={this.switchNextHandler}></button>
                        </div>
                        <a href="javascript:;" className="playbar-cover">
                            <img src={picUrl || "https://s4.music.126.net/style/web2/img/default/default_album.jpg"} alt="" />
                            <div className="playbar-cover-mask sprite_playbar"></div>
                        </a>
                        <div className="playbar-info">
                            <div className="playbar-songinfo">
                                <a href="javascript:;" className="playbar-song">{name}</a>
                                <div className="playbar-artists">
                                {
                                    artists && artists.map((item,idx,arr) => (
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
                                disabled={!duration}
                                defaultValue={0} 
                                value={progress} 
                                onChange={this.sliderChangeHandler} 
                                onAfterChange={this.sliderAfterChangeHandler} />
                                <span className="playbar-currentTime">{formatMMSS(currentTime)}</span>&nbsp;/&nbsp;
                                <span className="playbar-time">{duration ? formatMMSS(duration) : formatMMSS(0)}</span>
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
                            defaultVisible={true}
                            content={(
                                playlist.length ? 
                                (<ul>
                                    {playlist.map(song => (
                                        <li key={song.id}>
                                            <div className="playbar-playlist-songinfo">
                                                <span className="playlist-songinfo-song">{song.name}</span>
                                                <span>-</span>
                                                {song.ar.map((artist,idx,artists) => (
                                                    (idx === artists.length-1) ? <a key={artist.id}>{artist.name}</a> : 
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
                {url && <audio 
                ref={this.audio} 
                src={url}
                preload="auto"
                onTimeUpdate={this.timeUpdateHandler}
                onEnded={this.endedHandler}
                ></audio>}
            </Fragment>
        
    )}
}
function mapStateToProps (state) {
    const playbar = state.playbar
    return {
        playIdx: playbar.get("playIdx"),
        playlist: playbar.get("playlist")
    }
}
export default connect(mapStateToProps, {
    setPlayIdxAction
})(PlayBar)