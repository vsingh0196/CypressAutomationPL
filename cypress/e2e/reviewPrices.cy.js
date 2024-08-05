describe('Review Prices', () => {
    it.skip('test filter', () => {
      cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
      cy.url().should('include', '/pricing');
      cy.get('#open-listing-filter-modal > span:nth-child(2)').click();
      cy.get('#listing_filter_row_container > div > div > div > button').click();
      cy.get('#pd-listing-filter-cities').click();
      cy.get('#listing_filter_row_container > div.row.align-items-center.listing_filter_row.py-2 > div.col.flex-grow-1.p-0.input-group > div > button').click();
      cy.get('#listing_filter_modal > div.bs-container.dropdown.bootstrap-select.show-tick.cust-filter-dropdown.show > div > div.bs-searchbox > input')
      .click().type('Dunes City{enter}');
      cy.get('#listing_filter_row_container > div.row.align-items-center.listing_filter_row.py-2 > div.col.flex-grow-1.p-0.input-group > div > button').click();
      cy.get('#apply-filter').click();
      cy.url().should('eq', 'https://pricelabs.co/pricing?filtered_view=1&cities=Dunes+City');

      cy.wait(6000);

      cy.get('#tr-VRMREALTY___102 > .review_prices > #review-prices').click();
      cy.get(':nth-child(1) > .align-items-center > :nth-child(1) > h3').should('contain','Configure Prices');
      cy.get('#min-rent').click().clear().type('10');
      cy.get('#base-price').click().clear().type('30');
      cy.get('#max-rent').click().clear().type('100');
      cy.get('#save-user-parameters').click();
      cy.get('[qa-id="date-pricing"]').should('contain','25');
      //cy.window().scrollTo('top');
      //cy.get('#overlay-cross-btn-div').scrollIntoView().click();
      //cy.get('#review-prices-overlay.[qa-id="rp-modal-close"]').click();
      //cy.get('.top-container>button[qa-id="rp-modal-close"]').click();

      cy.get('#overlay-back-btn-div > img').click();

      cy.wait(6000);

      cy.get(':nth-child(1) > .align-items-center > :nth-child(1) > h3').should('not.be.visible');
      //cy.get('#review-prices').click();
      cy.get('#tr-VRMREALTY___102 > .review_prices > #review-prices').click();
      cy.get('#base-price').click().should('have.value', '30').clear();
      cy.get('#min-rent').click().should('have.value', '10').clear();
      cy.get('#max-rent').click().should('have.value', '100').clear();
      //cy.get('#save-user-parameters').click();
    })
    
    it('should help me choose review prices',() => {

        cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
        cy.url().should('include', '/pricing');

        cy.get('#tr-VRMREALTY___102 > .review_prices > #review-prices').click();
        cy.get('#basePriceEstimator').click();
        cy.get('#base-price-estimator-modal > .modal-dialog > .modal-content > .modal-header > .m-0').should('have.text','Let\'s set up your base price!');

        cy.wait(6000);

        cy.get('iframe').then(($iframes) => {
            cy.log('Number of iframes found:', $iframes.length);
            // Optionally, log the src or other attributes to debug
            $iframes.each((index, iframe) => {
              cy.log(`Iframe ${index} src: ${iframe.src}`);
            });
        });
        const testIframe = cy.frameLoaded('#base-price-estimator-iframe');
        console.log(testIframe);
        cy.log(testIframe);
    }
    )
  })