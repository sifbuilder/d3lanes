/* 																		*/
/*    d3lanes-reducer-coinfig.js      */
/* 																		*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')
	var d3lanesActions = require('./d3lanes-actions.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerConfig = global.d3lanesReducerConfig || {})));
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

// _____________ CONFIG
var initialStateConfig = {
			modes: {autoMode: 'autoMode', walkMode: 'walkMode'},
			modeLabels: {autoMode: 'auto', walkMode: 'walk'},
			views: {lanesView: 'lanesView'},
			gravity: 0.5,
			randNormal: d3.randomNormal(1.3, 2),
			randNormal2: d3.randomNormal(0.5, 1.8),
			containerElem: '#container',
			containerId: 'svgid',
			tickspan: 60,			
			beatTime: 500,
			fadeFactor: 3,	// times beat - fade items
			periodFactor: 4, // times beat - add items
			vstep: 50,
			itemSpan: 6,
			itemProps: ['to', 'from'],
			itemVal: 'msg',
			messageCollection_000: [
				 {id: "1", from: "customer", to: "barrista1", msg: "place order"},
				 {id: "2", from: "barrista1", to: "register", msg: "enter order"},
				 {id: "3", from: "register", to: "barrista1", msg: "give total"},
				 {id: "4", from: "barrista1", to: "barrista1", msg: "get cup making sure that it is fine for purpose"},
				 {id: "5", from: "barrista1", to: "barrista2", msg: "give cup"},
				 {id: "6", from: "barrista1", to: "customer", msg: "request money"},
				 {id: "7", from: "customer", to: "barrista1", msg: "pay order"},
				 {id: "8", from: "barrista2", to: "barrista2", msg: "get chai mix"},
				 {id: "9", from: "barrista2", to: "barrista2", msg: "add flavor"},
				 {id: "10", from: "barrista2", to: "barrista2", msg: "add milk"},
				 {id: "11", from: "barrista2", to: "barrista2", msg: "add ice"},
				 {id: "12", from: "barrista2", to: "barrista2", msg: "swirl"},
				 {id: "13", from: "barrista2", to: "customer", msg: "give tasty beverage"},
				 {id: "14", from: "customer", to: "tasty beverage", msg: "sip"},
				 {id: "15", from: "tasty beverage", to: "customer", msg: "burn"},
				 {id: "16", from: "customer", to: "customer", msg: "cry"},
				 {id: "17", from: "customer", to: "manager", msg: "complain"},
				 {id: "18", from: "manager", to: "barrista1", msg: "fire"},
				 {id: "19", from: "manager", to: "barrista2", msg: "fire"},
			],
			messageCollection: [
				 {id: "1", from: "app", to: "store", msg: "create store"},
				 {id: "2", from: "store", to: "store", msg: "subscribe lanes listener"},
				 {id: "3", from: "store", to: "store", msg: "subscribe particles listener"},
				 {id: "4", from: "app", to: "app", msg: "start kbd controller"},
				 {id: "5", from: "app", to: "app", msg: "start mouse controller"},
				 {id: "6", from: "ticker", to: "ticker", msg: "subscribe tickParticles"},
				 {id: "7", from: "ticker", to: "ticker", msg: "subscribe setRecords"},
				 {id: "8", from: "ticker", to: "ticker", msg: "start auto"},
				 {id: "9", from: "store", to: "reducer", msg: "dispatch setRecords action"},
				 {id: "10", from: "reducer", to: "reducer", msg: "apply action logic"},
				 {id: "11", from: "reducer", to: "store", msg: "return new state"},
				 {id: "12", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "13", from: "component", to: "UI", msg: "render lanes"},
				 {id: "14", from: "UI", to: "app", msg: "trigger left arrow event"},
				 {id: "15", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "16", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "17", from: "reducer", to: "store", msg: "return new state"},
				 {id: "18", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "19", from: "UI", to: "app", msg: "send down arrow event"},
				 {id: "20", from: "store", to: "reducer", msg: "dispatch setRecods action"},
				 {id: "21", from: "reducer", to: "reducer", msg: "run action and get record"},
				 {id: "22", from: "reducer", to: "reducer", msg: "return new set"},
				 {id: "23", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "24", from: "component", to: "UI", msg: "render lanes"},
				 {id: "25", from: "UI", to: "app", msg: "send right arrow event"},
				 {id: "26", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "27", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "28", from: "reducer", to: "reducer", msg: "return new mode auto"},
				 {id: "29", from: "ticker", to: "ticker", msg: "run listeners with new state"},
				 {id: "30", from: "component", to: "UI", msg: "render auto lanes"},
				 {id: "31", from: "store", to: "reducer", msg: "dispatch createParticles action"},
				 {id: "32", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "33", from: "reducer", to: "store", msg: "return new state with particles"},
				 {id: "34", from: "ticker", to: "ticker", msg: "run particles listeners"},
				 {id: "35", from: "component", to: "UI", msg: "render particles"},
			],			
}
function reducerConfig(state = initialStateConfig, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
					default:
            return state;
	}
}

exports.reducerConfig = reducerConfig;
}));