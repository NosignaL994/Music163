import "./style.less"

import { Dropdown,Button} from "antd"
import {CaretDownOutlined} from "@ant-design/icons"
import { useSelector } from "react-redux"
import { Fragment } from "react"

export default function SongListHeader () {
    const categories = useSelector(state => state.songlist.get("categories"))
    return <header className="songlist-hd">
    <h2 className="songlist-title">全部</h2>
    <Dropdown
    overlay={
        <div className="songlist-menu">
            <ul className="songlist-cat">
                {categories !== null && categories.map(category => (
                    <li key={category.id}>
                        <dl>
                            <dt>
                                <i className={`sprite_icon2 songlist-cat-icon songlist-cat-icon${category.id}`}></i>
                                <span>{category.cat}</span></dt>
                            <dd>
                            {category.group.map((item,idx,group) => (
                                idx !== group.length-1 ?
                                <Fragment key={idx}>
                                <a href="javascript:;">{item.name}</a>
                                <span>|</span>
                                </Fragment> :
                                <a href="javascript:;" key={idx}>{item.name}</a>
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
    <Button className="songlist-hot" type="primary">热门</Button>
</header>

}