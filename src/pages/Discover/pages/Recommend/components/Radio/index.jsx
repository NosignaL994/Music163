import { useSelector } from "react-redux"
import "./style.less"

export default function RcmdRadio () {
    const {radios} = useSelector(state => ({
        radios: state.radio.get("hotRadio")
    }))
    return <section className="discover-rcmd-anchor">
        <header className="rcmd-aside-hd">
            <span>热门电台</span>
        </header>
        <div className="rcmd-radio-content">
            <ul>
                {
                    radios&&radios.slice(0,5).map(item => (
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