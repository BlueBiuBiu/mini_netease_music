// pages/search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from '../../../service/api_search'
import { debounce, stringToNodes } from "../../../utils/index"

const getDebounceSearchResult = debounce(getSearchResult)

Page({
  data: {
    searchValue: "",
    searchType: "normal",
    searchSongs: [],
    richSearchSongs: [],
    hotKeywords: [],
    suggestSongs: [],
  },

  onLoad(options) {
    this.getInit()
  },

  // 搜索内容改变
  searchContentChange(e) {
    this.setData({
      searchValue: e.detail
    })
    if(!this.data.searchValue) {
      this.setData({
        searchType: "normal",
        richSearchSongs: []
      })
    }
    this.getRequestResult()
  },

  // 搜索取消
  searchContentCancel() {
    this.setData({
      searchValue: "",
      searchSongs: [],
      searchType: "normal"
    })
  },

  hotKeyClick(e) {
    const hotkey = e.currentTarget.dataset.item
    this.setData({
      searchValue: hotkey.first || hotkey.keyword,
      searchType: "best"
    })
    this.getRequestResult()
  },

  // 跳转到播放页
  toMusicPlay(e) {
    const music_id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/music-play/index?id=' + music_id,
    })
  },
  
  // 初始化
  getInit() {
    getSearchHot().then(res => {
      this.setData({ hotKeywords: res.result.hots })
    })
  },

  // 获取请求内容的结果
  getRequestResult() {
    const searchValue = this.data.searchValue
    if(this.data.searchType === "best") {
      getDebounceSearchResult(searchValue).then(res => {
        this.setData({
          searchSongs: res.result.songs
        })
      })
    } else {
      getSearchSuggest(searchValue).then(res => {
        this.setData({
          suggestSongs: res.result.allMatch
        })
        // rich-text
        const richKeyWords = this.data.suggestSongs.map(item => item.keyword)
        const nodes = []
        richKeyWords.forEach(item => {
          const tempNodes = stringToNodes(this.data.searchValue,item)
          nodes.push(tempNodes)
        })
        this.setData({
          richSearchSongs: nodes
        })
      })
    } 
  }
})