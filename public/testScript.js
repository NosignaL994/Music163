const axios = require("axios")
const url = "/playlist/catlist"
axios({
    url,
    method: "get",
    baseURL: "http://localhost:3000",
    // params: {
    //     limit: 30,
    // }
})
.then(response => console.log(response.data))
.catch(error => console.log(error))
