import "./style.less"
import {LikeOutlined} from "@ant-design/icons"
import {Comment, Avatar, Button, Input,Pagination, Skeleton} from "antd"
import { useEffect, useState} from "react"
import { useSelector,useDispatch } from "react-redux"

import { getHotCommentAction,getNewCommentAction,switchLikeCommentAction } from "@/redux/actions/comment"
import {
    setToplistCurPageAction
} from "@/redux/actions/toplist"
import {switchLoginVisibleAction} from "@/redux/actions/login"
import {COMMENT_TYPE_SONGLIST,COMMENT_URI,COMMENT} from "@/constant"
import { formatDate2 } from "@/utils/format"
import debounce from "@/utils/debounce"
import request from "@/utils/request"


export default function ToplistComment () {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const {curId,curPage,songlist:{[curId]:commentObj},profile,logined} = useSelector(state => ({
        songlist: state.comment.get("songlist"),
        curId: state.toplist.get("curId"),
        curPage: state.toplist.get("curPage"),
        profile: state.login.get("profile"),
        logined: state.login.get("logined")
    }))
    // console.log(commentObj);
    const hotComments = commentObj?.hot
    const newComments = commentObj?.new
    const total = commentObj?.total
    // const cursor = commentObj?.cursor
    useEffect(() => {
        !hotComments && dispatch(getHotCommentAction(COMMENT_TYPE_SONGLIST,curId))
        !newComments && dispatch(getNewCommentAction(curId))
    },[curId,dispatch])
    useEffect(() => {
        if (newComments) {
            const length = newComments.length || 0
            const limit = curPage*20 - length
            const before = newComments[length-1].time
            if (limit > 100) {
                dispatch(getNewCommentAction(curId,length,before,100))
            } else if (limit > 0) {
                dispatch(getNewCommentAction(curId,length,before,limit))
            }
        }
    }, [curPage,newComments,dispatch])
    function pageChangeHandler (page) {
        dispatch(setToplistCurPageAction(page))
    }
    function textChangeHandler (event) {
        setValue(event.target.value)
    }
    // function textClickHandler () {
    //     !logined && dispatch(switchLoginVisibleAction())
    // }
    function commentHandler () {
        if (!value ) return
        request.post(COMMENT_URI,{
            t:COMMENT,
            type:COMMENT_TYPE_SONGLIST,
            id: curId,
            content:value
        }).catch(error => console.log(error))
    }
    function likeHandler (comment,commentType,index) {
        let realIndex = index
        if (commentType === "new") {
            realIndex = (curPage-1)*20 + index
        }
        return event => {
            event.preventDefault()
            dispatch(logined ? 
                switchLikeCommentAction(COMMENT_TYPE_SONGLIST,["songlist",curId,commentType],comment,realIndex)
                 : switchLoginVisibleAction())
        }   
    }
    function replayHandler () {
        return event => {
            event.preventDefault()
        }
    }
    // console.log(newComments);
    const {TextArea} = Input
    return<div className="toplist-comment">
        <header className="comment-hd toplist-hdstyle">
            <h2>评论</h2>
            <span className="hd-total">共{total}条评论</span>
        </header>
        <Comment 
        avatar={
            <Avatar 
            src={logined&&profile ? profile.avatarUrl : "http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"}
            size={50}
            shape={"square"}
            />
        }
        content={
            <div className="toplist-editor" >
                    <TextArea 
                    disabled={!logined} 
                    showCount 
                    rows={3} 
                    value={value} 
                    name="comment" 
                    onChange={debounce(textChangeHandler,400)} 
                    placeholder={logined ? "评论限制140字" : "请先登录"}
                    // onClick={textClickHandler}
                    />
                    <Button htmlType="submit" type="primary" className="toplist-commentv" onClick={commentHandler}>评论</Button>
            </div>
        }/>
        {
            hotComments && curPage === 1 && <div className="toplist-comment-group hot-comment">
                <h3>精彩评论</h3>
                <ul>
                    {hotComments.map((comment,index) => (
                        <li key={comment.commentId}>
                            <Comment
                            avatar={
                                <Avatar 
                                src={comment.user.avatarUrl}
                                size={50}
                                />
                            }
                            content={
                                <div className="comment-content">
                                    <a href="javascript:;" className="comment-user">{comment.user.nickname}</a>
                                    <span>：{comment.content}</span>
                                </div>
                            }
                            actions={
                                [<a href="javascript:;" className="comment-like" onClick={likeHandler(comment,"hot",index)}>
                                    <LikeOutlined style={{color: comment.liked ? "#c20c0c" : "#0c73c2"}}/>({comment.likedCount})
                                    </a>, 
                                <a href="javascript:;" className="comment-replay">回复</a>]
                            }
                            datetime={formatDate2(comment.time)}/>
                        </li>
                    ))}
                </ul>
            </div>
        }
        <Skeleton loading={!(newComments && newComments[(curPage-1)*20])} active>
            <div className="toplist-comment-group new-comment">
                <h3>最新评论</h3>
                <ul>
                    {newComments && newComments.slice((curPage-1)*20,curPage*20).map((comment,index) => (
                        <li key={comment.commentId}>
                            <Comment
                            avatar={
                                <Avatar 
                                src={comment.user.avatarUrl}
                                size={50}
                                />
                            }
                            content={
                                <section>
                                    <div className="comment-content">
                                        <a href="javascript:;" className="comment-user">{comment.user.nickname}</a>
                                        <span>：{comment.content}</span>
                                    </div>
                                    {comment.beReplied.length>0 && comment.beReplied.map(replied => <div className="comment-replied">
                                        <a href="javascript:;" className="comment-user">{replied.user.nickname}</a>
                                        <span>：{replied.content}</span>
                                    </div>)}
                                    <a className="comment-replay" onClick={replayHandler}>回复</a>
                                    <a className="comment-like" onClick={likeHandler(comment,"new",index)}>
                                        <LikeOutlined style={{color: comment.liked ? "#c20c0c" : "#0c73c2"}}/>({comment.likedCount})
                                    </a>
                                    
                                </section>
                                
                            }
                            datetime={formatDate2(comment.time)}/>
                        </li>
                    ))}
                </ul>
                <Pagination
                total={total}
                current={curPage}
                pageSize={20}
                showSizeChanger={false}
                onChange={pageChangeHandler}
                />
            </div>
        </Skeleton>
        
    </div>
}