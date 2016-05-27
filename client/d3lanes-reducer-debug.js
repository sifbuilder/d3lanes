/* 														*/
/*    d3lanes-reducer.js      */
/* 														*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.40.js')
		var d3lanesActions = require('./d3lanes-actions.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerDebug = global.d3lanesReducerDebug || {})));
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


// _____________ DEBUG
var initialStateDebug = {
				debugMode: true,
				fps: 0
}
function reducerDebug(state = initialStateDebug, action) {
	if (action == null) return state

	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
				case ActionTypes.SET_FPS:
						return setFps(state, action)
				case ActionTypes.SWITCH_DEBUGMODE:
						console.log('SWITCH_DEBUGMODE')
						return switchDebugMode(state, action)
				default:
					return state;
	}
}
function setFps(state, action) {
		 return Object.assign({}, state, {
             fps: action.fps
		})
}
function switchDebugMode(state, action) {
		 return Object.assign({}, state, {
             debugMode: !state.debugMode
		})
}



exports.reducerDebug = reducerDebug;
}));