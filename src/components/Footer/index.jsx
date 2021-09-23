import "./style.less"

import { Component } from "react";

import policeImg from "@/assets/images/police.png"

export default class Footer extends Component {
    render () {
        return (
            <footer className="site-footer">
                <div className="footer-content w980">
                    <div className="footer-site-info">
                        <div className="footer-link">
                            <a href="https://st.music.163.com/official-terms/service">服务条款</a><span>|</span>
                            <a href="https://st.music.163.com/official-terms/privacy">隐私政策</a><span>|</span>
                            <a href="https://st.music.163.com/official-terms/children">儿童隐私政策</a><span>|</span>
                            <a href="https://music.163.com/st/staticdeal/complaints.html">版权投诉指引</a><span>|</span>
                            <a href="javascript:;">意见反馈</a><span>|</span>
                            <a href="mailto:yyyx@list.nie.netease.com">广告合作</a>
                        </div>
                        <p className="footer-copy-info">
                            <span>网易公司版权所有©1997-2021</span>
                            <span>杭州乐读科技有限公司运营：</span>
                            <a href="javascript:;">浙网文[2021] 1186-054号</a>
                            
                            
                        </p>
                        <p className="footer-report">
                            <span>违法和不良信息举报电话：0571-89853516</span>
                            <span>举报邮箱：</span>
                            <a href="mailto:ncm5990@163.com">ncm5990@163.com</a>
                        </p>
                        <p className="footer-site-register">
                            <a href="https://beian.miit.gov.cn/#/Integrated/index">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
                            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564">
                                <img src={policeImg} alt="" />
                                <span>浙公网安备 33010902002564号</span>
                            </a>
                        </p>
                    </div>
                    <ul className="footer-enter">
                        <li className="footer-enter-amped"><a href="https://web-amped.music.163.com/" className="sprite_footer2"></a><div className="sprite_footer1"></div></li>
                        <li className="footer-enter-authentication"><a href="https://music.163.com/st/userbasic#/auth" className="sprite_footer2"></a><div className="sprite_footer1"></div></li>
                        <li className="footer-enter-musician"><a href="https://music.163.com/musician/artist" className="sprite_footer2"></a><div className="sprite_footer1"></div></li>
                        <li className="footer-enter-appreciate"><a href="https://music.163.com/web/reward" className="sprite_footer2"></a><div className="sprite_footer1"></div></li>
                        <li className="footer-enter-reward"><a href="https://music.163.com/uservideo#/plan" className="sprite_footer2"></a><div className="sprite_footer1"></div></li>
                    </ul>
                    
                    
                    
                    
                    
                </div>
            </footer>
        )
    }
}