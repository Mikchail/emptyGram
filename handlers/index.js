// const bodyParser = require('./body-parser')
const errors = require('./errors')
const catchMongooseErrors = require('./catch-mongoose-errors')
// const passportInit = require('./passport-init')
// const static = require('./static')
module.exports = [
  
  errors,
  catchMongooseErrors,
  
];