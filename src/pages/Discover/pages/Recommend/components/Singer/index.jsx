import "./style.less"

import {useSelector} from "react-redux"

export default function RcmdSinger () {
    const {singers,singerToplist} = useSelector(state => ({
        singers: state.singer.get("singers"),
        singerToplist: state.singer.get('singerToplist')
    }))
    // console.log(111)
    // console.log(singers);
    // console.log(singerToplist.slice(0,5))
    return <section className="recommend-aside-singer">
        <header className="recommend-aside-hd">
            <span>入驻歌手</span>
            <a href="#" className="recommend-aside-all">查看全部&nbsp;&gt;</a>
        </header>
        <div className="recommend-singer-content">
        <ul>
            {
                singerToplist && singerToplist.slice(0,5).map(item => (
                    <li key={item.id}><a href="#">
                        <img src={item.img1v1Url} alt="" className="recommend-singer-avatar"/>
                        <div className="recommend-singer-msg">
                            <div className="recommend-singer-name">{item.name}</div>
                            <div className="singer-description">
                                {singers[item.id].identify.imageDesc}
                            </div>
                            
                        </div>
                    </a></li>
                ))
            }
        </ul>
        <a href="#" className="recommend-singer-apply sprite_button">申请成为网易音乐人</a>
        </div>
    </section>

}
