import { Carousel } from "antd";
import "./style.less"


import { Component } from "react";
import { connect } from "react-redux";


// import { changeBannerAction } from "@/redux/actions/recommend"


class RecommendBanner extends Component {

    // changeBanner = (from, to) => this.props.changeBannerAction(to)

    render() {
        const { banners } = this.props
        return (
            <Carousel className="recommend-banner-wrapper" effect="fade" autoplay arrows easing dots={{ className: "recommend-banner-dots" }}>
                {
                    banners.map(item => (
                        <div key={item.targetId} className="recommend-banner-item">
                            <div className="recommend-banner-filter" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                            <a href="javascript:;" className="recommend-banner-center w980"><img src={item.imageUrl} alt="" /></a>
                        </div>))
                }
            </Carousel>

        )

    }
}

function mapStateToProps(state) {
    const recommend = state.recommend
    return {
        banners: recommend.get("banners"),
        currentIdx: recommend.get("currentBanner")
    }
}

export default connect(mapStateToProps, null)(RecommendBanner)