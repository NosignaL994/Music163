const localStorage = window.localStorage

export function saveCookie (cookie) {
    localStorage.setItem("cookie", cookie)
}
export function getCookie () {
    return localStorage.getItem("cookie")
}