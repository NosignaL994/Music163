

import { Component } from "react";
import { Carousel } from "antd";
import { connect } from "react-redux";

import "@/assets/styles/reset.css"
import "./style.less"

import {changeBannerAction} from "@/redux/actions/discover"


class RecommendBanner extends Component {
    
    // changeBanner = (from, to) => this.props.changeBannerAction(to)

    render () {
        const {banners} = this.props
        return (
            <Carousel className="recommend-banner-wrapper" effect="fade" autoplay arrows easing dots={{className:"recommend-banner-dots"}}>
                {
                    banners.map(item => (
                    <div key={item.targetId} className="recommend-banner-item">
                            <div className="recommend-banner-filter" style={{backgroundImage:`url(${item.imageUrl})`}}></div>
                            <a href="javascript:;" className="recommend-banner-center w980"><img src={item.imageUrl} alt="" /></a>
                    </div>))
                }
            </Carousel>
            
        )
       
    }
}

function mapStateToProps (state) {
    const discoverState = state.discover
    return {
        banners: discoverState.get("banners"),
        currentIdx: discoverState.get("currentBanner")
    }
}

export default connect(mapStateToProps, null)(RecommendBanner)