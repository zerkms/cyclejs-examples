(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
require("../../common/scripts/shims");
var Cycle = require("cyclejs");
var Model = require("./model");
var View = require("./view");
var Intent = require("./intent");

// APP =============================================================================================
var User = Cycle.createDOMUser("main");

User.inject(View).inject(Model).inject(Intent).inject(User);

},{"../../common/scripts/shims":6,"./intent":2,"./model":3,"./view":5,"cyclejs":"cyclejs"}],2:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

// EXPORTS =========================================================================================
var Intent = Cycle.createIntent(function (User) {
  return {
    changeValue$: User.event$(".item", "changeValue").map(function (event) {
      return event.data;
    }) };
});

module.exports = Intent;

},{"cyclejs":"cyclejs"}],3:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

// EXPORTS =========================================================================================
var Model = Cycle.createModel(function (Intent) {
  return {
    value$: Intent.get("changeValue$").startWith(Math.floor(Math.random() * 100) + 1) };
});

module.exports = Model;

},{"cyclejs":"cyclejs"}],4:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

// ELEMENTS ========================================================================================
Cycle.registerCustomElement("Slider", function (User, Props) {
  var Model = Cycle.createModel(function (Intent, Props) {
    return {
      value$: Props.get("value$").merge(Intent.get("changeValue$")).startWith(0) };
  });

  var View = Cycle.createView(function (Model) {
    var value$ = Model.get("value$");
    return {
      vtree$: value$.map(function (value) {
        return h("div", { className: "form-group" }, [h("label", null, ["Amount"]), h("div", { className: "input-group" }, [h("input", { type: "range", value: value, placeholder: "Amount" }), h("div", { className: "input-group-addon" }, [h("input", { type: "text", value: value, readonly: "1" })])])]);
      }) };
  });

  var Intent = Cycle.createIntent(function (User) {
    return {
      changeValue$: User.event$("[type=range]", "input").map(function (event) {
        return parseInt(event.target.value);
      }) };
  });

  User.inject(View).inject(Model).inject(Intent, Props)[0].inject(User);

  return {
    changeValue$: Intent.get("changeValue$")
  };
});

},{"cyclejs":"cyclejs"}],5:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

var Slider = require("./slider");

// EXPORTS =========================================================================================
var View = Cycle.createView(function (Model) {
  var value$ = Model.get("value$");
  return {
    vtree$: value$.map(function (value) {
      return h("div", { className: "everything" }, [h("div", null, [h("Slider", { value: value })])]);
    }) };
});

module.exports = View;

},{"./slider":4,"cyclejs":"cyclejs"}],6:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
require("babel/polyfill");

// SHIMS ===========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

Cycle.latest = function (DataNode, keys, resultSelector) {
  var observables = keys.map(function (key) {
    return DataNode.get(key);
  });
  var args = observables.concat([function selector() {
    for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
      list[_key] = arguments[_key];
    }

    var model = keys.reduce(function (model, key) {
      model[key.slice(0, -1)] = list[keys.indexOf(key)];
      return model;
    }, {});
    return resultSelector(model);
  }]);
  return Rx.Observable.combineLatest.apply(null, args);
};

