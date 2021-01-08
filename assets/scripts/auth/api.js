const config = require('./../config')

const signUp = (credentials) => {
  return $.ajax({
    url: config.apiUrl,
    method: 'GET'
  })
}

module.exports = {
  signUp
}
