import { QR_TIMEOUT,QR_SCANNED } from "@/constant"
import { useQrLogin } from "./hooks"
import scannedImg from "./images/scan_success.png"
export default function QrImg() {
    const { qrimg, key,code, refreshQrHandler } = useQrLogin()
    
    return code === QR_SCANNED ?
        <div className="login-qr-commit">
            <img src={scannedImg} alt="" />
            <div>扫描成功</div>
            <div>请在手机上确认登录</div>
        </div> :
        <div className="discover-login-qr">
            <div className="login-qr-left qr_guide"></div>

            <div className="login-qr-right">
                <div className="qr-right-title">扫码登录</div>
                <div
                    className={key === QR_TIMEOUT ? "qr-right-pic out-of-date" : "qr-right-pic"}>
                    <img src={qrimg} />
                    <div className="qr-pic-mask">
                        <div>二维码已失效</div>
                        <button onClick={refreshQrHandler}>点击刷新</button>
                    </div>
                </div>
                <div className="qr-right-state">
                    使用&nbsp;<a href="https://music.163.com/download">网易云音乐APP</a>&nbsp;扫码登录
                </div>
            </div>
        </div>

}