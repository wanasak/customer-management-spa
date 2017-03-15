import { CustomerManagementPage } from './app.po';

describe('customer-management App', () => {
  let page: CustomerManagementPage;

  beforeEach(() => {
    page = new CustomerManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
