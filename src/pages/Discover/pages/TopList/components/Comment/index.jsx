import "./style.less"

import {Comment, Avatar, Form, Button, List,Input} from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"


export default function ToplistComment () {
    const [value, setValue] = useState("")
    const {songlistHot} = useSelector(state => ({
        songlistHot: state.comment.get("songlistHot")
    }))
    const {TextArea} = Input
    return <div className="toplist-comment">
        <header className="comment-hd toplist-hdstyle">
            <h2>评论</h2>
            <span className="hd-total">共{}条评论</span>
        </header>
        <Comment 
        avatar={
            <Avatar 
            src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
            size={50}
            shape={"square"}
            />
        }
        content={
            <div className="toplist-comment-editor">
                <Form.Item>
                    <TextArea rows={3} value={value}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">评论</Button>
                </Form.Item>
            </div>
            
        }
        />
        <ul>
            {}
        </ul>

    </div>
    
}