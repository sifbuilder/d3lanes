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
  (factory((global.d3lanesReducerCourt = global.d3lanesReducerCourt || {})));
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

// _____________ COURT
var initialStateCourt = {
			svgHeight: 400,		// 
			svgWidth: 600,		// 
			keys: [],
			notice: 'auto lanes',
			currentMode: 'autoMode',
			currentView: 'lanesView',
			arrowKeysStarted: false,
			keybKeyEventsStarted: false,
			tickerStarted: false,
			lastTick: 0,
			mousePos: [null, null],
}

function reducerCourt(state = initialStateCourt, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
				case ActionTypes.SET_KEYBKEY:
						console.log('SET_KEYBKEY')
						var ks = state.keys
						ks[action.keyCode] = true
            return Object.assign({}, state, {
                keys: ks
            });
        case ActionTypes.RELEASE_KEYBKEY:
						console.log('RELEASE_KEYBKEY')
 						var ks = state.keys
						ks[action.keyCode] = false
            return Object.assign({}, state, {
                keys: ks
            });
        case ActionTypes.START_KEYBKEY_EVENTS:
						console.log('START_KEYBKEY_EVENTS')
            return Object.assign({}, state, {
                keybKeyEventsStarted: true
            });
        case ActionTypes.SET_MODE:
  						console.log('SET_MODE')
           return Object.assign({}, state, {
                currentMode: action.currentMode,
            });
        case ActionTypes.SET_VIEW:
  						console.log('SET_VIEW')
           return Object.assign({}, state, {
                currentView: action.currentView,
            });
        case ActionTypes.SET_NOTICE:
  						console.log('SET_NOTICE')
           return Object.assign({}, state, {
                notice: action.notice,
            });
        case ActionTypes.START_TICKER:
  						console.log('START_TICKER')
            return Object.assign({}, state, {
                tickerStarted: true
            });
       case ActionTypes.STOP_TICKER:
  						console.log('STOP_TICKER')
            return Object.assign({}, state, {
                tickerStarted: false
            });
        case ActionTypes.UPDATE_MOUSE_POS:
            return Object.assign({}, state, {
                mousePos: [action.x, action.y]
            });
        case ActionTypes.RESIZE_SCREEN:
  						console.log('RESIZE_SCREEN')
            return Object.assign({}, state, {
                svgWidth: action.width,
                svgHeight: action.height
            });
        case ActionTypes.RESIZE_WIDTH:
 						console.log('RESIZE_WIDTH')
            return Object.assign({}, state, {
                svgWidth: state.svgWidth + action.delta
            });
        case ActionTypes.RESIZE_HEIGHT:
   					console.log('RESIZE_HEIGHT')
						return Object.assign({}, state, {
                svgHeight: state.svgHeight + action.delta
            });
					default:
            return state;
	}
}	

exports.reducerCourt = reducerCourt;
}));