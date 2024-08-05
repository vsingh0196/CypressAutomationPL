import Login from "../PageObjects/LoginPage.js";

describe('Login to PriceLabs', () => {

    //let loginCreds;
    //Before each test, load the fixture data to get credentials
    //beforeEach(() => {
    //  cy.fixture('loginCreds').then((creds) => {
    //    loginCreds = creds;
    //  });
    //});

    //using POM verify successful login and use data from fixture
    it('Valid Login test', () => {
        cy.visit('/signin')

        cy.request({
            method: 'GET',
            url: '/signin', 
          }).then((response) => {
            expect(response.status).to.eq(200); // Expect HTTP 200 OK status
          });

          // fixture to load data for credentials
        cy.fixture('loginCreds').then((data) => {

            const ln = new Login();
            ln.setUseremail(data.useremail);
            ln.setPassword(data.password);
            ln.clickSignin();
            ln.verifyLogin();

        })
    
        //request to validate correct login
        cy.request({
            method: 'GET',
            url: '/pricing', 
          }).then((response) => {
            expect(response.status).to.eq(200);// Expect HTTP 200 Created status
        });

        //verifu user is able to logout successfully
        cy.get('.profile-name')
        .should('contain','QH')
        .click()
        .should('be.visible');

        cy.get('a > .dropdown-item')
        //.find('qa-id="logout-option"')
        .contains(' Sign Out ')
        .click();

        //cy.url().should('include', 'https://hello.pricelabs.co/');

        //cy.request({
        //    method: 'GET',
        //    url: 'https://hello.pricelabs.co/', 
        //  }).then((response) => {
        //    expect(response.status).to.eq(200);// Expect HTTP 200 Created status
        //});
    })


    //using POM verify unsuccessful login and use data from fixture
    it('Invalid Login test', () => {
        cy.visit('/signin')

        cy.request({
            method: 'GET',
            url: '/signin', 
          }).then((response) => {
            expect(response.status).to.eq(200); // Expect HTTP 200 OK status
          });

        cy.fixture('InvalidloginCreds').then((data) => {

            const ln = new Login();
            ln.setUseremail(data.useremail);
            ln.setPassword(data.password);
            ln.clickSignin();
            ln.verifyInvalidLogin();
    
        })

        //check for invalid login
        cy.wait(1000)
        cy.url().should('not.include', '/pricing');
    })

})