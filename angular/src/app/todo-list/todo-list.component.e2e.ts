describe('TodoListComponent', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have an h1 tag', () => {
    browser.driver.wait(() => {
      return browser.isElementPresent(by.css('h1'));
    }, 10000)
    .then(() => {
      let subject = element(by.css('h1')).getText();
      let result  = 'This is the TODO Component';
      expect(subject).toEqual(result);
    },
    (error) => {
      console.log('error:', error);
    });
  });

});
