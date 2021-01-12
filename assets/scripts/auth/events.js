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
      .then(() => api.getSubforums(store.user.token))
      .then(ui.updateSubforums)
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

const onChangePassword = (event) => {
  event.preventDefault()

  $('#changePasswordModal').modal('hide')
  const formData = getFormFields(event.target)

  api.changePassword(formData, store.user.token)
    .then(ui.onChangePassword)
    .catch(errorHandler.changePassword)
    .then(() => { event.target.reset() })
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

const onCreateSubforum = (event) => {
  event.preventDefault()

  $('#createSubforumModal').modal('hide')
  const formData = getFormFields(event.target)

  api.createSubforum(formData, store.user.token)
    .then(ui.onCreateSubforum)
    .then(() => api.getSubforums(store.user.token))
    .then(ui.updateSubforums)
    .catch(console.error)
    .then(() => { event.target.reset() })
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,

  onCreateThread,
  onCreateReply,
  onCreateSubforum,
  onMyThreads
}
