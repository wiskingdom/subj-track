module.exports = ***REMOVED***
  root: true,
  env: ***REMOVED***
    node: true,
  ***REMOVED***,
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: ***REMOVED***
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
  ***REMOVED***,
  parserOptions: ***REMOVED***
    parser: 'babel-eslint',
  ***REMOVED***,
***REMOVED***;
