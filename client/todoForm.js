var React = require("react");
var h = require("jsnox")(React);
var serialize = require("form-serialize");

module.exports = function(model, events$) {
  var getTodo = function(evt) {
    return serialize(evt.target.form, {hash: true});
  };

  var onChangeText = function(validationErrors) {
    return function(evt) {
      events$.inFormEdit$.onNext({todo: getTodo(evt), validationErrors: validationErrors});
    };
  };

  var onSave = function(evt) {
    evt.preventDefault();
    events$.saveTodo$.onNext(getTodo(evt));
  };

  var onCancel = function(evt) {
    evt.preventDefault();
    events$.cancelTodo$.onNext();
  };

  var todo = model.todo;
  var validationErrors = model.validationErrors || {};

  return h("form",
    h(`input:hidden[name=id][value=${todo.id}]`),
    h("div", "Priority:"),
    h("div", h(`input:text[name=priority][size=2][value=${todo.priority || ''}]`, {onChange: onChangeText(validationErrors)})),
    h("span.error", validationErrors.priority),
    h("div", "Description:"),
    h("div", h(`input:text[name=description][value=${todo.description || ''}]`, {onChange: onChangeText(validationErrors)})),
    h("span.error", validationErrors.description),
    h("div",
      h("button.btn.btn-primary.btn-xs.save", {onClick: onSave}, "Save"),
      h("button.btn.btn-default.btn-xs.cancel", {onClick: onCancel}, "Cancel"))
  );
};

