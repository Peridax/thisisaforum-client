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

const createSubforum = (data, token) => {
  return $.ajax({
    url: config.apiUrl + '/subforum',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: data
  })
}

const getSubforums = (token) => {
  return $.ajax({
    url: config.apiUrl + '/subforum',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

const updateSubforum = (subforum, token) => {
  return $.ajax({
    url: config.apiUrl + '/subforum/' + subforum.subforum.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      subforum: {
        title: subforum.subforum.title
      }
    }
  })
}

const deleteSubforum = (id, token) => {
  return $.ajax({
    url: config.apiUrl + '/subforum/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

const getSubforum = (subforum, token) => {
  return $.ajax({
    url: config.apiUrl + '/subforum/' + subforum,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

const createThread = (subforum, token, thread) => {
  return $.ajax({
    url: config.apiUrl + '/subforum/' + subforum,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      thread: thread
    }
  })
}

const fetchThread = (subforum, token, thread) => {
  return $.ajax({
    url: config.apiUrl + '/thread/' + thread,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      subforum: subforum
    }
  })
}

const deleteThread = (subforum, token, thread) => {
  return $.ajax({
    url: config.apiUrl + '/thread/' + thread,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      id: subforum
    }
  })
}

module.exports = {
  signUp,
  signOut,
  signIn,
  changePassword,

  createSubforum,
  getSubforums,
  updateSubforum,
  deleteSubforum,
  getSubforum,

  createThread,
  fetchThread,
  deleteThread
}
