const store = require('./../store')

const pages = ['unauthenticated', 'authenticated', 'settings']
const section = ['forum', 'subforum', 'thread', 'create']
let globalTimeout

const toggleForm = (form, state) => {
  if (state === true) {
    $(form).find('button').removeClass('disabled')
  } else {
    $(form).find('button').addClass('disabled')
  }
}

const show = (page) => {
  for (const i in pages) {
    if (page === pages[i]) {
      $(`.${page}`).show()
    } else {
      $(`.${pages[i]}`).hide()
    }
  }
}

const navUpdate = (page) => {
  if (store.user) {
    if (page) {
      $('nav').find('.active').removeClass('active')
      $(`.${page}`).addClass('active')
    }

    if ($('.nav-link-authenticated').is(':hidden')) {
      $('.nav-link-authenticated').show()
    }
  } else {
    $('.nav-link-authenticated').hide()
  }
}

const authenticated = (auth) => {
  if (auth) {
    show('authenticated')
    navUpdate()
  } else {
    show('unauthenticated')
    navUpdate()
  }
}

const onSignUp = (data) => {
  alert('Successfully created your account!', 'success', false)
}

const onSignIn = () => {
  authenticated(true)
  alert('Successfully signed into <strong>' + store.user.email + '</strong>', 'success', true)
}

const onSignOut = () => {
  store.destroyUser()
  authenticated(false)
  alert('Successfully signed out', 'success', false)
}

const onChangePassword = () => {
  alert('Successfully changed your password', 'success', true)
}

const alert = (message, type = 'success', authenticated) => {
  if (globalTimeout) { clearTimeout(globalTimeout) }
  authenticated ? authenticated = 'authenticated' : authenticated = 'unauthenticated'
  $('.' + authenticated + ' .alert-container').html('<div class="alert alert-' + type + ' fade show" role="alert">' + message + '</div>')
  globalTimeout = setTimeout(() => { $('.alert').alert('close') }, 8000) // Make alerts go away after 8 seconds
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  toggleForm,
  navUpdate,
  alert
}
