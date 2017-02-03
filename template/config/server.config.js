const isProd = process.env.NODE_ENV === 'production'
const cache = {
  max: 1000,
  maxAge: 1000 * 60 * 10
}
const port = isProd ? 3000 : process.env.NODE_ENV === 'testing' ? 8989 : 8080
module.exports = {
  isProd,
  cache,
  port
}

