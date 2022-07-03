import skyRequest from "./index";

export function getSearchHot() {
  return skyRequest.get("/search/hot")
}

export function getSearchSuggest(keywords) {
  return skyRequest.get("/search/suggest", {
    keywords,
    type: "mobile"
  })
}

export function getSearchResult(keywords) {
  return skyRequest.get("/search", {
    keywords
  })
}
