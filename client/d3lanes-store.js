/* 														*/
/*    d3lanes-store.js        */
/* 														*/

/* adapted from REDUX http://redux.js.org/		*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesStore = global.d3lanesStore || {})));
}(this, function (exports) { 'use strict';

		var createStore = function createStore(reducer, initialState) {
		var currentReducer = reducer
		var currentState = initialState
		var currentListeners = []
		var nextListeners = currentListeners
		var isDispatching = false

		// ______________________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
			if (nextListeners === currentListeners) {
				nextListeners = currentListeners.slice()
			}
		}
		
		// ______________________________ valuefn
		function valuefn(value) {
				console.log("__________ valuefn: ", JSON.stringify(value, null, 2) )		
		
				var r = function() { return value }
				return r
		}
		
		// ______________________________ getState
		function getState() {
			return currentState
		}

	// redux compose
		function compose(...funcs) {
			if (funcs.length === 0) {
				return arg => arg
			} else {
				const last = funcs[funcs.length - 1]
				const rest = funcs.slice(0, -1)
				return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
			}
		}

		// ______________________________ subscribe
		function subscribe(listener) {
		
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}

			var isSubscribed = true

			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}
		}

		// ______________________________ dispatch
		function dispatch(action) {
		
			if (typeof action.type === 'undefined') {
				throw new Error(
					'Actions may not have an undefined "type" property. ' +
					'Have you misspelled a constant?'
				)
			}

			if (isDispatching) {
				throw new Error('Reducers may not dispatch actions.')
			}

			try {
				isDispatching = true
				currentState = currentReducer(currentState, action)
			} finally {
				isDispatching = false
			}

			var listeners = currentListeners = nextListeners
			for (var i = 0; i < listeners.length; i++) {
				listeners[i]()
			}

			return action
		}
		
		
		
		// ______________________________ return		
		return {
			compose: compose,
			dispatch: dispatch,
			subscribe: subscribe,
			getState: getState,
			valuefn: valuefn,
		}
	}
		

		exports.createStore = createStore;
}));

