({
  doInit: function(component, evt, helper) {
    var location = $A.historyService.get().token;
    location = location === "" ? "/" : location;
    $A.historyService.set(location);
    helper.loadTodos(component);
  },

  handleLocationChangeEvent: function(component, evt, helper) {
    var attributes = component.getAttributes();
    var location = evt.getParam("token");
    attributes.setValue("location", location);
    helper.filter(component);
  },

  toggleAll: function(component, evt, helper) {
    var checked = evt.getSource().getElement().checked;
    var todos = component.getValue("m.todos");
    todos.each(function(t, i) {
      t.getValue("completed").setValue(checked);
      helper.saveTodo(component, t);
    });
    helper.updateCounts(component);
  },

  clearCompletedTodos: function(component, evt, helper) {
    var todos = component.getValue("m.todos");
    todos.each(function(t, i) {
      if (t.getValue("completed").getValue()) {
        helper.deleteTodo(component, {
          id: t.getValue("id").getValue()
        });
      }
    });
  },

  newTodo: function(component, evt, helper) {
    helper.createTodo(component, {
      id: null,
      value: evt.target.value,
      completed: false
    });
    evt.target.value = "";
    var todos = component.getValue("m.todos");
  },

  handleupdateTodoEvent: function(component, event, helper) {
    helper.updateTodo(component, event.getParams());
  },

  handledeleteTodoEvent: function(component, event, helper) {
    helper.deleteTodo(component, event.getParams());
  }
});
