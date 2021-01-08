const getFormFields = require('./../../../lib/get-form-fields')
const errorHandler = require('./../error_handler')
const api = require('./api')

const onSignUp = (event) => {
  event.preventDefault()

  const formData = getFormFields(event.target)

  if (errorHandler.notEmpty(formData)) {
    api.signUp(formData)
  }
}

module.exports = {
  onSignUp
}
