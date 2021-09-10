import "./style.less"

import { useDispatch,useSelector } from "react-redux";
import { message } from "antd";

import {
    setPlaySongAction,
    addPlayAction} from "@/redux/actions/playbar"
import {switchVipGuideVisibleAction} from "@/redux/actions/vipguide"
import {isAccessible} from "@/utils/common"
import {
    newToplistId,
    riseToplistId,
    originalToplistId} from "@/common/constant"

export default function RcmdTopList () {
    const dispatch = useDispatch()
    const {toplists} = useSelector(state => ({
        toplists: state.toplist.get('toplists')
    }))
    function playHandler (track) {
        return () => 
            dispatch(isAccessible(track) ? setPlaySongAction(track) : switchVipGuideVisibleAction())
    }
    function addPlayHandler (track) {
        return () => {
            dispatch(addPlayAction(track))
            openMsg()
        }
            
    }
    function openMsg () {
        message.info({
            content: '以添加到播放列表',
            className:'addplay-notice',
            icon: null,
        });
    }
    const rcmdToplists = [toplists[riseToplistId],toplists[newToplistId],toplists[originalToplistId]]
    // console.log(rcmdToplists)
    return <section className="rcmd-toplist">
        <header className="rcmd-toplist-hd recommend-main-hd">
            <h2 className="sprite_02 main-hd-title">
                <a href="javascript:;">榜单</a>
            </h2>
            <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
        </header>
        <div className="rcmd-toplist-content rcmd_toplist_bg">
            <ul>
                {
                    rcmdToplists.map(toplist => (
                        toplist && <li key={toplist.id}><dl>
                            <dt className="toplist-title">
                            <img src={toplist.coverImgUrl} alt="" />
                            <h3>
                                <a href="javascript:;">{toplist.name}</a>
                                <button className="toplist-play sprite_02"></button>
                                <button className="toplist-collect sprite_02"></button>
                            </h3>
                            </dt>
                            <dd>
                                <ol>
                                    {toplist.tracks.slice(0,10).map((track,idx) => (
                                <li key={track.id}>
                                    <span className={idx < 3 ? "toplist-rank toplist-topthree" : "toplist-rank"} >{idx+1}</span>
                                    <a className="toplist-song" href="javascript:;" >{track.name}</a>
                                    <div className="toplist-songbtns">
                                        <button className="toplist-songbtns-play sprite_02" onClick={playHandler(track)}></button>
                                        <button className="toplist-songbtns-add sprite_icon2" onClick={addPlayHandler(track)}></button>
                                        <button className="toplist-songbtns-collect sprite_02"></button>
                                    </div>
                                </li>
                                ))}
                                <li><a href="javascript:;" className="toplist-all">查看全部&nbsp;&gt;</a></li>
                            </ol></dd>
                        </dl></li>

                    ))
                }
                
                {/* <li><dl>
                <dt className="recommend-toplist-title">
                <img src={newToplist.coverImgUrl} alt="" />
                <h3>
                    <a href="javascript:;">{newToplist.name}</a>
                    <button className="recommend-toplist-listplay sprite_02"></button>
                    <button className="recommend-toplist-listcollect sprite_02"></button>
                </h3>
                </dt>
                <dd>
                    <ol>
                        {newToplist.tracks.slice(0,10).map((item,idx) => (
                        <li key={item.id}>
                            <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
                            <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
                            <div className="recommend-toplist-songbtns">
                                <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
                                <button className="recommend-toplist-add sprite_icon2"></button>
                                <button className="recommend-toplist-collect sprite_02"></button>
                            </div>
                        </li>
                        ))}
                        <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
                    </ol></dd></dl></li>

                <li><dl> */}
                {/* <dt className="recommend-toplist-title">
                <img src={originalToplist.coverImgUrl} alt="" />
                <h3>
                    <a href="javascript:;">{originalToplist.name}</a>
                    <button className="recommend-toplist-listplay sprite_02"></button>
                    <button className="recommend-toplist-listcollect sprite_02"></button>
                </h3>
                </dt>
                <dd> */}
                    {/* <ol>
                        {originalToplist.tracks.slice(0,10).map((item,idx) => ( */
                    //     <li key={item.id}>
                    //         <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
                    //         <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
                    //         <div className="recommend-toplist-songbtns">
                    //             <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
                    //             <button className="recommend-toplist-add sprite_icon2"></button>
                    //             <button className="recommend-toplist-collect sprite_02"></button>
                    //         </div>
                    //     </li>
                    //     ))}
                    //     <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
                       // </ol></dd></dl></li>
                        }
            </ul>
        </div>
    </section>

}
// class RecommendToplist extends Component {
//     playSongHandler = track => () => {
//         const {setPlaySongAction} = this.props
//         isAccessible(track) ? setPlaySongAction(track) : switchVipGuideVisibleAction()
//     }
//     render () {
//         const {risingToplist, newToplist, originalToplist} = this.props
//         return (
//             <section className="recommend-toplist">
//                 <header className="recommend-toplist-hd recommend-main-hd">
//                     <h2 className="sprite_02 main-hd-title">
//                         <a href="javascript:;">榜单</a>
//                     </h2>
//                     <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
//                 </header>
//                 <div className="recommend-toplist-content recommend_top_bg">
//                     <ul>

