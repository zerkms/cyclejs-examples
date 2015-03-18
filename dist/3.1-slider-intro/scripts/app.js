(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Model = require("./model");
var View = require("./view");
var Intent = require("./intent");

// APP =============================================================================================
var DOM = Cycle.createDOMUser("main");

DOM.inject(View).inject(Model).inject(Intent).inject(DOM);

},{"./intent":3,"./model":5,"./view":6,"cyclejs":"cyclejs"}],2:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

// ELEMENTS ========================================================================================
Cycle.registerCustomElement("Footer", function (User) {
  var View = Cycle.createView(function () {
    return {
      vtree$: Rx.Observable["return"](h("div", null, ["=== footer ==="]))
    };
  });

  User.inject(View);
});

},{"cyclejs":"cyclejs"}],3:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

// EXPORTS =========================================================================================
var Intent = Cycle.createIntent(function (DOM) {
  return {
    changeWidth$: DOM.event$(".item", "changeWidth").map(function (event) {
      return event.data;
    }) };
});

module.exports = Intent;

},{"cyclejs":"cyclejs"}],4:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

// ELEMENTS ========================================================================================
Cycle.registerCustomElement("item", function (DOM, Props) {
  var View = Cycle.createView(function (Model) {
    var width$ = Model.get("width$");
    return {
      vtree$: Rx.Observable.combineLatest(width$, function (width) {
        return h("div", { className: "item", style: { width: width + "px" } }, [h("div", null, [h("input", { className: "width-slider", type: "range", min: "200", max: "1000", value: width })])]);
      }) };
  });

  var Model = Cycle.createModel(function (Intent, Props) {
    return {
      width$: Props.get("width$") };
  });

  var Intent = Cycle.createIntent(function (DOM) {
    return {
      changeWidth$: DOM.event$(".width-slider", "input").map(function (event) {
        return parseInt(event.target.value);
      })
    };
  });

  DOM.inject(View).inject(Model).inject(Intent, Props)[0].inject(DOM);

  return {
    changeWidth$: Intent.get("changeWidth$") };
});

},{"cyclejs":"cyclejs"}],5:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;

// EXPORTS =========================================================================================
var Model = Cycle.createModel(function (Intent) {
  return {
    width$: Intent.get("changeWidth$").startWith(300) };
});