console.spy = function spy() {
  var _console$log;

  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return (_console$log = console.log).bind.apply(_console$log, [console].concat(params));
};

},{"babel/polyfill":"babel/polyfill","cyclejs":"cyclejs"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC8zLjEtc2xpZGVyLWludHJvL3NjcmlwdHMvYXBwLmpzIiwiYnVpbGQvMy4xLXNsaWRlci1pbnRyby9zY3JpcHRzL2ludGVudC5qcyIsImJ1aWxkLzMuMS1zbGlkZXItaW50cm8vc2NyaXB0cy9tb2RlbC5qcyIsImJ1aWxkLzMuMS1zbGlkZXItaW50cm8vc2NyaXB0cy9zbGlkZXIuanMiLCJidWlsZC8zLjEtc2xpZGVyLWludHJvL3NjcmlwdHMvdmlldy5qcyIsImJ1aWxkL2NvbW1vbi9zY3JpcHRzL3NoaW1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0EsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDdEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7QUFHakMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0FDVDVELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQixFQUFFLEdBQUksS0FBSyxDQUFYLEVBQUU7OztBQUdQLElBQUksTUFBTSxH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UyxDQUFDLENBQUM7SUFDMUIsRUFBRSxHQUFJLEtBQUssQ0FBWCxFQUFFOztBQUVQLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtBQUN2RCxNQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztXQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFDO0FBQ3JELE1BQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FDNUIsU0FBUyxRQUFRLEdBQVU7c0NBQU4sSUFBSTtBQUFKLFVBQUk7OztBQUN2QixRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUN0QyxXQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEQsYUFBTyxLQUFLLENBQUM7S0FDZCxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1AsV0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDOUIsQ0FDRixDQUFDLENBQUM7QUFDSCxTQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDdEQsQ0FBQzs7QUFFRixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFZOzs7b0NBQVIsTUFBTTtBQUFOLFVBQU07OztBQUNsQyxTQUFPLGdCQUFBLE9BQU8sQ0FBQyxHQUFHLEVBQUMsSUFBSSxNQUFBLGdCQUFDLE9BQU8sU0FBSyxNQUFNLEVBQUMsQ0FBQztDQUM3QyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnJlcXVpcmUoXCIuLi8uLi9jb21tb24vc2NyaXB0cy9zaGltc1wiKTtcbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IE1vZGVsID0gcmVxdWlyZShcIi4vbW9kZWxcIik7XG5sZXQgVmlldyA9IHJlcXVpcmUoXCIuL3ZpZXdcIik7XG5sZXQgSW50ZW50ID0gcmVxdWlyZShcIi4vaW50ZW50XCIpO1xuXG4vLyBBUFAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgVXNlciA9IEN5Y2xlLmNyZWF0ZURPTVVzZXIoXCJtYWluXCIpO1xuXG5Vc2VyLmluamVjdChWaWV3KS5pbmplY3QoTW9kZWwpLmluamVjdChJbnRlbnQpLmluamVjdChVc2VyKTsiLCIvLyBJTVBPUlRTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgQ3ljbGUgPSByZXF1aXJlKFwiY3ljbGVqc1wiKTtcbmxldCB7Unh9ID0gQ3ljbGU7XG5cbi8vIEVYUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBJbnRlbnQgPSBDeWNsZS5jcmVhdGVJbnRlbnQoVXNlciA9PiB7XG4gIHJldHVybiB7XG4gICAgY2hhbmdlVmFsdWUkOiBVc2VyLmV2ZW50JChcIi5pdGVtXCIsIFwiY2hhbmdlVmFsdWVcIikubWFwKGV2ZW50ID0+IGV2ZW50LmRhdGEpLFxuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZW50OyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeH0gPSBDeWNsZTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IE1vZGVsID0gQ3ljbGUuY3JlYXRlTW9kZWwoSW50ZW50ID0+IHtcbiAgcmV0dXJuIHtcbiAgICB2YWx1ZSQ6IEludGVudC5nZXQoXCJjaGFuZ2VWYWx1ZSRcIikuc3RhcnRXaXRoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxKSxcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsOyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeCwgaH0gPSBDeWNsZTtcblxuLy8gRUxFTUVOVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQ3ljbGUucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiU2xpZGVyXCIsIChVc2VyLCBQcm9wcykgPT4ge1xuICBsZXQgTW9kZWwgPSBDeWNsZS5jcmVhdGVNb2RlbCgoSW50ZW50LCBQcm9wcykgPT4gKHtcbiAgICB2YWx1ZSQ6IFByb3BzLmdldChcInZhbHVlJFwiKVxuICAgICAgLm1lcmdlKEludGVudC5nZXQoXCJjaGFuZ2VWYWx1ZSRcIikpXG4gICAgICAuc3RhcnRXaXRoKDApLFxuICB9KSk7XG5cbiAgbGV0IFZpZXcgPSBDeWNsZS5jcmVhdGVWaWV3KE1vZGVsID0+IHtcbiAgICBsZXQgdmFsdWUkID0gTW9kZWwuZ2V0KFwidmFsdWUkXCIpO1xuICAgIHJldHVybiB7XG4gICAgICB2dHJlZSQ6IHZhbHVlJC5tYXAodmFsdWUgPT4gKFxuICAgICAgICBoKCdkaXYnLCB7Y2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIn0sIFtcbiAgICAgICAgICBoKCdsYWJlbCcsIG51bGwsIFtcIkFtb3VudFwiXSksXG4gICAgICAgICAgaCgnZGl2Jywge2NsYXNzTmFtZTogXCJpbnB1dC1ncm91cFwifSwgW1xuICAgICAgICAgICAgaCgnaW5wdXQnLCB7dHlwZTogXCJyYW5nZVwiLCB2YWx1ZTogdmFsdWUsIHBsYWNlaG9sZGVyOiBcIkFtb3VudFwifSksXG4gICAgICAgICAgICBoKCdkaXYnLCB7Y2xhc3NOYW1lOiBcImlucHV0LWdyb3VwLWFkZG9uXCJ9LCBbXG4gICAgICAgICAgICAgIGgoJ2lucHV0Jywge3R5cGU6IFwidGV4dFwiLCB2YWx1ZTogdmFsdWUsIHJlYWRvbmx5OiBcIjFcIn0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICApKSxcbiAgICB9O1xuICB9KTtcblxuICBsZXQgSW50ZW50ID0gQ3ljbGUuY3JlYXRlSW50ZW50KFVzZXIgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBjaGFuZ2VWYWx1ZSQ6IFVzZXIuZXZlbnQkKFwiW3R5cGU9cmFuZ2VdXCIsIFwiaW5wdXRcIilcbiAgICAgICAgLm1hcChldmVudCA9PiBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpKSxcbiAgICB9O1xuICB9KTtcblxuICBVc2VyLmluamVjdChWaWV3KS5pbmplY3QoTW9kZWwpLmluamVjdChJbnRlbnQsIFByb3BzKVswXS5pbmplY3QoVXNlcik7XG5cbiAgcmV0dXJuIHtcbiAgICBjaGFuZ2VWYWx1ZSQ6IEludGVudC5nZXQoXCJjaGFuZ2VWYWx1ZSRcIilcbiAgfTtcbn0pO1xuIiwiLy8gSU1QT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IEN5Y2xlID0gcmVxdWlyZShcImN5Y2xlanNcIik7XG5sZXQge1J4LCBofSA9IEN5Y2xlO1xubGV0IFNsaWRlciA9IHJlcXVpcmUoXCIuL3NsaWRlclwiKTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IFZpZXcgPSBDeWNsZS5jcmVhdGVWaWV3KE1vZGVsID0+IHtcbiAgbGV0IHZhbHVlJCA9IE1vZGVsLmdldChcInZhbHVlJFwiKTtcbiAgcmV0dXJuIHtcbiAgICB2dHJlZSQ6IHZhbHVlJC5tYXAodmFsdWUgPT4gKFxuICAgICAgaCgnZGl2Jywge2NsYXNzTmFtZTogXCJldmVyeXRoaW5nXCJ9LCBbXG4gICAgICAgIGgoJ2RpdicsIG51bGwsIFtcbiAgICAgICAgICBoKCdTbGlkZXInLCB7dmFsdWU6IHZhbHVlfSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgKSksXG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3OyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnJlcXVpcmUoXCJiYWJlbC9wb2x5ZmlsbFwiKTtcblxuLy8gU0hJTVMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IEN5Y2xlID0gcmVxdWlyZShcImN5Y2xlanNcIik7XG5sZXQge1J4fSA9IEN5Y2xlO1xuXG5DeWNsZS5sYXRlc3QgPSBmdW5jdGlvbiAoRGF0YU5vZGUsIGtleXMsIHJlc3VsdFNlbGVjdG9yKSB7XG4gIGxldCBvYnNlcnZhYmxlcyA9IGtleXMubWFwKGtleSA9PiBEYXRhTm9kZS5nZXQoa2V5KSk7XG4gIGxldCBhcmdzID0gb2JzZXJ2YWJsZXMuY29uY2F0KFtcbiAgICBmdW5jdGlvbiBzZWxlY3RvciguLi5saXN0KSB7XG4gICAgICBsZXQgbW9kZWwgPSBrZXlzLnJlZHVjZSgobW9kZWwsIGtleSkgPT4ge1xuICAgICAgICBtb2RlbFtrZXkuc2xpY2UoMCwgLTEpXSA9IGxpc3Rba2V5cy5pbmRleE9mKGtleSldO1xuICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IobW9kZWwpO1xuICAgIH1cbiAgXSk7XG4gIHJldHVybiBSeC5PYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QuYXBwbHkobnVsbCwgYXJncyk7XG59O1xuXG5jb25zb2xlLnNweSA9IGZ1bmN0aW9uIHNweSguLi5wYXJhbXMpIHtcbiAgcmV0dXJuIGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgLi4ucGFyYW1zKTtcbn07Il19
