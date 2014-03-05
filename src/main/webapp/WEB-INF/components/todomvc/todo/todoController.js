({
  edit: function(component, evt, helper) {
    var attributes = component.getAttributes();
    attributes.setValue("mode", "edit");
    var editor = component.find("new-todo").getElement();
    editor.selectionStart = editor.selectionEnd = editor.value.length;

    // Wait and then set focus and move cursor to end
    setTimeout(function() {
      editor.focus();
    }, 10);
  },

  remove: function(component, evt, helper) {
    var todo = component.get("v.todo");
    var deleteTodoEvent = $A.get("e.todomvc:deleteTodo");
    deleteTodoEvent.setParams({
      "id": todo.id
    }).fire();
  },

  update: function(component, evt, helper) {
    var todo = component.get("v.todo");
    var updateTodoEvent = $A.get("e.todomvc:updateTodo");
    updateTodoEvent.setParams(todo).fire();
  },

  complete: function(component, evt, helper) {
    var target = evt.getSource ? evt.getSource().getElement() : evt.target;
    var todo = component.get("v.todo");
    todo.completed = target.checked;
    var updateTodoEvent = $A.get("e.todomvc:updateTodo");
    updateTodoEvent.setParams(todo).fire();
  }
});