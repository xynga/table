import { AppPage } from './app.po';
import { by, element} from "protractor";

describe('testing App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should have original order before click event on First Name', () => {
    page.navigateTo();
    let inOrderList = element(by.css('.table-data')).all(by.tagName('td'));
    expect(inOrderList.get(0).getText()).toBe('Peter');
    // page.getFirstName().click();
  });
  it('Should alphabetically order First Names after first click event on First Name', () => {
    page.navigateTo();
    page.getFirstName().click();
    let inOrderList = element(by.css('.table-data')).all(by.tagName('td'));
    expect(inOrderList.get(4).getText()).toBe('Steven');
  });
  it('Should reverse alphabetically order First Names after second click event on First Name', () => {
    page.navigateTo();
    page.getFirstName().click();
    page.getFirstName().click();
    let inOrderList = element(by.css('.table-data')).all(by.tagName('td'));
    expect(inOrderList.get(0).getText()).toBe('Wade');
  });
  it('Should alphabetically order Email Addresses after first click event on Email Address', () => {
    page.navigateTo();
    page.getEmailAddress().click();
    let inOrderList = element(by.css('.table-data')).all(by.tagName('td'));
    expect(inOrderList.get(2).getText()).toBe('BreakThe4thWall@Gotcha.com');
  });
  it('Should reverse alphabetically order Email Addresses after first click event on Email Address', () => {
    page.navigateTo();
    page.getEmailAddress().click();
    page.getEmailAddress().click();
    let inOrderList = element(by.css('.table-data')).all(by.tagName('td'));
    expect(inOrderList.get(2).getText()).toBe('tstark@starkindustries.net');
  });
});
