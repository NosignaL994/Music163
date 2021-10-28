import "./style.less"

import { Dropdown,Button} from "antd"
import {CaretDownOutlined} from "@ant-design/icons"
import { useSelector } from "react-redux"
import { Fragment,useCallback,useEffect } from "react"
import { useDispatch } from "react-redux"
import {getSonglistCategoryAction} from "@/service/actions/songlist"
export default function SongListCategory ({setCat,setPage,cat,order,setOrder}) {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.songlist.get("categories"))
    
    function clickHandler (name) {
        return event => {
            event.preventDefault()
            setCat(name)
            setPage(1)
            setOrder("hot")
        }
    }
    const changeOrderHandler = useCallback(function () {
        // 关于顺序切换，api好像有点问题，new返回200但是没有数据，bug暂时无法修复
        setOrder(order === "hot" ? "new" : "hot")
    },[setOrder])
    return <header className="songlist-hd">
    <h2 className="songlist-title">{cat}</h2>
    <Dropdown
    overlay={
        <div className="songlist-menu">
            <div className="songlist-all"><Button onClick={clickHandler("全部")}>全部风格</Button></div>
            <ul className="songlist-cat">
                {categories && Object.entries(categories).map(([name,value]) => (
                    <li key={value.id}>
                        <dl>
                            <dt>
                                <i className={`sprite_icon2 songlist-cat-icon songlist-cat-icon${value.id}`}></i>
                                <span>{name}</span></dt>
                            <dd>
                            {value.list.map((item,idx,group) => (
                                idx !== group.length-1 ?
                                <Fragment key={idx}>
                                <a onClick={clickHandler(item)}>{item}</a>
                                <span>|</span>
                                </Fragment> :
                                <a key={idx} onClick={clickHandler(item)}>{item}</a>
                            ))}
                            </dd>
                            
                            
                        </dl>
                    </li>
                ))}
            </ul>
        </div>
    }
    trigger="click"
    arrow={true}>
        <Button className="songlist-select">选择分类<CaretDownOutlined className="down-icon"/></Button>
    </Dropdown>
    <Button className="songlist-hot" type="primary" onClick={changeOrderHandler}>{order === "hot" ? "最新" : "热门"}</Button>
</header>

}