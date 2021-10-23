export function formatSongUrl (id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function formatMMSS (time) {
    time = new Date(Math.floor(time))
    let minute = time.getMinutes().toString()
    let second = time.getSeconds().toString()
    minute = minute.length === 1 ? '0'+minute : minute
    second = second.length === 1 ? '0'+second : second
    return minute + ':' + second
}
export function formatNum2(num) {
    return ((num < 10) ? '0' : "") + num
}
export function formatDay (day) {
    switch (day) {
        case 0:
            return "星期天"
        case 1:
            return "星期一"
        case 2:
            return "星期二"
        case 3:
            return "星期三"
        case 4:
            return "星期四"
        case 5:
            return "星期五"
        case 6:
            return "星期六"
        default:
            console.log("date transform error!")
            break;
    }
}
export function formatDate (timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return {
        year,
        month: formatNum2(month+1), 
        day: formatNum2(day)
    }
}
export function formatDate2 (timestamp) {
    const now = new Date()
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const nowYear = now.getFullYear()
    const nowMonth = now.getMonth()
    const nowDay = now.getDate()
    if (nowYear-year >= 1) {
        return year + "年" + formatNum2(month+1) + "月" + formatNum2(day) + "日"
    } else if (nowMonth!==month || nowDay-day>1) {
        return formatNum2(month+1) + "月" + formatNum2(day)  + "日"
    } else if (nowDay !== day) {
        return "昨天" + formatNum2(date.getHours()) + ":" + formatNum2(date.getMinutes())
    } else {
        return formatNum2(date.getHours()) + ":" + formatNum2(date.getMinutes())
    }
}
export function formatCount (count) {
    // console.log()
    switch (true) {
        case Math.floor(count/100000000) > 0:
            return (Math.round(Math.floor(count/10000000)) / 10).toString() + "亿"
        case Math.floor(count/10000) > 0:
            return (Math.round(Math.floor(count/1000)) / 10).toString() + "万"
        default:
            return count
    }
}