module.exports = Model;

},{"cyclejs":"cyclejs"}],6:[function(require,module,exports){
"use strict";

// IMPORTS =========================================================================================
var Cycle = require("cyclejs");
var Rx = Cycle.Rx;
var h = Cycle.h;

var Footer = require("./footer");
var Item = require("./item");

// EXPORTS =========================================================================================
var View = Cycle.createView(function (Model) {
  var width$ = Model.get("width$");
  return {
    vtree$: width$.map(function (width) {
      return h("div", { className: "everything" }, [h("div", null, [h("Item", { width: width })]), h("Footer")]);
    }) };
});

module.exports = View;

},{"./footer":2,"./item":4,"cyclejs":"cyclejs"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImJ1aWxkLzMuMS1zbGlkZXItaW50cm8vYXBwLmpzIiwiYnVpbGQvMy4xLXNsaWRlci1pbnRyby9mb290ZXIuanMiLCJidWlsZC8zLjEtc2xpZGVyLWludHJvL2ludGVudC5qcyIsImJ1aWxkLzMuMS1zbGlkZXItaW50cm8vaXRlbS5qcyIsImJ1aWxkLzMuMS1zbGlkZXItaW50cm8vbW9kZWwuanMiLCJidWlsZC8zLjEtc2xpZGVyLWludHJvL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNDQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQUdqQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV0QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUNSMUQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFCLEVBQUUsR0FBTyxLQUFLLENBQWQsRUFBRTtJQUFFLENBQUMsR0FBSSxLQUFLLENBQVYsQ0FBQzs7O0FBR1YsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxVQUFTLElBQUksRUFBRTtBQUNuRCxNQUFJLElBQUksR0FBRyxLQUFLLENB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Q0FBQyxDQUNGO0tBQ0gsQ0FBQyxFQUNILENBQUM7Q0FDSCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gSU1QT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IEN5Y2xlID0gcmVxdWlyZShcImN5Y2xlanNcIik7XG5sZXQgTW9kZWwgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmxldCBWaWV3ID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbmxldCBJbnRlbnQgPSByZXF1aXJlKFwiLi9pbnRlbnRcIik7XG5cbi8vIEFQUCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBET00gPSBDeWNsZS5jcmVhdGVET01Vc2VyKFwibWFpblwiKTtcblxuRE9NLmluamVjdChWaWV3KS5pbmplY3QoTW9kZWwpLmluamVjdChJbnRlbnQpLmluamVjdChET00pOyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeCwgaH0gPSBDeWNsZTtcblxuLy8gRUxFTUVOVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQ3ljbGUucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiRm9vdGVyXCIsIGZ1bmN0aW9uKFVzZXIpIHtcbiAgbGV0IFZpZXcgPSBDeWNsZS5jcmVhdGVWaWV3KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2dHJlZSQ6IFJ4Lk9ic2VydmFibGUucmV0dXJuKFxuICAgICAgICBoKCdkaXYnLCBudWxsLCBbXCI9PT0gZm9vdGVyID09PVwiXSlcbiAgICAgIClcbiAgICB9O1xuICB9KTtcblxuICBVc2VyLmluamVjdChWaWV3KTtcbn0pOyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeH0gPSBDeWNsZTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IEludGVudCA9IEN5Y2xlLmNyZWF0ZUludGVudChET00gPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5nZVdpZHRoJDogRE9NLmV2ZW50JChcIi5pdGVtXCIsIFwiY2hhbmdlV2lkdGhcIikubWFwKGV2ZW50ID0+IGV2ZW50LmRhdGEpLFxuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZW50OyIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeCwgaH0gPSBDeWNsZTtcblxuLy8gRUxFTUVOVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQ3ljbGUucmVnaXN0ZXJDdXN0b21FbGVtZW50KFwiaXRlbVwiLCAoRE9NLCBQcm9wcykgPT4ge1xuICBsZXQgVmlldyA9IEN5Y2xlLmNyZWF0ZVZpZXcoTW9kZWwgPT4ge1xuICAgIGxldCB3aWR0aCQgPSBNb2RlbC5nZXQoXCJ3aWR0aCRcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZ0cmVlJDogUnguT2JzZXJ2YWJsZS5jb21iaW5lTGF0ZXN0KHdpZHRoJCwgKHdpZHRoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGgoJ2RpdicsIHtjbGFzc05hbWU6IFwiaXRlbVwiLCBzdHlsZToge3dpZHRoOiB3aWR0aCArIFwicHhcIn19LCBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBoKCdpbnB1dCcsIHtjbGFzc05hbWU6IFwid2lkdGgtc2xpZGVyXCIsIHR5cGU6IFwicmFuZ2VcIiwgbWluOiBcIjIwMFwiLCBtYXg6IFwiMTAwMFwiLCB2YWx1ZTogd2lkdGh9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICApLFxuICAgIH07XG4gIH0pO1xuXG4gIGxldCBNb2RlbCA9IEN5Y2xlLmNyZWF0ZU1vZGVsKChJbnRlbnQsIFByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoJDogUHJvcHMuZ2V0KFwid2lkdGgkXCIpLFxuICAgIH07XG4gIH0pO1xuXG4gIGxldCBJbnRlbnQgPSBDeWNsZS5jcmVhdGVJbnRlbnQoRE9NID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhbmdlV2lkdGgkOiBET00uZXZlbnQkKFwiLndpZHRoLXNsaWRlclwiLCBcImlucHV0XCIpLm1hcChldmVudCA9PiBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpKVxuICAgIH07XG4gIH0pO1xuXG4gIERPTS5pbmplY3QoVmlldykuaW5qZWN0KE1vZGVsKS5pbmplY3QoSW50ZW50LCBQcm9wcylbMF0uaW5qZWN0KERPTSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjaGFuZ2VXaWR0aCQ6IEludGVudC5nZXQoXCJjaGFuZ2VXaWR0aCRcIiksXG4gIH07XG59KTtcbiIsIi8vIElNUE9SVFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBDeWNsZSA9IHJlcXVpcmUoXCJjeWNsZWpzXCIpO1xubGV0IHtSeH0gPSBDeWNsZTtcblxuLy8gRVhQT1JUUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IE1vZGVsID0gQ3ljbGUuY3JlYXRlTW9kZWwoSW50ZW50ID0+IHtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aCQ6IEludGVudC5nZXQoXCJjaGFuZ2VXaWR0aCRcIikuc3RhcnRXaXRoKDMwMCksXG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbDsiLCIvLyBJTVBPUlRTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgQ3ljbGUgPSByZXF1aXJlKFwiY3ljbGVqc1wiKTtcbmxldCB7UngsIGh9ID0gQ3ljbGU7XG5sZXQgRm9vdGVyID0gcmVxdWlyZShcIi4vZm9vdGVyXCIpO1xubGV0IEl0ZW0gPSByZXF1aXJlKFwiLi9pdGVtXCIpO1xuXG4vLyBFWFBPUlRTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgVmlldyA9IEN5Y2xlLmNyZWF0ZVZpZXcoTW9kZWwgPT4ge1xuICBsZXQgd2lkdGgkID0gTW9kZWwuZ2V0KFwid2lkdGgkXCIpO1xuICByZXR1cm4ge1xuICAgIHZ0cmVlJDogd2lkdGgkLm1hcCh3aWR0aCA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBoKCdkaXYnLCB7Y2xhc3NOYW1lOiBcImV2ZXJ5dGhpbmdcIn0sIFtcbiAgICAgICAgICBoKCdkaXYnLCBudWxsLCBbXG4gICAgICAgICAgICBoKFwiSXRlbVwiLCB7d2lkdGg6IHdpZHRofSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBoKFwiRm9vdGVyXCIpXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgIH0pLFxuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlldzsiXX0=