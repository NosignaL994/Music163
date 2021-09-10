const axios = require("axios")
const url = "/song/url"
// url.searchParams.set("keyword", "修炼爱情")
// console.log(123);
axios({
    url,
    method: "get",
    baseURL: "http://localhost:4000",
    params: {
        // cookie:"__csrf=68e89970302f11d186bc63cdc99a069f; Max-Age=1296010; Expires=Thu, 23 Sep 2021 03:21:37 GMT; Path=/;;MUSIC_U=0431ff21080ad7caa7630ebd0435af101571a7188cd4e052e1e61f214006bab42db2b90205957188d78b6050a17a35e705925a4e6992f61dfe3f0151024f9e31; Max-Age=15552000; Expires=Mon, 7 Mar 2022 03:21:27 GMT; Path=/; HTTPOnly;NMTID=00OfTyRx56Jt1KIBkURnjR6PAbMr5sAAAF7w2y5rg; Max-Age=315360000; Expires=Sat, 6 Sep 2031 03:21:27 GMT; Path=/;",
        id: 1876436805
    }
})
.then(response => console.log(response.data))
.catch(error => console.log(error))