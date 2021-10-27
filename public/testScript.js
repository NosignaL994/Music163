const axios = require("axios")
const url = "/dj/catelist"
const request = axios.create({
    baseURL: "http://localhost:3000",
})
request.interceptors.response.use(response => response.data,error => console.log(error))

request.get(url).then(data => console.log(data))
// axios({
//     url,
//     method: "get",
//     baseURL: "http://localhost:3000",
//     // params: {
//     //     limit: 30,
//     // }
// })
// .then(response => console.log(response.data))
// .catch(error => console.log(error))
