'use strict'

const store = {
  storeUser: (data) => {
    store.user = data.user
    return data
  },
  destroyUser: (data) => {
    store.user = null
    return data
  }
}

module.exports = store
