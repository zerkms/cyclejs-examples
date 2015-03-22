// IMPORTS =========================================================================================
require("./shims");
let range = require("lodash.range");
let Cycle = require("cyclejs");
let {Rx, h} = Cycle;
let Menu = require("./menu");

// APP =============================================================================================
let data = [
  {name: "Web Development", price: 300},
  {name: "Design", price: 400},
  {name: "Integration", price: 250},
  {name: "Training", price: 220}
];

let active = ["Web Development", "Integration"];

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomActive(data) {
  let names = data.map(item => item.name);
  let randomCount = randomInt(names.length - 1);
  //console.log("randomCount:", randomCount);
  let randomItems = range(randomCount).map(() => randomFrom(names));
  //console.log("randomItems:", randomItems);
  return Array.from(new Set(randomItems));
}

//let active$ = Rx.Observable.interval(1000).map(() => generateRandomActive(data));

let Model = Cycle.createModel(() => {
  return {
    active$: Rx.Observable.interval(1000).map(() => generateRandomActive(data)).tap(active => {
      console.log(active);
    }),
  }
});

let View = Cycle.createView(Model => ({
  vtree$: Model.get("active$").map(active => {
    return <div>
      <Menu items={data} active={active}/>
    </div>;
  }),
}));

Cycle.createDOMUser("main").inject(View).inject(Model);