import "./style.less"

import { useSelector,useDispatch } from "react-redux"
import { getToplistDetailAction } from "@/redux/actions/discover/toplist"
import { NavLink } from "react-router-dom"
export default function ToplistNav (props) {
    const dispatch = useDispatch()
    const toplistList = useSelector(state => state.toplist.get("toplistList"))
    const {setId,setIndex,id} = props

    function navClickHandler (id,idx) {
        return () => {
            setId(id)
            setIndex(idx)
        }
    }
    return <div className="toplist-nav">
        <section className="toplist-group-cloudmusic toplist-group">
            <header>
                <h2>云音乐特色榜</h2>
            </header>
            <ul>
                {toplistList.slice(0,4).map((item,idx) => (
                    <li key={item.id}>
                        <button className={id===item.id && "toplist-active"} onClick={navClickHandler(item.id,idx)}>
                            <img src={item.coverImgUrl+"?param=40y40"} alt="" />
                            <div className="toplist-title">
                                <h3>{item.name}</h3>
                                <div>{item.updateFrequency}</div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
        <section className="toplist-group-global toplist-group">
            <header>
                <h2>全球媒体榜</h2>
            </header>
            <ul>
                {toplistList.slice(4).map((item,idx) => (
                    <li key={item.id}>
                        <button className={id===item.id && "toplist-active"} onClick={navClickHandler(item.id,idx)}>
                            <img src={item.coverImgUrl+"?param=40y40"} alt="" />
                            <div className="toplist-title">
                                <h3>{item.name}</h3>
                                <div>{item.updateFrequency}</div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    </div>
}
