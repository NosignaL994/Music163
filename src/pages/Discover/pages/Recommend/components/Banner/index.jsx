import { Carousel } from "antd";
import { useSelector } from "react-redux";
import "./style.less"


export default function RcmdBanner () {
    const banners = useSelector(state => state.recommend.get("banners"))
    return <Carousel className="recommend-banner-wrapper" effect="fade" autoplay arrows easing dots={{ className: "recommend-banner-dots" }}>
        {
            banners.map(item => (
                <div key={item.targetId} className="recommend-banner-item">
                    <div className="recommend-banner-filter" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                    <a href="javascript:;" className="recommend-banner-center w980"><img src={item.imageUrl} alt="" /></a>
                </div>))
        }
    </Carousel>
}