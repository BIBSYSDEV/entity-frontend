describe('When first opening the app', () => {
	it('and the user is not logged in, the user should be redirected to the login page', () => {
		cy.visit('/');
		cy.url().should('include', '/Login');
	});
});

describe('When logging in', () => {
	beforeEach(() => {
		cy.visit('/Login');
	});

	describe('Given that the user logs in with unexisting user credentials,', () => {
		it('the user should get a message that the user does not exist', () => {
			cy.get(`[id="userInput"]`).type('testbruker');
			cy.get(`[id="password"]`).type('1234321');
			cy.get(`[id="authButton"]`).click();
			cy.get(`[id="errorMessage"]`).should('contain', 'User does not exist.');
		});
	});

	describe('Given that the user logs in with wrong passord,', () => {
		it('the user should get a message that the user has wrong password', () => {
			cy.get(`[id="userInput"]`).type(Cypress.env('login_username'));
			cy.get(`[id="password"]`).type('1234321');
			cy.get(`[id="authButton"]`).click();
			cy.get(`[id="errorMessage"]`).should('contain', 'Incorrect username or password.');
		});
	});

	describe('Given that the user logges in with correct user credentials,', () => {
		it('the user should be redirected to the dashboard', () => {
			cy.get(`[id="userInput"]`).type(Cypress.env('login_username'));
			cy.get(`[id="password"]`).type(Cypress.env('login_password'));
			cy.get(`[id="authButton"]`).click();
			cy.url().should('be', '/');
		});
		after(() => {
			cy.get(`[id="logoutButton"]`).click();
		});
	});
});
