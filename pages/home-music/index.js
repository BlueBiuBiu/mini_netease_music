// pages/home-music/index.js
import { getBanners } from "../../service/api_music"
import { queryRect, throttle } from "../../utils/index"

const throttleQueryRect = throttle(queryRect, 300)

Page({
  data: {
    banners: [],
    searchValue: "",
    swiperHeight: 0,
    currentBannerIndex: 0
  },
  onLoad(options) {
    this.getInit() // 初始化
  },

  getInit() {
    getBanners().then(res => {
      this.setData({
          banners: res.banners
      })
    })
  },

  loadImage() {
    throttleQueryRect(".swiper-image").then(res => {
      this.setData({
        swiperHeight: res[0].height
      })
    })
  },

  imageChange(e) {
    this.setData({
      currentBannerIndex: e.detail.current
    })
  },

  searchClick() {
    wx.navigateTo({
      url: '/packageSearch/pages/search/index',
    })
  }
})