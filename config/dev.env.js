'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://10.126.2.110"'
  BASE_API: '""'
  // BASE_API: '"http://localhost:9001"',
})
