// to show subforums do show('subforum')
// update the nav button to do so
const store = require('./../store')
const api = require('./api')

const pages = ['unauthenticated', 'authenticated']
const sections = ['home', 'subforum', 'thread', 'create']
let globalTimeout

const toggleForm = (form, state) => {
  if (state === true) {
    $(form).find('button').removeClass('disabled')
  } else {
    $(form).find('button').addClass('disabled')
  }
}

const showPage = (page) => {
  for (const i in pages) {
    if (page === pages[i]) {
      $(`.${pages[i]}`).show()
    } else {
      $(`.${pages[i]}`).hide()
    }
  }
}

const showSection = (section) => {
  for (const i in sections) {
    if (section === sections[i]) {
      $(`.${sections[i]}`).show()
    } else {
      $(`.${sections[i]}`).hide()
    }
  }

  if (section !== 'home') {
    $('.home-link').removeClass('active')
  } else {
    $('.home-link').addClass('active')
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
    showPage('authenticated')
    showSection('home')
    navUpdate()
  } else {
    showPage('unauthenticated')
    showSection()
    navUpdate()

    // Destroying any subforum data
    store.destroySubforum()
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

  // Destroying any subforum data
  store.destroySubforum()

  if (subforums) {
    for (const i in subforums.subforums) {
      const sub = subforums.subforums[i]
      tempHtml += `
      <tr>
        <td><a href="#" class="open-subforum">${sub.title}</a></td>
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
    $('.open-subforum').off('click')
    $('.update-subforum').off('click')
    $('.delete-subforum').off('click')
  }

  if (!subforums.subforums.length) {
    tempHtml = `
    <tr><td class="text-center" colspan="10">No subforums available</td></tr>
    `
  }

  $('.forum tbody').html(tempHtml)

  // Since the elements are new, the event handlers have
  // to attach to the elements after they've been appended
  // to the dom

  // Event handler for clicking on a subforum title
  $('.open-subforum').on('click', function (event) {
    const subforum = $(event.target).text()

    api.getSubforum(subforum, store.user.token)
      .then(loadSubforum)
      .then(() => { showSection('subforum') })
      .catch(console.error)
  })

  // Event handler for cliking on update subforum
  $('.update-subforum').on('click', function () {
    $('#newSubforumTitle').val($(this).data('title'))
    $('#newSubforumId').val($(this).data('id'))
  })

  // Event handler for cliking on delete subforum
  $('.delete-subforum').on('click', function () {
    const id = $(this).data('id')

    api.deleteSubforum(id, store.user.token)
      .then(alert('Successfully deleted the subforum', 'success', true))
      .then(() => api.getSubforums(store.user.token))
      .then(updateSubforums)
      .catch(console.error)
  })
}

const loadSubforum = (data) => {
  const { title, threads } = data.subforum
  let tempHtml = ''

  // Checking if actions is valid or not
  if ($('.subforum thead tr th').length > 2) {
    $('.subforum thead tr th').last().remove()
  }

  // Storing the subforum data
  store.storeSubforum(data.subforum)

  // Loading subforum title in the breadcrumb
  $('.subforum-title').text(title)

  // Loading all threads
  if (threads.length) {
    for (const i in threads.reverse()) {
      const thread = threads[i]

      tempHtml += `
      <tr>
        <td>
          <a href="#"
            class="open-thread"
            data-id="${thread._id}"
          >${thread.title}</a>
          <br />
          <small class="m-0">By: ${thread.owner.email}</small>
        </td>`
      if (thread.owner.email !== store.user.email) {
        tempHtml += `
         <td class="text-center">${thread.replies.length}</td>
         <td></td>
        `
      } else {
        tempHtml += `
          <td class="text-center">${thread.replies.length}</td>
        `
      }

      if (thread.owner.email === store.user.email) {
        tempHtml += `
        <td>
          <a class="delete-thread text-primary"
              href="#"
              data-id="${thread._id}"
          >Delete</a>
        </td>
        `

        if ($('.subforum thead tr th').length === 2) {
          $('.subforum thead tr').append('<th class="text-center action-col">Actions</th>')
        }
      }

      tempHtml += `
      </tr>
      `
    }
  } else {
    tempHtml += `
    <tr>
      <td class="text-center" colspan="10">This subforum has no threads</td>
    </tr>
    `
  }

  $('.subforum tbody').html(tempHtml)

  if ($('.open-thread').length) {
    $('.open-thread').on('click', function (event) {
      const id = $(this).data('id')

      api.fetchThread(store.subforum._id, store.user.token, id)
        .then(loadThread)
        .then(() => showSection('thread'))
        .catch(console.error)
    })
  }

  if ($('.delete-thread').length) {
    $('.delete-thread').on('click', function (event) {
      const id = $(this).data('id')

      api.deleteThread(store.subforum._id, store.user.token, id)
        .then(loadSubforum)
        .catch(console.error)
    })
  }
}

const loadThread = (data) => {
  const thread = data.thread
  let tempHtml = ''

  $('.thread-title').text(thread.title)
  $('.thread-author').text(thread.owner.email)
  $('.subforum-title-next a').text(store.subforum.title)

  if (thread.replies) {
    console.log('full of replies')
  }

  tempHtml += `<tr><td colspan="10">${thread.body}</td></tr>`

  $('.thread tbody').html(tempHtml)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,

  toggleForm,
  navUpdate,
  alert,
  showSection,

  updateSubforums,
  onCreateSubforum,
  onUpdateSubforum,
  loadSubforum
}
