describe('Multicalendar DSO', () => {

    beforeEach(()=>{
      cy.viewport(1200, 800)
      cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
    })

    it('should login and redirect to Multicalendar page', () => {

      cy.url().should('include', '/pricing');

      // locator to select the Multicalendar dashboard
      cy.get('.navbar-nav > :nth-child(1)').contains('Dynamic Pricing').click();
      cy.get(':nth-child(2) > .dropdown-item > .fw-semi-bold').click();

      //locator to select the date override by clicking on the value 900 for 1101B WM - Sunset Clipper W
      //cy.wait(6000);
      //cy.contains('.pricing-cell', '900').scrollIntoView().click({force:true})
      //cy.get('#mc-main').within(() =>{
      //  cy.get('table > tbody')
      //    .find('tr[data-index="3"]')
      //    .contains('td','.pricing-cell','9005')
      //    .scrollIntoView()
      //    .debug()
      //    .click({force:true});
      //})

      // locate and click on the check box for 1101B WM - Sunset Clipper W
      cy.get('#mc-main')
      .find('table')
      .find('tr')
      .eq(2)
      .find('td')
      .eq(0)
      .find('input.chakra-checkbox__input')
      .invoke('show').click();

      //check that there is option to apply overide at the bottom
      cy.get('.css-1qmzc0d > :nth-child(3)')
      //cy.get('[data-testid="TuneOutlinedIcon"]')
      .should('have.text','Apply Override')
      .click();


      //Add the date override on date override modal dialog
      cy.get('chakra-portal')
        .find('chakra-modal__content-container')
        .find('div role="dialog"')
        .find('chakra-modal__body')
        .find('.react-datepicker-wrapper > input .chakra-input')
        .click()
        .type('Aug 05, 2024')
        .find('#chakra-modal--body').eq(2).children().eq(1)
        .click()
        .type('Aug 05, 2024')
        .find('qa-id="dso-min-price"')
        .type('300')
        .find('button[qa-id="add-dso"]')
        .click();


      //API test to confirm custom price is added
      cy.request({
        method: 'POST',
        url: 'https://app.pricelabs.co/api/add_custom_pricing', 
      }).then((response) => {
        expect(response.status).to.eq(200);// Expect HTTP 200 Created status
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal('Your custom prices have been updated.');
      });

      //check that the overide value is added to calendar date
      cy.get('#mc-main')
        .find('table')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(0)
        .find('[qa-id="dso-band-text-SUNSETPROPS_OLSE___323"]')
        .should('contain', 'Min Price: 100 $')
        .click();


      // delete the added overide date
      cy.get('#chakra-modal-\:r2uv\: > footer > div > div.css-70qvj9 > div > button.chakra-button.css-1yo9ua0 > svg')
      .click();

      //check the overide date info is deleted.
      cy.get('#mc-main')
        .find('table')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(0)
        .find('[qa-id="dso-band-text-SUNSETPROPS_OLSE___323"]')
        .should('not.contain.text', 'Min Price: 100 $')
        .click();

      //API test to confirm custom price is deleted
      cy.request({
        method: 'POST',
        url: 'https://app.pricelabs.co/api/remove_custom_pricing', 
      }).then((response) => {
        expect(response.status).to.eq(200);// Expect HTTP 200 Created status
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal('At least one day of the week should be enabled for check-in.');
      });
      cy.go('back');
})
})