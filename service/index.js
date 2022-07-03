const BASE_URL = "https://sky-netease-cloud-music-api.vercel.app"
const realIp = "116.25.146.177"
const LOGIN_BASE_URL = "http://123.207.32.32:3000"

const token = wx.getStorageSync('token')
class SKYRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.realIp = realIp
  }

  request(url,params,method,header) {
    return new Promise((resolve,reject) => {
      wx.request(
        {
          url: this.baseUrl + url,
          method,
          header,
          data: params,
          success(res) {
            resolve(res.data)
          },
          fail(err) {
            reject(err)
          }
        }
      )
    })
  }

  get(url,params,header) {
    return this.request(url,params,'get',header)
  }

  post(url,params,header) {
    return this.request(url,params,'post',header)
  }
}

const skyRequest = new SKYRequest(BASE_URL,realIp)
const skyLoginRequest = new SKYRequest(LOGIN_BASE_URL)

export default skyRequest
export {
  skyLoginRequest
}