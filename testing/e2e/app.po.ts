import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  getFirstName() {
    return element(by.cssContainingText('td', 'First Name'));
  }
  getEmailAddress() {
    return element(by.cssContainingText('td', 'Email Address'));
  }

}
