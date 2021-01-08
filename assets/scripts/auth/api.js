const config = require('./../config')

const signUp = (credentials) => {
  return $.ajax({
    url: config.url,
    method: 'GET'
  })
}

module.exports = {
  signUp
}
