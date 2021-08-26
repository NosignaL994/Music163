

import { Component, Fragment } from "react";
import { connect } from "react-redux";
import {Carousel} from "antd"

import "./style.css"
import "@/assets/styles/reset.css"


class RecommendNew extends Component {
    render () {
        const {recommendNews} = this.props
        return (
            <section className="discover-recommend-new">
                <header className="recommend-new-hd recommend-main-hd">
                    <h2 className="sprite_02 main-hd-title">
                        <a href="javascript:;">新碟上架</a>
                    </h2>
                    <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
                </header>
                <Carousel className="recommend-new-content" arrows dots={false}>
                    <ul className="recommend-new-list1">
                        {
                            recommendNews.slice(0,5).map(item => (
                                <li key={item.id}>
                                    <a href="javascript:;" className="recommend-new-cover sprite_cover"><img src={item.picUrl} alt="" /></a>
                                    <a href="javascript:;" className="recommend-new-name">{item.name}</a>
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
                    <ul className="recommend-new-list2">
                        {
                            recommendNews.slice(5,10).map(item => (
                                <li key={item.id}>
                                    <a href="javascript:;" className="recommend-new-cover sprite_cover"><img src={item.picUrl} alt="" /></a>
                                    <a href="javascript:;" className="recommend-new-name">{item.name}</a>
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
        )
    }
}
function mapStateToProps (state) {
    const discoverState = state.discover
    return {
        recommendNews: discoverState.get("recommendNews")
    }
}
export default connect(mapStateToProps, null)(RecommendNew)