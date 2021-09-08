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