const axios = require("axios")
const url = "/dj/toplist"
// url.searchParams.set("keyword", "修炼爱情")
// console.log(123);
axios({
    url,
    method: "get",
    baseURL: "https://netease-cloud-music-api-lilac-kappa.vercel.app",
    params: {
        limit: 5
    }
})
.then(response => console.log(response.data))
.catch(error => console.log(error))