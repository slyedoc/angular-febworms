
var files = {
  febworms: {
    js: 'components/febworms/febworms.min.js',
    jsSrc: [
      'app2/febworms/febworms.js',
      'app2/febworms/**/*.js',
      '!app2/febworms/**/*.test.js'
    ],
    css: 'components/febworms/febworms.min.css',
    cssSrc: [
      'app2/febworms/febworms.css',
      'components/febworms/edit/edit.css',
      'components/febworms/edit/canvas/canvas.css',
      'app2/febworms/**/*.css'
    ],
    test: [
      'components/febworms/**/*.test.js'
    ],
    other: [
      'components/febworms/**/*.png',
      'components/febworms/**/*.jpg'
    ],
    html2js: [
      'components/febworms/templates-febworms.js'
    ]
  },

  vendor: {
    js: [
      'vendor/angular/angular.min.js',
      'vendor/angular-resource/angular-resource.min.js',
      'vendor/angular-route/angular-route.min.js',
      'vendor/lodash/dist/lodash.compat.min.js'
    ],
    test: [
      'vendor/json3/lib/json3.js',
      'vendor/jquery/jquery.js',
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-route/angular-route.js',
      'vendor/lodash/dist/lodash.compat.js',
      'vendor/angular-mocks/angular-mocks.js'
    ],
    css: [
      'vendor/bootstrap-css/css/bootstrap.min.css',
      'vendor/bootstrap-css/css/bootstrap-responsive.min.css'
    ],
    other: [
      'vendor/json3/lib/json3.min.js',
      'vendor/jquery/jquery.min.js',
      'vendor/**/*.png',
      'vendor/**/*.jpg'
    ]
  },

  app: {
    js: 'app2/app2.min.js',
    jsSrc: [
      'app2/app2/app2.js',
      'app2/app2/**/*.js',
      '!app2/app2/**/*.test.js'
    ],
    css: 'app2/app2.min.css',
    cssSrc: [
      'app2/app2/app2.css',
      'app2/app2/**/*.css'
    ],
    test: [
      'app2/**/*.test.js'
    ],
    other: [
      'app2/**/*.png',
      'app2/**/*.jpg'
    ],
    html2js: [
      'app2/templates-app2.js'
    ]
  }
};

module.exports = files;
