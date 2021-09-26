import { useSelector } from "react-redux"
import "./style.less"

export default function RcmdRadio () {
    const {hotRadios} = useSelector(state => ({
        hotRadios: state.radio.get("hotList")
    }))
    return <section className="discover-rcmd-anchor">
        <header className="rcmd-aside-hd">
            <span>热门电台</span>
        </header>
        <div className="rcmd-radio-content">
            <ul>
                {
                    hotRadios&&hotRadios.slice(0,5).map(item => (
                        <li key={item.id}><a href="javascript:;">
                            <img src={item.picUrl+"?param=40y40"} alt="" className="radio-avatar"/>
                            <div className="radio-info">
                                <div className="radio-name oneline">{item.name}</div>
                                <div className="radio-text oneline">{item.rcmdtext}</div>
                            </div>
                        </a></li>
                    ))
                }
            </ul>
        </div>
    </section>

}