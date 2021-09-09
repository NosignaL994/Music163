import "./style.less"

import { Component, Fragment } from "react";
import {Carousel} from "antd"
import { useSelector,useDispatch } from "react-redux";

import {getRequest} from "@/utils/request"
import {isAccessible} from "@/utils/common"
import {setPlaylistAction} from "@/redux/actions/playbar"
import {switchVipVisibleAction} from "@/redux/actions/vip"

export default function RcmdNew () {
    const dispatch = useDispatch()
    const {news} = useSelector(state => {
        const dscvState = state.discover
        return {
            news: dscvState.get("news")
        }
    })
    function playHandler(id) {
        return () => getRequest("album", {
            id
        }).then(response => {
            const tracks = response.data.songs
            dispatch(isAccessible(tracks[0]) ? setPlaylistAction(tracks) : switchVipVisibleAction())
        }).catch(error => console.log(error))
    }
    return <section className="discover-recommend-new">
        <header className="recommend-new-hd recommend-main-hd">
            <h2 className="sprite_02 main-hd-title">
                <a href="javascript:;">新碟上架</a>
            </h2>
            <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
        </header>
        <Carousel className="rcmd-new-content" arrows dots={false}>
            <ul className="new-list1">
                {
                    news.slice(0,5).map(item => (
                        <li key={item.id}>
                            <a href="javascript:;" className="new-cover sprite_cover">
                                <img src={item.picUrl} alt="" />
                                <button className="new-play sprite_icon" onClick={playHandler(item.id)}></button>
                            </a>
                            <a href="javascript:;" className="new-name">{item.name}</a>
                            <p>
                                <a href="javascript:;">{item.artist.name}</a>
                                {
                                    item.artists.length > 1 && item.artists.slice(1).map(artist => (
                                        <Fragment key={artist.id}>
                                            &nbsp;/&nbsp;
                                            <a href="javascript:;">{artist.name}</a>
                                        </Fragment>))
                                }
                            </p>
                            
                        </li>
                    ))
                }
            </ul>
            <ul className="new-list2">
                {
                    news.slice(5,10).map(item => (
                        <li key={item.id}>
                            <a href="javascript:;" className="new-cover sprite_cover">
                                <img src={item.picUrl} alt="" />
                                <button className="new-play sprite_icon" onClick={playHandler(item.id)}></button>
                            </a>
                            <a href="javascript:;" className="new-name">{item.name}</a>
                            <p>
                                <a href="javascript:;">{item.artist.name}</a>
                                {
                                    item.artists.length > 1 && item.artists.slice(1).map(artist => (
                                        <Fragment key={artist.id}>
                                            &nbsp;/&nbsp;
                                            <a href="javascript:;">{artist.name}</a>
                                        </Fragment>))
                                }
                            </p>
                            
                        </li>
                    ))
                }
            </ul>
        </Carousel>
    </section>
}