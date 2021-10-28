import './style.less'
import { useSelector } from 'react-redux';
import { formatCount } from '@/utils/format';
import MemoBtn from '@/components/MemoBtn';
import { usePlayListHandler } from '@/service/hooks/playbar';

export default function RcmdHot () {
    const {rcmdList,loginRcmdList,logined} = useSelector(state => ({
        rcmdList: state.songlist.get("rcmdList"),
        loginRcmdList: state.songlist.get("loginRcmdList"),
        logined: state.user.get("logined"),
    }))
    const playHandler = usePlayListHandler()
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
                (logined ? loginRcmdList : rcmdList).slice(0,8).map(item => (
                    <li key={item.id}>
                        <div className="hot-cover">
                            <div className="hot-cover-mask">
                                <img src={item.picUrl+"?param=140y140"} alt="" />
                                <MemoBtn className="hot-play sprite_icon" onClick={playHandler(item.id)}></MemoBtn>
                                <div className="hot-playcount"><div className="sprite_icon"></div>{formatCount(item.playCount || item.playcount)}</div>
                            </div>
                        </div>
                        <a href="javascript:;"><p className="twoline">{item.name}</p></a>
                    </li>
                ))
            }
            
        </ul>
    </section>
}
