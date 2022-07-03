import { skyLoginRequest } from "./index"

export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success(res) {
        resolve(res.code)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export function codeToToken(code) {
  return skyLoginRequest.post("/login", {code})
}

export function checkToken(token) {
  return skyLoginRequest.post("/auth", {}, {
    token
  })
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}