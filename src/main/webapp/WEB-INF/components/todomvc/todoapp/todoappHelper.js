({
  updateCounts: function(component) {
    var todos = component.getValue("m.todos");
    var completedCount = 0;
    todos.each(function(t, i) {
      completedCount += t.unwrap().completed ? 1 : 0;
    });
    var remainingCount = todos.getLength() - completedCount;
    component.setValue("v.remainingCount", remainingCount);
    component.setValue("v.completedCount", completedCount);
    this.filter(component);
  },

  filter: function(component) {
    var location = component.getAttributes().getRawValue("location");
    var items = [];
    var fn = this.filters[location.replace("/", "")];
    var todos = component.getValue("m.todos");
    todos.each(function(t, i) {
      if (!fn || fn(t.unwrap())) {
        items.push(t.unwrap());
      }
    });
    var filtered = component.getAttributes().getRawValue("filtered");
    filtered.setValue(items);
  },

  filters: {
    active: function(todo) {
      return !todo.completed;
    },
    completed: function(todo) {
      return todo.completed;
    }
  },

  createTodo: function(component, todo) {
    todo.id = todo.id || "" + Date.now();
    var todos = component.getValue("m.todos");
    todos.push(todo);
    this.saveTodo(component, todo);
  },

  loadTodos: function(component) {
    var storage = window.localStorage;
    var todos = storage.getItem("todos");
    todos = todos ? JSON.parse(todos) : {};

    var items = component.getValue("m.todos");
    items.clear();
    for ( var i in todos) {
      items.push(todos[i]);
    }

    this.updateCounts(component);
  },

  saveTodo: function(component, todo) {
    var todos = component.getValue("m.todos");
    var storage = window.localStorage;
    storage.setItem("todos", JSON.stringify(todos.unwrap()));
    this.updateCounts(component);
  },

  updateTodo: function(component, todo) {
    var todos = component.getValue("m.todos");
    todos.each(function(t, i) {
      if (t.getValue("id").getValue() === todo.id) {
        t.getValue("value").setValue(todo.value);
        t.getValue("completed").setValue(todo.completed);
      }
    });
    this.saveTodo(component, todo);
  },

  deleteTodo: function(component, todo) {
    var todos = component.getValue("m.todos");
    var items = [];
    todos.each(function(t) {
      if (t.unwrap().id !== todo.id) {
        items.push(t.unwrap())
      }
    });
    todos.setValue(items);
    this.saveTodo(component, todo);
  }
});
