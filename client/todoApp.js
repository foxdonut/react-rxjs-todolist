var React = require("react");
var ReactDOM = require("react-dom");
var Rx = require("rx");
var h = require("jsnox")(React);
var ajax = require("./ajax-rx-dom");
var model = require("./model");
var events = require("./events");
var todoList = require("./todoList");
var todoForm = require("./todoForm");

module.exports = function(element) {
  var events$ = events();
  var model$ = model(ajax, events$);

  var listView$ = model$.listModel$.map(function(model) {
    return todoList(model, events$);
  });

  var formView$ = model$.formModel$.map(function(model) {
    return todoForm(model, events$);
  });

  var view$ = Rx.Observable.combineLatest(listView$, formView$, function(listView, formView) {
    return h("div", formView, listView);
  });

  view$.subscribe(function(view) {
    ReactDOM.render(view, element);
  });
};
