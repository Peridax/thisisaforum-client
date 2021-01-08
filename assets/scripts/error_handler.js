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

module.exports = {
  notEmpty
}
