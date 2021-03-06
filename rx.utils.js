let R = require("ramda")
let {assoc, curry, identity, is, keys, map, not, range, reduce, split, values} = require("ramda")
let V = require("tcomb-validation")
let {Observable: $} = require("rx")
let {always, fst, snd, lens} = require("./helpers") // flattenObject, unflattenObject

// scanFn :: s -> (s -> s) -> s
let scanFn = curry((state, updateFn) => {
  if (!is(Function, updateFn) || updateFn.length != 1) {
    throw Error("updateFn must be a function with arity 1, got " + updateFn)
  } else {
    return updateFn(state)
  }
})

// pluck :: (Observable a ->) String -> Observable b
let pluck = function (path) {
  let ls = lens(path)
  return this.map((v) => R.view(ls, v)).share()
}

// pluckN :: (Observable a ->) [String] -> Observable b
let pluckN = function (paths) {
  let lss = map(lens, paths)
  return this.map((v) => map((ls) => R.view(ls, v), lss)).share()
}

// view :: (Observable a ->) String -> Observable b
let view = function (path) {
  let ls = lens(path)
  return this
    .map((v) => R.view(ls, v))
    .distinctUntilChanged()
    .shareReplay(1)
}

// viewN :: (Observable a ->) [String] -> Observable b
let viewN = function (paths) {
  let lss = map(lens, paths)
  return this
    .map((v) => map((ls) => R.view(ls, v), lss))
    .distinctUntilChanged()
    .shareReplay(1)
}

// deriveN :: (* -> b) -> [Observable *] -> Observable b
let deriveN = curry((deriveFn, os) => {
  return $.combineLatest(...os, deriveFn).distinctUntilChanged().shareReplay(1)
})

// derive :: (a -> b) -> Observable a -> Observable b
let derive = curry((deriveFn, os) => {
  return deriveN(deriveFn, [os])
})

// store :: s -> Observable (s -> s) -> Observable s
let store = curry((seed, update) => {
  return update
    .startWith(seed)
    .scan(scanFn)
    .distinctUntilChanged()
    .shareReplay(1)
})

// storeUnion :: {Observable *} -> Observable {*}
// let storeUnion = curry((state) => {
//   let flatState = flattenObject(state)
//   let names = keys(flatState)
//   return $.combineLatest(
//     ...values(flatState),
//     (...args) => {
//       return unflattenObject(reduce((memo, i) => {
//         return assoc(names[i], args[i], memo)
//       }, {}, range(0, names.length)))
//     }
//   )
//     .distinctUntilChanged()
//     .shareReplay(1)
// })

// Apply fn to upstream value, apply resulting function to state fragment
// toOverState :: (Observable uv ->) String, (uv -> (sv -> sv)) -> Observable fn
let toOverState = function (path, fn) {
  let ls = lens(path)
  return this.map((v) => (s) => R.over(ls, fn(v), s))
}

// Apply fn to upstream value, replace state fragment with resulting value
// toSetState :: (Observable uv ->) String, (uv -> sv) -> Observable fn
let toSetState = function (path, fn) {
  let ls = lens(path)
  return this.map((v) => (s) => R.set(ls, fn(v), s))
}

// Apply fn to state fragment
// overState :: (Observable uv ->) String, (sv -> sv) -> Observable fn
let overState = function (path, fn) {
  return this::toOverState(path, always(fn))
}

// Replace state fragment with v
// setState :: (Observable uv ->) String, sv -> Observable fn
let setState = function (path, v) {
  return this::toSetState(path, always(v))
}

// Replace state fragment with upstream value
// toState :: (Observable v ->) String -> Observable fn
let toState = function (path) {
  return this::toSetState(path, identity)
}

// validate :: (Observable a ->) Type -> Observable (String | null)
let validate = function (type) {
  return this
    .debounce(500)
    .map((val) => V.validate(val, type).firstError())
    .map((e) => e && e.message || null)
    .distinctUntilChanged()
    .shareReplay(1)
}

// samplePluck :: (Observable a ->) String -> Observable b
let samplePluck = function (path) {
  return this.sample(this::pluck(path))
}

// sampleView :: (Observable a ->) String -> Observable b
let sampleView = function (path) {
  return this.sample(this::view(path))
}

// filterBy :: (Observable a ->) Observable Boolean -> Observable a
let filterBy = function (o) {
  return this.withLatestFrom(o).filter(snd).map(fst)
}

// rejectBy :: (Observable a ->) Observable Boolean -> Observable a
let rejectBy = function (o) {
  return this::filterBy(o.map(not))
}

exports.scanFn = scanFn

exports.pluck = pluck
exports.pluckN = pluckN
exports.view = view
exports.viewN = viewN
exports.derive = derive
exports.deriveN = deriveN

exports.store = store
// exports.storeUnion = storeUnion

exports.toOverState = toOverState
exports.toSetState = toSetState
exports.overState = overState
exports.setState = setState
exports.toState = toState

exports.validate = validate

exports.samplePluck = samplePluck
exports.sampleView = sampleView

exports.filterBy = filterBy
exports.rejectBy = rejectBy