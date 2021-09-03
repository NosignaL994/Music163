const axios = require("axios")
const url = "/playlist/detail"
// url.searchParams.set("keyword", "修炼爱情")
// console.log(123);
axios({
    url,
    method: "get",
    baseURL: "https://netease-cloud-music-api-lilac-kappa.vercel.app",
    params: {
        id:3778678,
        limit: 5
    }
})
.then(response => console.log(response.data.playlist.tracks[0].ar))
.catch(error => console.log(error))