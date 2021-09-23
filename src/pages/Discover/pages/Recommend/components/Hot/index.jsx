import './style.less'

import { useSelector,useDispatch } from 'react-redux';
import { getPlaylistAction } from '@/redux/actions/playbar';
import { formatCount } from '@/utils/format';
export default function RcmdHot () {
    const dispatch = useDispatch()
    const {songList} = useSelector(state => {
        const recommend = state.recommend
        return {
            songList: recommend.get("songList")
        }
    })
    function playHandler(id) {
        return () => dispatch(getPlaylistAction(id))
    }
    // console.log(songList)
    return <section className="discover-rcmd-hot">
        <header className="rcmd-hot-hd rcmd-main-hd">
            <h2 className="sprite_02 main-hd-title">
                <a href="javascript:;">热门推荐</a>
            </h2>
            <ul className="hot-hd-group">
                <li><a href="javascript:;">华语</a>|</li>
                <li><a href="javascript:;">流行</a>|</li>
                <li><a href="javascript:;">摇滚</a>|</li>
                <li><a href="javascript:;">民谣</a>|</li>
                <li><a href="javascript:;">电子</a></li>
            </ul>
            <a href="javascript:;" className="main-hd-more sprite_02">更多</a>
        </header>
        <ul className="rcmd-hot-content">
            {
                songList.map(item => (
                    <li key={item.id}>
                        <div className="hot-cover">
                            <div className="hot-cover-mask">
                                <img src={item.picUrl+"?param=140y140"} alt="" />
                                <button className="hot-play sprite_icon" onClick={playHandler(item.id)}></button>
                                <div className="hot-playcount"><div className="sprite_icon"></div>{formatCount(item.playcount||item.playCount)}</div>
                            </div>
                        </div>
                        <a href="javascript:;"><p className="twoline">{item.name}</p></a>
                    </li>
                ))
            }
            
        </ul>
    </section>
}
