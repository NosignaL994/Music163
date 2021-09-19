const axios = require("axios")
const url = "/top/playlist"
axios({
    url,
    method: "get",
    baseURL: "http://localhost:4000",
    params: {
        // cookie:"__csrf=68e89970302f11d186bc63cdc99a069f; Max-Age=1296010; Expires=Thu, 23 Sep 2021 03:21:37 GMT; Path=/;;MUSIC_U=0431ff21080ad7caa7630ebd0435af101571a7188cd4e052e1e61f214006bab42db2b90205957188d78b6050a17a35e705925a4e6992f61dfe3f0151024f9e31; Max-Age=15552000; Expires=Mon, 7 Mar 2022 03:21:27 GMT; Path=/; HTTPOnly;NMTID=00OfTyRx56Jt1KIBkURnjR6PAbMr5sAAAF7w2y5rg; Max-Age=315360000; Expires=Sat, 6 Sep 2031 03:21:27 GMT; Path=/;",
        // id: 353898561
        limit: 10,
    }
})
.then(response => console.log(response.data))
.catch(error => console.log(error))

// function smallestDifference(arrayOne, arrayTwo) {
// // Write your code here.
//     let min = null
//     let result = new Array(2)
//     arrayOne.sort((a,b)=>a-b)
//     arrayTwo.sort((a,b)=>a-b)
//     for (const one of arrayOne) {
//         // let mid = Math.floor(arrayTwo.length/2)
//         let left = 0
//         let right = arrayTwo.length-1
//         while (left<=right) {
//             let mid = Math.floor((left+right)/2)
//             const diff = Math.abs(one-arrayTwo[mid])
//             if (one>arrayTwo[mid]) {
//                 if (min===null || diff<min) {
//                     min = diff
//                     result[0]=one
//                     result[1]=arrayTwo[mid]
//                 }
//                 left = mid+1
//             } else if (one < arrayTwo[mid]) {
//                 if (min===null || diff<min) {
//                     min = diff
//                     result[0]=one
//                     result[1]=arrayTwo[mid]
//                 }
//                 right = mid-1
//             } else {
//                 return [one,arrayTwo[mid]]
//             }
//         }
//     }
//     console.log(result,111)
// }
// function smallestDifference(arrayOne, arrayTwo) {
//     arrayOne.sort((a,b)=>a-b)
//     arrayTwo.sort((a,b)=>a-b)
//     let idxOne = 0
//     let idxTwo = 0
//     let smallest = Infinity
//     let current = Infinity
//     let smallestPair = []
//     while (idxOne<arrayOne.length&&idxTwo<arrayTwo.length) {
//         let firstNum = arrayOne[idxOne]
//         let secondNum = arrayTwo[idxTwo]
//         if (firstNum<secondNum) {
//             current = secondNum-firstNum
//             idxOne++
//         } else if (secondNum<firstNum) {
//             current = firstNum-secondNum
//             idxTwo++
//         } else {
//             return [firstNum,secondNum]
//         }
//         if (smallest>current) {
//             smallest=current
//             smallestPair = [firstNum,secondNum]
//         }
//     }
//     console.log(smallestPair)
// }
// const arrayOne = [10, 1000, 9124, 2142, 59, 24, 596, 591, 124, -123, 530]
// const arrayTwo = [-1441, -124, -25, 1014, 1500, 660, 410, 245, 530]
  
// smallestDifference(arrayOne,arrayTwo)