/* jshint node: true */
/* jshint global describe */
describe('angularjs homepage', function () {

  describe('todo list', function() {
    var description;

    beforeEach(function() {
      browser.get('http://192.168.11.12/editor/index');

      description = element(by.xpath('//span[@editable-textarea="config.seriousGame.description"]'));
    });

    // it('should list todos', function() {z

    it('should add a todo', function() {
      description.click();
      browser.pause();
    //   addTodo.sendKeys('write a protractor test');
    //   addButton.click();

    //   expect(todoList.count()).toEqual(3);
    //   expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });
});
