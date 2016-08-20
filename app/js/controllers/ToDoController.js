toDoApp.controller('ToDoController', ['ToDoFactory', 'ToDoService', function(ToDoFactory, ToDoService){

  var self = this

  ToDoService.getAll().then(function(todos) {
    self.todos = todos
  })

  self.addToDo = function(toDoText) {
    self.todos.push(new ToDoFactory(toDoText))
  }

  self.removeToDo = function() {
    self.todos.pop()
  }

}])
