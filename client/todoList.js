var React = require("react");
var h = require("jsnox")(React);

module.exports = function(todos, events$) {
  var onEdit = function(todo) {
    return function(evt) {
      evt.preventDefault();
      events$.editTodo$.onNext(todo);
    }
  };

  var onDelete = function(todo) {
    return function(evt) {
      evt.preventDefault();
      events$.deleteTodo$.onNext(todo.id);
    }
  };

  var renderTodo = function(todo) {
    return h(`tr.todo_${todo.id}^`,
      h("td", todo.priority),
      h("td", todo.description),
      h("td",
        h("button.btn.btn-primary.btn-xs.edit", {onClick: onEdit(todo)}, "Edit"),
        h("button.btn.btn-danger.btn-xs.delete", {onClick: onDelete(todo)}, "Delete")
      )
    );
  };

  var th = label => h(`th.${label}^`, label);

  return h("div",
    h("div", "Todo List:"),
    h("table.table.ng-table",
      h("thead", h("tr", ["Priority", "Description", "Action"].map(th))),
      h("tbody", todos.map(renderTodo))
    )
  );
};
