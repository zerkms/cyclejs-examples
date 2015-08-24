import Cycle from "@cycle/core";
import CycleDOM, {h} from "@cycle/dom";
import HH from "hyperscript-helpers";

let {div, h3, hr, label, input} = HH(h);
let {Rx} = Cycle;
let {Observable} = Rx;

// APP =============================================================================================
function intent({DOM}) {
  return {
    firstName$: DOM.get("#first-name", "input").map(event => event.target.value),
    lastName$: DOM.get("#last-name", "input").map(event => event.target.value),
  };
}

function model(actions) {
  return {
    firstName$: actions.firstName$.startWith(""),
    lastName$: actions.lastName$.startWith(""),
  };
}

function view(state) {
  return {
    DOM: Observable.combineLatest(
      state.firstName$, state.lastName$,
      function (firstName, lastName) {
        return div([
          div({className: "form-group"}, [
            label({htmlFor: "first-name"}, "First Name"),
            input({type: "text", className: "form-control", id: "first-name", placeholder: "First Name"}),
          ]),
          div({className: "form-group"}, [
            label({htmlFor: "first-name"}, "Last Name"),
            input({type: "text", className: "form-control", id: "last-name", placeholder: "Last Name"}),
          ]),
          hr(),
          h3(`Hello ${firstName} ${lastName}`),
        ]);
      }),
  };
}

function main(responses) {
  return view(model(intent(responses)));
}

Cycle.run(main, {
  DOM: CycleDOM.makeDOMDriver("#app"),
});