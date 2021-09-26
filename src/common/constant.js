// export const BASE_URL = "https://netease-cloud-music-api-lilac-kappa.vercel.app"
export const BASE_URL = "http://localhost:4000"
export const SEARCH_SUGGEST_URL = "/search/suggest"

export const DEFAULT_REQUEST_TIMEOUT = 5000

// id
export const newToplistId = 3779629
export const riseToplistId = 19723756
export const originalToplistId = 2884035
export const hotToplistId = 3778678

// comment type
export const COMMENT_TYPE_SONG = 0
export const COMMENT_TYPE_MV = 1
export const COMMENT_TYPE_SONGLIST = 2
export const COMMENT_TYPE_ABLUM = 3
export const COMMENT_TYPE_RADIO = 4
export const COMMENT_TYPE_VEDIO = 5

// URI API
    // songlist
export const SONGLIST_URI = "/playlist/detail"
export const RCMD_SONGLIST_URI = '/personalized'
export const LOGIN_RCMD_SONGLIST_URI = "/recommend/resource"
export const TOP_SONGLIST_URI = "/top/playlist"
export const SONG_TRACK_URI = "/song/detail"
    // singer
export const TOP_SINGER_URI = '/top/artists'
export const SINGER_DETAIL_URI = "/artist/detail"

    // album
export const NEW_ALBUM_URI = '/album/newest'
    // toplist
export const TOPLISTS_URI = "/toplist"

    // playbar
export const SONG_URL_URI= "/song/url"