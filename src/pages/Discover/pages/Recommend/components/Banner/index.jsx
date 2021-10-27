import { Carousel } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBannerAction } from "./actions";
import "./style.less"


export default function RcmdBanner () {
    const dispatch = useDispatch()
    const banners = useSelector(state => state.recommend.get("banners"))
    useEffect(() => {
        dispatch(getBannerAction())
    },[dispatch])
    return banners && <Carousel className="recommend-banner-wrapper" effect="fade" autoplay arrows easing dots={{ className: "recommend-banner-dots" }}>
        {
            banners.map(item => (
                <div key={item.targetId} className="recommend-banner-item">
                    <div className="recommend-banner-filter" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                    <a href="javascript:;" className="recommend-banner-center w980"><img src={item.imageUrl} alt="" /></a>
                </div>))
        }
    </Carousel>
}