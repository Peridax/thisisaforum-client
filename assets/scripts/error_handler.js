const ui = require('./auth/ui')


// Going to redo all of this for V2. I will set the error handling to the server
// instead of relying on the client.

const notEmpty = (data) => {
  let passed = true

  if (data) {
    for (const i in data) {
      if (typeof data === 'object' && !Array.isArray(data)) {
        if (Object.keys(data).length === 1 && Object.keys(data[i])) {
          for (const j in data[i]) {
            if (!data[i][j]) {
              passed = false
            }
          }
        }
      } else if (Array.isArray(data)) {
        if (!data[i]) {
          passed = false
        }
      }
    }
  }

  return passed
}

const signUp = (error, credentials) => {
  console.log(credentials)
  if (error.status === 422) {
    const passInput = credentials.credentials.password
    const passInputConfirm = credentials.credentials.password_confirmation
    if (passInput.length && passInputConfirm.length) {
      if (passInput === passInputConfirm) {
        ui.alert('That email is already in use!', 'danger', false)
      } else {
        ui.alert('Both passwords have to match', 'danger', false)
      }
    } else {
      ui.alert('Password fields cannot be empty', 'danger', false)
    }
  } else {
    if (error.status === 0) {
      ui.alert('Error status: No connection to the API', 'danger', false)
    } else {
      ui.alert('Error status: ' + error.status, 'danger', false)
    }
  }
}

const signIn = (error, credentials) => {
  if (error.status === 401) {
    ui.alert('Email or password is incorrect', 'danger', false)
  } else {
    if (error.status === 0) {
      ui.alert('Error status: No connection to the API', 'danger', false)
    } else {
      ui.alert('Error status: ' + error.status, 'danger', false)
    }
  }
}

const changePassword = (error) => {
  if (error.status === 422) {
    ui.alert('The password you entered is incorrect', 'danger', true)
  } else {
    ui.alert('There was a problem changing your password', 'danger', true)
    console.log(error)
  }
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  notEmpty
}
