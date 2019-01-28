import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root .toolbar-title')).getText();
  }

  getNthCarText(n) {
    return element(by.css(`mat-row:nth-of-type(${n})`)).getText();
  }
}
