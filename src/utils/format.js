export function formatSongUrl (id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function formatMMSS (time) {
    time = new Date(time)
    let minute = time.getMinutes().toString()
    let second = time.getSeconds().toString()
    minute = minute.length === 1 ? '0'+minute : minute
    second = second.length === 1 ? '0'+second : second
    return minute + ':' + second
}