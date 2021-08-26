
// 函数防抖
function debounce(func, delay) {
    let timer
    return (...args) => {
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(func.apply(this, args), delay)
    }
}

export default debounce