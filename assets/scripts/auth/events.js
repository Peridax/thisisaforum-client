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

const onCreateThread = (event) => {
  event.preventDefault()

  $('#createThreadModal').modal('hide')
  const formData = getFormFields(event.target)

  api.createThread(store.subforum._id, store.user.token, formData.thread)
    .then(data => api.getSubforum(data.subforum.title, store.user.token))
    .then(ui.loadSubforum)
    .then(() => ui.showSection('subforum'))
    .catch(console.error)
    .then(() => { event.target.reset() })
}

const onCreateReply = () => {
  console.log('create reply')
}

const onMyThreads = () => {
  console.log('my threads')
}

// Subforums
const onCreateSubforum = (event) => {
  event.preventDefault()

  $('#createSubforumModal').modal('hide')
  const formData = getFormFields(event.target)

  api.createSubforum(formData, store.user.token)
    .then(ui.onCreateSubforum)
    .then(() => api.getSubforums(store.user.token))
    .then(ui.updateSubforums)
    .catch(errorHandler.subforums)
    .then(() => { event.target.reset() })
}

const onUpdateSubforum = (event) => {
  event.preventDefault()

  $('#updateSubforumModal').modal('hide')
  const formData = getFormFields(event.target)
  console.log(formData)

  api.updateSubforum(formData, store.user.token)
    .then(ui.onUpdateSubforum)
    .then(() => api.getSubforums(store.user.token))
    .then(ui.updateSubforums)
    .catch(errorHandler.subforums)
    .then(() => { event.target.reset() })
}

const onHomeClick = (event) => {
  api.getSubforums(store.user.token)
    .then(ui.updateSubforums)
    .then(() => { ui.showSection('home') })
    .catch(console.error)
}

const onSubforumClick = (event) => {
  api.getSubforum(store.subforum.title, store.user.token)
    .then(ui.loadSubforum)
    .then(() => { ui.showSection('subforum') })
    .catch(console.error)
}

/*
====== Nav Events ======
*/

const onClickNavLink = (event) => {
  const id = $(event.target).attr('id')

  switch (id) {
    case 'home-link':
      if (store.user) {
        onHomeClick()
      }

      break
    case 'logout-link':
      onSignOut(event)
      break
    default:
      console.log('No idea what link you pressed.')
      break
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,

  onCreateThread,
  onCreateReply,
  onCreateSubforum,
  onMyThreads,

  onHomeClick,
  onUpdateSubforum,
  onSubforumClick,

  onClickNavLink
}