//                         <li><dl>
//                         <dt className="recommend-toplist-title">
//                         <img src={risingToplist.coverImgUrl} alt="" />
//                         <h3>
//                             <a href="javascript:;">{risingToplist.name}</a>
//                             <button className="recommend-toplist-listplay sprite_02"></button>
//                             <button className="recommend-toplist-listcollect sprite_02"></button>
//                         </h3>
//                         </dt>
//                         <dd>
//                             <ol>
//                                 {risingToplist.tracks.slice(0,10).map((item,idx) => (
//                                 <li key={item.id}>
//                                     <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
//                                     <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
//                                     <div className="recommend-toplist-songbtns">
//                                         <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
//                                         <button className="recommend-toplist-add sprite_icon2"></button>
//                                         <button className="recommend-toplist-collect sprite_02"></button>
//                                     </div>
//                                 </li>
//                                 ))}
//                                 <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
//                             </ol></dd></dl></li>

//                         <li><dl>
//                         <dt className="recommend-toplist-title">
//                         <img src={newToplist.coverImgUrl} alt="" />
//                         <h3>
//                             <a href="javascript:;">{newToplist.name}</a>
//                             <button className="recommend-toplist-listplay sprite_02"></button>
//                             <button className="recommend-toplist-listcollect sprite_02"></button>
//                         </h3>
//                         </dt>
//                         <dd>
//                             <ol>
//                                 {newToplist.tracks.slice(0,10).map((item,idx) => (
//                                 <li key={item.id}>
//                                     <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
//                                     <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
//                                     <div className="recommend-toplist-songbtns">
//                                         <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
//                                         <button className="recommend-toplist-add sprite_icon2"></button>
//                                         <button className="recommend-toplist-collect sprite_02"></button>
//                                     </div>
//                                 </li>
//                                 ))}
//                                 <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
//                             </ol></dd></dl></li>

//                         <li><dl>
//                         <dt className="recommend-toplist-title">
//                         <img src={originalToplist.coverImgUrl} alt="" />
//                         <h3>
//                             <a href="javascript:;">{originalToplist.name}</a>
//                             <button className="recommend-toplist-listplay sprite_02"></button>
//                             <button className="recommend-toplist-listcollect sprite_02"></button>
//                         </h3>
//                         </dt>
//                         <dd>
//                             <ol>
//                                 {originalToplist.tracks.slice(0,10).map((item,idx) => (
//                                 <li key={item.id}>
//                                     <span className={idx < 3 ? "recommend-toplist-rank recommend-toplist-topthree" : "recommend-toplist-rank"} >{idx+1}</span>
//                                     <a className="recommend-toplist-song" href="javascript:;" >{item.name}</a>
//                                     <div className="recommend-toplist-songbtns">
//                                         <button className="recommend-toplist-play sprite_02" onClick={this.playSongHandler(item)}></button>
//                                         <button className="recommend-toplist-add sprite_icon2"></button>
//                                         <button className="recommend-toplist-collect sprite_02"></button>
//                                     </div>
//                                 </li>
//                                 ))}
//                                 <li><a href="javascript:;" className="recommend-toplist-all">查看全部&nbsp;&gt;</a></li>
//                             </ol></dd></dl></li>
//                     </ul>
//                 </div>
//             </section>
//         )
        
//     }
// }

// function mapStateToProps(state) {
//     const discoverState = state.discover
//     return {
//         risingToplist: discoverState.get("risingToplist"),
//         newToplist: discoverState.get("newToplist"),
//         originalToplist: discoverState.get("originalToplist")

//     }
// }

// export default connect(mapStateToProps, {
//     setPlaySongAction,
// })(RecommendToplist)