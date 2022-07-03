// base_ui/nav-bar/index.js
Component({
  options: {
    multipleSlots: true
  },

  properties: {
    centerDefault: {
      type: String,
      value: '默认标题'
    }
  },

  data: {
    statusBarHeight: 0
  },

  lifetimes: {
    ready() {
      const statusBarHeight = getApp().globalData.statusBarHeight
      this.setData({
        statusBarHeight
      })
    }
  },

  methods: {
    handleLeftClick() {
      this.triggerEvent("leftClick")
    }
  }
})
