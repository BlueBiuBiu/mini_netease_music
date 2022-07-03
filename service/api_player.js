import skyRequest from './index'

export function getSongDetail(ids) {
  return skyRequest.get("/song/detail", {
    ids
  })
}

export function getSongLyric(id) {
  return skyRequest.get("/lyric", {
    id
  })
}

