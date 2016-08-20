var mock = require('protractor-http-mock');

beforeEach(function(){
  mock([{
    request: {
      path: 'http://quiet-beach-24792.herokuapp.com/todos.json',
      method: 'GET'
    },
    response: {
      data: [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}]
    }
  }]);
});

describe("app", function() {
  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("Angular");
  });
});

describe('Todos tracker', function() {
  it('has several ToDos', function() {
    browser.get('/');
    var todos = $$('#todos p');
    expect(todos.first().getText()).toMatch('ToDo1: completed');
    expect(todos.last().getText()).toMatch('ToDo2: not completed');
  });

  it("can add ToDos", function() {
    browser.get('/')
    $("#new-todo-name").sendKeys("NewToDo")
    $("#add-todo").click()

    var todo = $$("#todos p").last().getText()
    expect(todo).toMatch("NewToDo: not completed")
  })

  it("can remove ToDos", function() {
    browser.get("/")
    var todos = $$("#todos p")
    $("#remove-todo").click()
    expect(todos.count()).toEqual(1)
  })

  it("can mark a ToDo as complete", function() {
    browser.get("/")
    var todo = $$("#todos p").last();
    todo.element(by.css(".complete")).click()
    expect(todo.getText()).toMatch("ToDo2: complete")
  })
});

afterEach(function(){
  mock.teardown();
});
