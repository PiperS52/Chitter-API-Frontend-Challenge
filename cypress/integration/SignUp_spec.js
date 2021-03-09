describe('Sign up', function(){
  it('signs up a new user', function(){
    cy.visit('http://127.0.0.1:8080/')

    cy.contains('Sign up below')

    cy.get('#username').type('test_name')
    cy.get('#password').type('test_password')

    cy.get('#signUpButton').click()

    cy.contains('Thank you - You have now signed up')
  })
})
