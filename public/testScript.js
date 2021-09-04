const axios = require("axios")
const url = "/check/music"
// url.searchParams.set("keyword", "修炼爱情")
// console.log(123);
axios({
    url,
    method: "get",
    baseURL: "https://netease-cloud-music-api-lilac-kappa.vercel.app",
    params: {
        id: 1437266892
    }
})
.then(response => console.log(response.data))
.catch(error => console.log(error))