module.exports = function () {
  return {
    port: process.env.PORT || 3000,
    npmModule: process.env.NPM_MODULE || 'lodash'
  }
}
