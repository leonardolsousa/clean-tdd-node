const express = require('express')
const router = express.Router()

module.exports = () => {
  const router = new signUpRouter()
  router.post('/signup', expressRouterAdapter.adapt(router))
}

class expressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
