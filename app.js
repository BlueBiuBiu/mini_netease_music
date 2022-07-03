// app.js
import { login, codeToToken, checkToken, checkSession } from "./service/api_login"

App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
  },
  async onLaunch() {
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    
    // 登录
    // const token = wx.getStorageSync('token')
    // token有没有过期
    // const checkResult = token ? await checkToken(token) : ''
    // const isSessionExpire = await checkSession()
    // if(!token || checkResult.errorCode || !isSessionExpire) {
    //   this.loginAction()
    // }
  },

  async loginAction() {
    const code = await login()
    const res =  await codeToToken(code)
    wx.setStorageSync('token', res.token)
  }
})

