switch (process.env.WEBPACK_ENV) {
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev');
}
