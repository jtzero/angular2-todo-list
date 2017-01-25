/**
 * @author: @AngularClass
 */

var opts = {};
if (process.env.NO_COMPILE) {
  opts = {
    disableWarnings: true
  };
}

require('ts-node').register(opts);

var helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://0.0.0.0:' + (process.env.PORT || '8080'),

  // use `npm run e2e`
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts'),
    // so it doesn't error if there are no e2e files
    // not ever lib will need e2e tests
    helpers.root('config/empty.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter('reports/e2e/', true, true));
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true
};
