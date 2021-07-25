module.exports = {
  response: (response, status, msg, data, pagination) => {
    const result = {
      status: status || 200,
      msg,
      data,
      pagination
    }
    return response.status(result.status).json(result)
  }
}
