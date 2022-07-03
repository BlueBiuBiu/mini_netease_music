// pages/music-play/index.js
import { getSongDetail, getSongLyric } from "../../service/api_player"
import { innerAudioContext } from "../../store/player-store"
import { parserLyric } from "../../utils/parser-lyric"

const playModeNames = ["order","repeat","random"]

Page({
  data: {
    music_id: null,
    currentPage: 0,
    contentHeight: 0,
    sliderValue: 0,
    currentTime: 0,
    currentSong: {},
    lyricInfos: [],
    currentLyricText: "",
    currentLyricIndex: 0,
    durationTime: 0,
    isDrag: false,
    scrollTop: 0,
    playModeIndex: 0,
    playModeName: 'order',
    isPlaying: false,
    playIcon: 'pause'
  },
  onLoad(options) {
    const music_id = Number(options.id)
    this.setData({
      music_id
    })
    this.getInit()
  },

  // 事件
  swiperChange(e) {
    this.setData({
      currentPage: e.detail.current
    })
  },

  getSwiperHeight() {
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navBarHeight
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight
    })
  },

  playAudio() {
    innerAudioContext.stop()
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.music_id}.mp3`
    innerAudioContext.title = '音乐播放'
    innerAudioContext.autoplay = true
    innerAudioContext.onCanplay(() => {
      innerAudioContext.play()
    })
    innerAudioContext.onTimeUpdate(() => {
      const currentTime = innerAudioContext.currentTime
      const durationTime = innerAudioContext.duration
      const sliderValue = currentTime * 100 / durationTime
      if(!this.data.isDrag) {
        this.setData({
          durationTime,
          currentTime,
          sliderValue
        })
      }
      const lyricInfos = this.data.lyricInfos
      for(let i = 0; i < lyricInfos.length; i++) {
        if(currentTime < lyricInfos[i].time) {
          const lyricInfo = i > 0 && lyricInfos[i-1].text
          const currentIndex = i-1
          if(this.data.currentLyricIndex !== currentIndex) {
            this.setData({
              currentLyricIndex: currentIndex,
              currentLyricText: lyricInfo,
              scrollTop: currentIndex * 35
            })
          }
          break
        }
      }
    })
    innerAudioContext.onPause(() => {
      this.setData({
        isPlaying: false,
        playIcon: 'resume'
      })
    })
    innerAudioContext.onPlay(() => {
      this.setData({
        isPlaying: true,
        playIcon: 'pause'
      })
    })
  },

  handleSliderChange(e) {
    const value = e.detail.value
    const currentTime = this.data.durationTime * value / 100
    innerAudioContext.seek(currentTime)
    this.setData({
      sliderValue: value,
      isDrag: false
    })
  },

  handleSliderChanging(e) {
    const value = e.detail.value
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      currentTime,
      isDrag: true
    })
  },

  handleModeClick() {
    let playModeIndex = this.data.playModeIndex
    playModeIndex++
    if(playModeIndex === 3) {
      this.setData({
        playModeIndex: 0,
        playModeName: 'order'
      })
      return
    }
    this.setData({
      playModeIndex,
      playModeName: playModeNames[playModeIndex]
    })
  },

  handlePlayClick() {
    const isPlaying = this.data.isPlaying
    if(isPlaying) {
      innerAudioContext.pause()
      this.setData({
        isPlaying: false,
        playIcon: 'resume'
      })
    } else {
      innerAudioContext.play()
      this.setData({
        isPlaying: true,
        playIcon: 'pause'
      })
    }
  },

  hanldeLeftClick() {
    wx.navigateBack()
  },

  getInit() {
    this.getSwiperHeight()
    this.getMusicData()
    this.playAudio()
  },

  // 数据请求
  getMusicData() {
    getSongDetail(this.data.music_id).then(res => {
      this.setData({
        currentSong: res.songs[0],
      })
      console.log(res);
    })

    getSongLyric(this.data.music_id).then(res => {
      const lyric = res.lrc.lyric
      const lyricInfos = parserLyric(lyric)
      this.setData({lyricInfos})
    })
  }

})