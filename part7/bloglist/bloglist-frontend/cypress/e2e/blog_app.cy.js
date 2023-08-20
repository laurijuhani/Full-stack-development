
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('Succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.get('.successful')
        .should('contain', 'test blog by test author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('contain', 'test blog')
    })

    it('A blog can be liked', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.get('#test-blog').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.successful')
        .should('contain', 'Removed test blog by test author')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.wait(5000)

      cy.get('html').should('not.contain', 'test blog')
    })

    it('only the op can see the remove button ', function() {
      // creating blog with mluukkai
      cy.get('#new-blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.contains('logout').click()

      // creating new user to check that they can't remove
      const user = {
        name: 'Test User',
        username: 'testing',
        password: 'secret'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.visit('')

      cy.get('#username').type('testing')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('blogs are sorted that blog with most likes is first', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('second most likes')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.wait(100)

      cy.get('#new-blog').click()
      cy.get('#title').type('most likes')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.wait(100)

      cy.get('#new-blog').click()
      cy.get('#title').type('third most likes')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()

      cy.wait(100)

      cy.get('#second-most-likes').click()
      cy.get('#like').click()
      cy.wait(100)
      cy.get('#like').click()
      cy.wait(100)
      cy.contains('hide').click()

      cy.get('#most-likes').click()
      cy.get('#like').click()
      cy.wait(100)
      cy.get('#like').click()
      cy.wait(100)
      cy.get('#like').click()
      cy.wait(100)
      cy.get('#like').click()

      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', 'second most likes')
      cy.get('.blog').eq(2).should('contain', 'third most likes')
    })
  })

})

