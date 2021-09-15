import "./style.less"

import {useSelector} from "react-redux"

export default function RcmdSinger () {
    const {singers,singerToplist} = useSelector(state => ({
        singers: state.singer.get("singers"),
        singerToplist: state.singer.get('singerToplist')
    }))
    
    return <section className="rcmd-aside-singer">
        <header className="rcmd-aside-hd">
            <span>入驻歌手</span>
            <a href="#" className="rcmd-aside-all">查看全部&nbsp;&gt;</a>
        </header>
        <div className="rcmd-singer-content">
        <ul>
            {
                singerToplist && singerToplist.slice(0,5).map(item => (
                    <li key={item.id}><a href="#">
                        <img src={item.picUrl+"?param=62y62"} alt="" className="singer-avatar"/>
                        <div className="singer-msg">
                            <div className="singer-name">{item.name}</div>
                            <div className="singer-description">
                                {singers[item.id] && singers[item.id].identify.imageDesc}
                            </div>
                            
                        </div>
                    </a></li>
                ))
            }
        </ul>
        <a href="#" className="singer-apply sprite_button">申请成为网易音乐人</a>
        </div>
    </section>

}
