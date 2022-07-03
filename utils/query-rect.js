export function queryRect(el) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(el).boundingClientRect()
    query.exec(res => {
      resolve(res)
    })
  })
}