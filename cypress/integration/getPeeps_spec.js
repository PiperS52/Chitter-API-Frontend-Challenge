describe('Shows peeps', function() {
  it('displays all the peeps on the page', function(){
    cy.visit('http://127.0.0.1:8080/')

    cy.contains('Show Peeps').click()
    // cy.get('#showPeeps').click()

    cy.contains('posted at')
    // cy.get('#toDisplay')
    // .should('have.value', 'posted at')

  })
})
