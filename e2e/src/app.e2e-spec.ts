import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
const cars = require('../../src/server/MOCK_DATA.json');

describe('FleetMan App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('FleetMan Inventory');
  });

  it('should display vehicle information inside the table', () => {
    page.navigateTo();
    const firstCar = cars[0];
    expect(page.getNthCarText(1)).toEqual(
      `'${firstCar.year % 100}\n${firstCar.make}\n${firstCar.model}\n${
        firstCar.color
      }`
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      })
    );
  });
});
