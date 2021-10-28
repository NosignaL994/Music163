import "./style.less"

import { useSelector,useDispatch } from "react-redux"

import { 
    setToplistCurIdAction,
    setToplistCurPageAction
 } from "@/service/actions/toplist"
export default function ToplistNav () {
    const dispatch = useDispatch()
    const {toplists,curId} = useSelector(state => ({
        toplists: state.toplist.get("toplists"),
        curId: state.toplist.get("curId")
    }))
    function navClickHandler (id) {
        return () => {
            dispatch(setToplistCurPageAction(1))
            dispatch(setToplistCurIdAction(id))
        }
    }
    // console.log(curId);
    return <div className="toplist-nav">
        <section className="toplist-group-cloudmusic toplist-group">
            <header>
                <h2>云音乐特色榜</h2>
            </header>
            <ul>
                {toplists.slice(0,4).map(item => (
                    <li key={item.id}>
                        <button className={curId===item.id ? "toplist-active" : ""} onClick={navClickHandler(item.id)}>
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
                {toplists.slice(4).map(item => (
                    <li key={item.id}>
                        <button className={curId===item.id ? "toplist-active" : ""} onClick={navClickHandler(item.id)}>
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
