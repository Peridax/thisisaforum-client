const getFormFields = require('./../../../lib/get-form-fields')
const errorHandler = require('./../error_handler')
const store = require('./../store')
const api = require('./api')
const ui = require('./ui')

/*
====== User Events ======
*/

const onSignUp = (event) => {
  event.preventDefault()
  ui.toggleForm(event.target, false)

  const formData = getFormFields(event.target)

  if (errorHandler.notEmpty(formData)) {
    api.signUp(formData)
      .then(ui.onSignUp)
      .then(() => { event.target.reset() })
      .catch((error) => errorHandler.signUp(error, formData))
      .then(() => ui.toggleForm(event.target, true))
  }
}

const onSignIn = (event) => {
  event.preventDefault()
  ui.toggleForm(event.target, false)

  const formData = getFormFields(event.target)

  if (errorHandler.notEmpty(formData)) {
    api.signIn(formData)
      .then(store.storeUser)
      .then(ui.onSignIn)
      .then(() => { event.target.reset() })
      .catch((error) => errorHandler.signIn(error, formData))
      .then(() => ui.toggleForm(event.target, true))
  }
}

const onSignOut = (event) => {
  if (store.user.token) {
    api.signOut(store.user)
      .then(ui.onSignOut)
      .catch(console.error)
  }
}

/*
====== Forum Events ======
*/

const onCreateThread = () => {
  console.log('create thread')
}

const onCreateReply = () => {
  console.log('create reply')
}

const onMyThreads = () => {
  console.log('my threads')
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,

  onCreateThread,
  onCreateReply,
  onMyThreads
}
