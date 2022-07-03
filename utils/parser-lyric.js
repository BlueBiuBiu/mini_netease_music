export function parserLyric(value) {
  const regExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const tempArr = value.split("\n")
  const lyricInfos = []
  for(const item of tempArr) {
    const res = regExp.exec(item)
    if(!res) continue
    const minute = res[1] * 60 * 1000
    const second = res[2] * 1000
    const millSecond = res[3].length === 2 ? res[3].length * 10 : res[3].length * 1
    const totalMill = minute + second + millSecond
    const text = item.replace(regExp,"")
    lyricInfos.push({time: totalMill / 1000, text})
  }
  return lyricInfos
}