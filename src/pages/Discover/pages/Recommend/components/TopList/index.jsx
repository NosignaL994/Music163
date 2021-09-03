import "./style.less"

import { Component } from "react";
import { connect } from "react-redux";

import {setPlaySongAction,setPlayDurationAction,setPlayArtistsAction,setPlayIdAction } from "@/redux/actions/playbar"

class RecommendToplist extends Component {
    playSongHandler = track => () => {
        
        const {setPlayArtistsAction, setPlayDurationAction, setPlaySongAction, setPlayIdAction} = this.props
        setPlayArtistsAction(track)
        setPlayDurationAction(track)
        setPlaySongAction(track)
        setPlayIdAction(track)
    }
    render () {
        const {risingToplist, newToplist, originalToplist} = this.props
        console.log(risingToplist, newToplist, originalToplist);
        return (
            <section className="recommend-toplist">
                <header className="recommend-toplist-hd recommend-main-hd">
                    <h2 className="sprite_02 main-hd-title">
                        <a href="javascript:;">榜单</a>
                    </h2>
                    <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
                </header>
                <div className="recommend-toplist-content recommend-top-bg">
                    <ul>

                        <li><dl>
                        <dt className="recommend-toplist-title">
                        <img src={risingToplist.coverImgUrl} alt="" />
                        <h3>
                            <a href="javascript:;">{risingToplist.name}</a>
                            <button className="recommend-toplist-listplay sprite_02"></button>
                            <button className="recommend-toplist-listcollect sprite_02"></button>
                        </h3>
                        </dt>
                        <dd>
                            <ol>
                                {risingToplist.tracks.slice(0,10).map((item,idx) => (
                                <li key={item.id}>
                                    <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
                                    <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
                                    <div className="recommend-toplist-songbtns">
                                        <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
                                        <button className="recommend-toplist-add sprite_icon2"></button>
                                        <button className="recommend-toplist-collect sprite_02"></button>
                                    </div>
                                </li>
                                ))}
                                <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
                            </ol></dd></dl></li>

                        <li><dl>
                        <dt className="recommend-toplist-title">
                        <img src={newToplist.coverImgUrl} alt="" />
                        <h3>
                            <a href="javascript:;">{newToplist.name}</a>
                            <button className="recommend-toplist-listplay sprite_02"></button>
                            <button className="recommend-toplist-listcollect sprite_02"></button>
                        </h3>
                        </dt>
                        <dd>
                            <ol>
                                {newToplist.tracks.slice(0,10).map((item,idx) => (
                                <li key={item.id}>
                                    <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
                                    <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
                                    <div className="recommend-toplist-songbtns">
                                        <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
                                        <button className="recommend-toplist-add sprite_icon2"></button>
                                        <button className="recommend-toplist-collect sprite_02"></button>
                                    </div>
                                </li>
                                ))}
                                <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
                            </ol></dd></dl></li>

                        <li><dl>
                        <dt className="recommend-toplist-title">
                        <img src={originalToplist.coverImgUrl} alt="" />
                        <h3>
                            <a href="javascript:;">{originalToplist.name}</a>
                            <button className="recommend-toplist-listplay sprite_02"></button>
                            <button className="recommend-toplist-listcollect sprite_02"></button>
                        </h3>
                        </dt>
                        <dd>
                            <ol>
                                {originalToplist.tracks.slice(0,10).map((item,idx) => (
                                <li key={item.id}>
                                    <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
                                    <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
                                    <div className="recommend-toplist-songbtns">
                                        <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
                                        <button className="recommend-toplist-add sprite_icon2"></button>
                                        <button className="recommend-toplist-collect sprite_02"></button>
                                    </div>
                                </li>
                                ))}
                                <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
                            </ol></dd></dl></li>
                    </ul>
                </div>
            </section>
        )
        
    }
}

function mapStateToProps(state) {
    const discoverState = state.discover
    return {
        risingToplist: discoverState.get("risingToplist"),
        newToplist: discoverState.get("newToplist"),
        originalToplist: discoverState.get("originalToplist")

    }
}

export default connect(mapStateToProps, {
    setPlayDurationAction,
    setPlaySongAction,
    setPlayArtistsAction,
    setPlayIdAction
})(RecommendToplist)