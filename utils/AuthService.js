import TidepoolClientFactory from 'tidepool-platform-client';

export default class AuthService {
  static async login(email, password, environment) {
    console.log(`LOGIN! ${email}, ${password}, ${environment}, ${this.haveToken}`);
    this.haveToken = true;
    console.log(`LOGGED IN: ${this.haveToken}`);
    return Promise.resolve(false);
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    console.log(`LOGGED IN: ${this.haveToken}`);
    return false;
  }
}
