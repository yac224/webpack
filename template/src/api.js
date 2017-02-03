const express = require('express')
const router = express.Router()
const request = require('superagent')
const config = require('../config/server.config.js')
router.get('/', function (req, res) {
  res.json({
    data: {
      message: `API Router`
    }
  })
})
router.use(function (req, res, next) {
  console.log(`${req.method} ${req.url} from ${req.hostname}`)
  next()
})
router.route('/test')
  .get(function (req, res) {
    res.json({
      data: {
        message: `Test GET`
      }
    })
  })
  .post(function (req, res) {
    res.json({
      data: {
        message: `Test POST`
      }
    })
  })
router.use(function (req, res) {
  console.log(`API not match`)
  res.json({
    error: {
      message: `API not match`
    }
  })
})
module.exports = router

