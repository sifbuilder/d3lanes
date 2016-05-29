/* 														*/
/*    d3lanes-reducer-rang.js      */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')
	var d3lanesActions = require('./d3lanes-actions-rang.js')
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerRang = global.d3lanesReducerRang || {})));
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


// _____________ RANGS
var initialStateThis = {
			n: 10,
			s: 50,
			rangs: [],
			rangsIndex: 0,
			initRangs: false,
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {

       case ActionTypes.INIT_RANGS:
 						console.log('INIT_RANGS')
            return Object.assign({}, state, {
                initRangs: true
            })

			case ActionTypes.SET_RANG:		// setRang
				
					var rangs = state.rangs
					var items = {}
					var result = rangs.filter(function( obj ) {
							return obj.id == action.rang.id;
						});
							
					if (result.length === 0) {			// add
						items = {rangs: [
							{
											id: action.rang.id,
											x: action.rang.x,
											y: action.rang.y,
											width: action.rang.width,
											height: action.rang.height,
							}, 
							...rangs
						]}
					} else {												// edit
							items = {rangs: rangs.map(rang =>
								rang.id === action.rang.id ?
									Object.assign({}, rang, { 
											id: action.rang.id,
											x: action.rang.x,
											y: action.rang.y,
											width: action.rang.width,
											height: action.rang.height,
									}) :
									rang
							)}
					}
					
					 var r = Object.assign({}, state,
						items,
						{
							rangsIndex: items.rangs.length
						});
						return r

		
        case ActionTypes.SET_RANGS:
 						console.log('SET_RANGS')
            return Object.assign({}, state, {
                rangs: action.rangs,
                rangsIndex: Object.keys(action.rangs).length
            })

						
        default:
            return state;
    }
}



exports.reducerRang = reducerThis
}));