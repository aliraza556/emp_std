import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('ng-theme-dark App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
