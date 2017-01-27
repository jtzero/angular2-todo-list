describe('TodoListComponent', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have an .add-button', () => {
    expect(element(by.css('.add-button')).isPresent()).toBe(true);
  });

  it('should add a task-card when clicked', () => {
    let btn = element(by.css('.plus'));
    btn.click();
    expect(element(by.tagName('task-card')).isPresent()).toBe(true);
  });

});
