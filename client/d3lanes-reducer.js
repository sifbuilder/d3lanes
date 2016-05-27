/* 														*/
/*    d3lanes-reducer.js      */
/* 														*/

if (typeof require === "function") {
	var d3lanesReducerConfig = require('./d3lanes-reducer-config.js')
	var d3lanesReducerDebug = require('./d3lanes-reducer-debug.js')
	var d3lanesReducerCourt = require('./d3lanes-reducer-court.js')
	var d3lanesReducerLanes = require('./d3lanes-reducer-lanes.js')
	var d3lanesReducerParticles = require('./d3lanes-reducer-particles.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducer = global.d3lanesReducer || {})));
}(this, function (exports) { 'use strict';


// _____________ adapted from redux combineReducers	
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  var finalReducerKeys = Object.keys(finalReducers)

  return function combination(state = {}, action) {
    var hasChanged = false
    var nextState = {}
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}


// _____________ combined reducer
var reducer = combineReducers({
		reducerConfig: d3lanesReducerConfig.reducerConfig,
		reducerCourt: d3lanesReducerCourt.reducerCourt,
		reducerDebug: d3lanesReducerDebug.reducerDebug,
		reducerLanes: d3lanesReducerLanes.reducerLanes,
		reducerParticles: d3lanesReducerParticles.reducerParticles,
})


var r = reducer()
console.log("r: " , r)

exports.reducer = reducer;
}));