module.exports = {
  pageInfo: (page, totalPage, limit, totalData) => {
    const pageInfo = {}
    pageInfo.page = page
    pageInfo.totalPage = totalPage
    pageInfo.limit = limit
    pageInfo.totalData = totalData

    return pageInfo
  }
}
