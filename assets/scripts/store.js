'use strict'

const store = {
  storeUser: (data) => {
    store.user = data.user
    return data
  },
  destroyUser: (data) => {
    store.user = null
    return data
  },
  storeSubforum: (data) => {
    store.subforum = data
    return data
  },
  destroySubforum: (data) => {
    store.subforum = null
    return data
  }
}

module.exports = store
