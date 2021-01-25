'use strict'

const events = require('./auth/events')

$(() => {
  // Setting up a list of elements and their corresponding
  // event to trigger their callback function
  // el = element | on = event | cb = callback
  const eventList = [
    // User forms & buttons
    { el: '#sign-up', on: 'submit', cb: events.onSignUp },
    { el: '#sign-in', on: 'submit', cb: events.onSignIn },
    { el: '#logout-link', on: 'click', cb: events.onSignOut },
    { el: '#change-password', on: 'submit', cb: events.onChangePassword },

    // Forum & thread buttons
    { el: '.create-thread', on: 'click', cb: events.onCreateThread },
    { el: '.create-reply', on: 'click', cb: events.onCreateReply },
    { el: '#create-subforum', on: 'submit', cb: events.onCreateSubforum },
    { el: '.my-threads', on: 'click', cb: events.onMyThreads },

    // Update subforum
    { el: '#update-subforum', on: 'submit', cb: events.onUpdateSubforum }
  ]

  for (const i in eventList) {
    $(eventList[i].el).on(eventList[i].on, eventList[i].cb)
  }
})
