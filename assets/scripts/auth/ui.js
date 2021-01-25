const store = require('./../store')
const api = require('./api')

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
  $('.' + authenticated + ' .alert-container').html(`<div class="alert alert-${type} fade show" role="alert">${message}</div>`)
  globalTimeout = setTimeout(() => { $('.alert').alert('close') }, 8000) // Make alerts go away after 8 seconds
}

const onCreateSubforum = (data) => {
  alert('Successfully created <strong>' + data.subforum.title + '</strong> as a subforum!', 'success', true)
}

const onUpdateSubforum = (data) => {
  alert('Successfully updated <strong>' + data.subforum.title + '</strong> as a subforum!', 'success', true)
}

const updateSubforums = (subforums) => {
  let tempHtml = ''

  if (subforums) {
    for (const i in subforums.subforums) {
      const sub = subforums.subforums[i]
      tempHtml += `
      <tr>
        <td><a href="#">${sub.title}</a></td>
        <td class="text-center">${sub.threadsLength}</td>
        <td class="text-center">
          <a class="update-subforum text-primary"
              href="#"
              data-title="${sub.title}"
              data-id="${sub._id}"
              data-toggle="modal"
              data-target="#updateSubforumModal"
          >Update</a>
          <a class="delete-subforum text-primary"
              href="#"
              data-id="${sub._id}"
          >Delete</a>
        </td>
      </tr>
      `
    }
  }

  if ($('.update-subforum').length) {
    $('.update-subforum').off('click')
    $('.delete-subforum').off('click')
  }

  if (!subforums.subforums.length) {
    tempHtml = `
    <tr><td class="p-3 w-100 text-center">No subforums available</td></tr>
    `
  }

  $('.forum tbody').html(tempHtml)

  // Since the elements are new, the event handlers have
  // to attach to the elements after they've been appended
  // to the dom
  $('.update-subforum').on('click', function () {
    $('#newSubforumTitle').val($(this).data('title'))
    $('#newSubforumId').val($(this).data('id'))
  })

  $('.delete-subforum').on('click', function () {
    const id = $(this).data('id')

    api.deleteSubforum(id, store.user.token)
      .then(alert('Successfully deleted the subforum', 'success', true))
      .then(() => api.getSubforums(store.user.token))
      .then(updateSubforums)
      .catch(console.error)
  })
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,

  toggleForm,
  navUpdate,
  alert,

  updateSubforums,
  onCreateSubforum,
  onUpdateSubforum
}
