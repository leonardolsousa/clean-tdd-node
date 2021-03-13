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

// signup-router
class signUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new signUpUseCase().signUp(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// signup-usecase
class signUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new addAccountRepository().add(email, password)
    }
  }
}

// add-account-repo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class addAccountRepository {
  async add (email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
