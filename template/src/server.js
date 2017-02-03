const config = require('../config/server.config.js')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
const compression = require('compression')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const html = (() => {
  const template = fs.readFileSync(resolve('./template.html'), 'utf-8')
  const i = template.indexOf('<!-- APP -->')
  const style = config.isProd ? '<link rel="stylesheet" href="/styles.css">' : ''
  return {
    head: template.slice(0, i).replace('<!-- STYLE -->', style),
    tail: template.slice(i + '<!-- APP -->'.length)
  }
})()
const app = express()
app.use(favicon(resolve('assets/logo.png')))
const createRenderer = (bundle) => {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')(config.cache)
  })
}
let renderer
if (config.isProd) {
  const bundlePath = resolve('../dist/server-bundle.js')
  renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  require('../build/dev-server')(app, bundle => {
    renderer = createRenderer(bundle)
  })
}
app.use(compression({ threshold: 0 }))
app.use('/', express.static(resolve('../static')))
app.use('/', express.static(resolve('../dist')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', require('./api.js'))
app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }
  var s = Date.now()
  const context = { url: req.url, ua: require('ua-parser-js')(req.headers['user-agent']) }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true
  renderStream.on('data', chunk => {
    if (firstChunk) {
      const {
        title,
        htmlAttrs,
        bodyAttrs,
        link,
        style,
        script,
        noscript,
        meta
      } = context.meta.inject()
      let head = html.head.replace('<html data-vue-meta-server-rendered', `<html data-vue-meta-server-rendered ${htmlAttrs.text()}`).trim()
      head = head.replace('<body ', `<body ${bodyAttrs.text()}`).trim()
      head = head.replace('<!-- HEAD -->', `
        ${meta.text()}
        ${title.text()}
        ${link.text()}
        ${style.text()}
        ${script.text()}
        ${noscript.text()}`).trim()
      res.write(head)
      if (context.initialState) {
        res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
      }
      firstChunk = false
    }
    res.write(chunk)
  })
  renderStream.on('end', () => {
    res.end(html.tail)
    console.log(`whole request: ${Date.now() - s}ms`)
  })
  renderStream.on('error', err => {
    res.status(500).end('Internal Error 500')
    console.error(`error during render : ${req.url}`)
    console.error(err)
  })
})
const port = process.env.PORT || config.port
module.exports = app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

