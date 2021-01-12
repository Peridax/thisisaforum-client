const config = require('./../config')

const signUp = (credentials) => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: credentials
  })
}

const signIn = (credentials) => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: credentials
  })
}

const signOut = (credentials) => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + credentials.token
    }
  })
}

const changePassword = (password, token) => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: password
  })
}

module.exports = {
  signUp,
  signOut,
  signIn,
  changePassword
}
