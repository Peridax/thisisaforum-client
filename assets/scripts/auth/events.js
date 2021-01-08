const getFormFields = require('./../../../lib/get-form-fields')
const errorHandler = require('./../error_handler')
const api = require('./api')

const onSignUp = (event) => {
  event.preventDefault()

  const formData = getFormFields(event.target)

  if (errorHandler.notEmpty(formData)) {
    api.signUp(formData)
      .then(console.log)
      .catch(console.error)
  }
}

module.exports = {
  onSignUp
}
