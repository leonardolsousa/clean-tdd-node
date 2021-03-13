describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new loginRouter() // System Under Test(sut) refere-se a um nome de variável padrão para teste unitário
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
