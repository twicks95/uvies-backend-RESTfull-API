module.exports = {
  pageInfo: (page, totalPage, limit, totalData, offset) => {
    const pageInfo = {}
    pageInfo.page = page
    pageInfo.totalPage = totalPage
    pageInfo.limit = limit
    pageInfo.totalData = totalData
    pageInfo.offset = offset
    return pageInfo
  }
}
