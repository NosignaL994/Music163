const axios = require("axios")
const url = "/login/qr/create"
// url.searchParams.set("keyword", "修炼爱情")
// console.log(123);
axios({
    url,
    method: "get",
    baseURL: "http://localhost:4000",
    params: {
        key: 'c3958c6d-b479-4747-8382-80b917249092',
        // qrimg: true
    }
})
.then(response => console.log(response.data))
.catch(error => console.log(error))