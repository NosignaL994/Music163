import "./style.less"
import React, { Component, Fragment } from "react";
import {connect} from "react-redux"
import { Slider } from "antd"

import {formatSongUrl,formatMMSS} from "@/utils/format"

class PlayBar extends Component {
    state = {
        progress: 0,
        currentTime: 0,
        playing: false
    }
    audio = React.createRef()
    
    sliderChangeHandler = value => {
        const {duration} = this.props
        
        const newCurrentTime = (value * duration) / 100
        this.setState({progress: value, currentTime: newCurrentTime})
        return newCurrentTime
    }
    sliderAfterChangeHandler = value => {
        const newCurrentTime = this.sliderChangeHandler(value)
        this.audio.current.currentTime = newCurrentTime

    }
    switchChangeHandler = () => {
        if (!this.props.song) {
            return 
        }
        const {playing} = this.state
        if (playing) {
            this.audio.current.pause()
        } else {
            this.audio.current.play()
        }
        this.setState({playing: !playing})
    }
    componentDidUpdate () {
        console.log(this.props.id);
        this.props.id && (this.audio.current.src = formatSongUrl(this.props.id))
    }
    render () {
        const { progress,currentTime,playing } = this.state
        const { song, duration, artists} = this.props
        const name = song?.name
        const picUrl = song?.picUrl
        console.log(song);
        return (
            <Fragment>
                <div className="playbar sprite_playbar">
                    <div className="playbar-player w980">
                        <div className="playbar-controls">
                            <button className="playbar-prev sprite_playbar"></button>
                            <button className={playing ? "playbar-switch sprite_playbar playbar-switch-pause" : "playbar-switch sprite_playbar playbar-switch-play"} onClick={this.switchChangeHandler}></button>
                            <button className="playbar-next sprite_playbar"></button>
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
                                <span className="playbar-time">{formatMMSS(duration)}</span>
                            </div>
                        </div>
                        
                        <div className="playbar-btns">
                            <button className="playbar-btns-pip sprite_pip"></button>
                            <button className="playbar-btns-add sprite_playbar"></button>
                            <button className="playbar-btns-share sprite_playbar"></button>
                            <div className="split-line sprite_playbar"></div>
                            <button className="playbar-btns-volumn sprite_playbar"></button>
                            <button className="playbar-btns-order sprite_playbar"></button>
                            <button className="playbar-btns-list sprite_playbar">0</button>
                            
                        </div>
                    </div>
                </div>
                {song && <audio 
                ref={this.audio} 
                preload="auto"
                ></audio>}
            </Fragment>
        
    )}
}
function mapStateToProps (state) {
    const playbar = state.playbar
    return {
        song: playbar.get("song"),
        duration: playbar.get("duration"),
        artists: playbar.get("artists"),
        id: playbar.get("id")
    }
}
export default connect(mapStateToProps, {
    // getDefaultPlayAction
})(PlayBar)