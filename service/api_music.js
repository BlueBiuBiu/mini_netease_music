import skyRequest from './index'

export function getBanners() {
  return skyRequest.get("/banner", {
    type: 2
  })
}

export function getRankings(idx) {
  return skyRequest.get("/top/list", {
    idx
  })
}

// cat -> category 类别
export function getSongMenu(cat="全部", limit=6, offset=0) {
  return skyRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}

export function getSongMenuDetail(id) {
  return skyRequest.get("/playlist/detail/dynamic", {
    id
  })
}
