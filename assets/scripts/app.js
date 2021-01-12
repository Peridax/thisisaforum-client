'use strict'

const events = require('./auth/events')

$(() => {
  // Setting up a list of elements and their corresponding
  // event to trigger their callback function
  const eventList = [
    // User forms & buttons
    { id: '#sign-up', on: 'submit', cb: events.onSignUp },
    { id: '#sign-in', on: 'submit', cb: events.onSignIn },
    { id: '#logout-link', on: 'click', cb: events.onSignOut },

    // Forum & thread buttons
    { id: '.create-thread', on: 'click', cb: events.onCreateThread },
    { id: '.create-reply', on: 'click', cb: events.onCreateReply },
    { id: '.my-threads', on: 'click', cb: events.onMyThreads }
  ]

  for (const i in eventList) {
    $(eventList[i].id).on(eventList[i].on, eventList[i].cb)
  }
})
