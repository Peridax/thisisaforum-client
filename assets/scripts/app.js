'use strict'

const events = require('./auth/events')

$(() => {
  $('#sign-up').on('submit', events.onSignUp)
})
