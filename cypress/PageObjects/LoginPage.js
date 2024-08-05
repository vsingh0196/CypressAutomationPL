class login
{

    txtuserEmail = '#user_email';
    txtpassword = '#user_password';
    txtSignin = 'input[name="commit"]';
    txtVerify = '#pricing-article-body > section > div > div.row > div:nth-child(1) > h2';
    txtnotVerify = 'li';

    setUseremail(useremail)
    {
        cy.get(this.txtuserEmail).type(useremail); 
    }

    setPassword(password)
    {
        cy.get(this.txtpassword).type(password); 
    }

    clickSignin()
    {
        cy.get(this.txtSignin).click();
    }

    verifyLogin()
    {
        cy.url().should('include', '/pricing');
        cy.get(this.txtVerify).should('have.text', 'Pricing Dashboard');
    }

    verifyInvalidLogin()
    {
        cy.url().should('include', '/signin');
        cy.get(this.txtnotVerify).should('have.text', 'Invalid email address or password.');
    }
}

export default login;