const { I } = inject();

class LoginPage {
  locators = {
    usernameField: '#user-name',
    passwordField: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]',
  };

  credentials = {
    standardUser: { username: 'standard_user', password: 'secret_sauce' },
    problemUser: { username: 'problem_user', password: 'secret_sauce' },
    lockedOutUser: { username: 'locked_out_user', password: 'secret_sauce' },
  };

  login(username: string, password: string) {
    I.amOnPage('https://www.saucedemo.com');
    I.fillField(this.locators.usernameField, username);
    I.fillField(this.locators.passwordField, password);
    I.click(this.locators.loginButton);
  }

  loginAsStandardUser() {
    const user = this.credentials.standardUser;
    this.login(user.username, user.password);
  }

  loginAsProblemUser() {
    const user = this.credentials.problemUser;
    this.login(user.username, user.password);
  }

  loginAsLockedOutUser() {
    const user = this.credentials.lockedOutUser;
    this.login(user.username, user.password);
  }

  verifyLoginFailed() {
    I.seeElement(this.locators.errorMessage);
    I.see('Epic sadface: Sorry, this user has been locked out', this.locators.errorMessage);
  }
}

export = LoginPage;
