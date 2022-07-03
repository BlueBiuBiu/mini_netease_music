import skyRequest from './index'

export function getTopMV(offset, limit = 10) {
  return skyRequest.get("/top/mv", {
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @param {number} id MV的id
 */
export function getMVURL(id) {
  return skyRequest.get("/mv/url", {
    id
  })
}

/**
 * 请求MV的详情
 * @param {number} mvid MV的id
 */
export function getMVDetail(mvid) {
  return skyRequest.get("/mv/detail", {
    mvid
  })
}

export function getRelatedVideo(id) {
  return skyRequest.get("/related/allvideo", {
    id
  })
}
