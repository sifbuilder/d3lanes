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
function configReducer(state = initialStateConfig, action) {
	if (actions == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
					default:
            return state;
	}
}

// _____________ DEBUG
var initialStateDebug = {
				debugMode: true,
				fps: 0
}
function debugReducer(state = initialStateDebug, action) {
	if (actions == null) return state

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
function courtReducer(state = initialStateCourt, action) {
	if (actions == null) return state
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
// _____________ LANES
var initialStateLanes = {
			lanes: [],
			lanesIndex: 0,
			messages: [],
			records: [],
			recordsCollection: [],
			areRecordsFetched: false,
			messagesCursorLow: 0,
			messagesCursorHigh: 0,
	}
	
function lanesReducer(state = initialStateLanes, action) {
	if (actions == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
		
				case ActionTypes.INCREASE_CURSOR_LOW:
					 var r = Object.assign({}, state,
						{messagesCursorLow: ++state.messagesCursorLow}
						);
						return r					
				case ActionTypes.REDUCE_CURSOR_LOW:
					 var r = Object.assign({}, state,
						{messagesCursorLow: --state.messagesCursorLow}
						);
						return r					
				case ActionTypes.INCREASE_CURSOR_HIGH:
					 var r = Object.assign({}, state,
						{messagesCursorHigh: ++state.messagesCursorHigh}
						);
						return r					
				case ActionTypes.REDUCE_CURSOR_HIGH:
					 var r = Object.assign({}, state,
						{messagesCursorHigh: --state.messagesCursorHigh}
						);
						return r					
		
				case ActionTypes.DELETE_LANE:		// setLane
				
					var lanes = state.lanes
					var ls = lanes.filter(function( obj ) {
							return obj.id !== action.lane.id;
						});
	
					 var r = Object.assign({}, state,
						{lanes: ls},
						{lanesIndex: ls.length}
						);
						return r


				case ActionTypes.SET_LANE:		// setLane
				
					var lanes = state.lanes
					var ls = {}
					var result = lanes.filter(function( obj ) {
							return obj.id == action.lane.id;
						});
							
					if (result.length === 0) {			// add
						ls = {lanes: [
							{
									id: action.lane.id,
									name: action.lane.name,
									x: action.lane.x
							}, 
							...lanes
						]}
					} else {												// edit
							ls = {lanes: lanes.map(lane =>
								lane.id === action.lane.id ?
									Object.assign({}, lane, { id: action.lane.id, name: action.lane.name, x: action.lane.x }) :
									lane
							)}
					}
					
					 var r = Object.assign({}, state,
						ls,
						{
							lanesIndex: ls.lanes.length
						});
						return r
						
        case ActionTypes.SET_LANES:
 						console.log('SET_LANES')
            return Object.assign({}, state, {
                lanes: action.lanes,
                lanesIndex: Object.keys(action.lanes).length
            });
				case ActionTypes.FETCH_RECORDS:
						console.log('FETCH_RECORDS')
						var processRecord = function processRecord(d) {
							d.amount = +d.amount;
							d.risk = +d.risk;
							d.valueOf = function value() {
								return this.amount;
							}	
							return d;
						}

						var processData = function processData(error, dataCsv) {
							if (store.getState().court.currentMode == 0) {	// _tbd_  
									++timeTick
									++vLast
									store.dispatch(actions.setMessages(store.getState().configReducer.messageCollection.slice(0,
										store.getState().configReducer.messageCollection.length)))
							}
						}
					
						d3.queue()
							.defer(d3.csv, action.src, processRecord)
							.await(processData)					
						
            return Object.assign({}, state);

        case ActionTypes.SET_MESSAGES:			
 						console.log('SET_MESSAGES')
           return Object.assign({}, state, {
										messages: action.messages,
            });
				case ActionTypes.SET_RECORDS_FETCHED:
						console.log('SET_RECORDS_FETCHED')
           return Object.assign({}, state, {
                areRecordsFetched: action.areRecordsFetched
            })
						
				case ActionTypes.SET_RECORDS_COLLECTION:
						console.log('SET_RECORDS_COLLECTION')
            return Object.assign({}, state, {
                recordsCollection: action.recordsCollection
            })
						
				case ActionTypes.SET_RECORDS:
						console.log('SET_RECORDS')
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.itemSpan
						var mode = action.mode
						var r = state
						if (mode == 'autoMode') {
							var records = state.recordsCollection
							var numRecords = records.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numRecords) vHigh = -1		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numRecords) vLow = -1			// reset at end of cycle
							r = Object.assign({}, state, {
								records: state.recordsCollection.slice(vLow, vHigh),
								messagesCursorLow: vLow,
								messagesCursorHigh: vHigh,
							})
						}
						return r

				case ActionTypes.WALK_UP_RECORDS:
						console.log('WALK_UP_RECORDS')
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.itemSpan
						var mode = action.mode
						var r = state
						if (mode == 'walkMode') {
								vLow = Math.max(0, --vLow)
								r = Object.assign({}, state, {
									records: state.recordsCollection.slice(vLow, vHigh),
									messagesCursorLow: vLow,
									messagesCursorHigh: vHigh,
							})
						}
						return r
						
				case ActionTypes.WALK_DOWN_RECORDS:
						console.log('WALK_DOWN_RECORDS')
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.itemSpan
						var mode = action.mode
						var r = state
						if (mode == 'walkMode') {
							if ((vHigh - vLow)  > itemSpan) ++vLow
							++vHigh
								r = Object.assign({}, state, {
									records: state.recordsCollection.slice(vLow, vHigh),
									messagesCursorLow: vLow,
									messagesCursorHigh: vHigh,
							})
						}
						return r
						
        default:
            return state;
    }
}

// _____________ PARTICLES
var initialStateParticles = {
			particles: [],
			particleIndex: 0,
			particlesGenerating: false,
			particlesPerTick: 33,
			particleRadio: 9,
}
function particlesReducer(state = initialStateParticles, action) {
	if (actions == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
        case ActionTypes.START_PARTICLES:				// startParticles
            return Object.assign({}, state, {
                particlesGenerating: true
            });
        case ActionTypes.STOP_PARTICLES:			// stopParticles
            return Object.assign({}, state, {
                particlesGenerating: false
            });
						
						
        case ActionTypes.CREATE_PARTICLES:			// createParticles
						var newParticles = state.particles.slice(0)
						var i
            for (i = 0; i < action.N; i++) {
						
										var ref = parseInt(action.x)
										var closestLaneUp = action.lanes
														.filter(function (d) {return d.x >= ref} )
														.reduce(function (prev, curr) {
											return (Math.abs(curr.x - ref) < Math.abs(prev.x - ref) ? curr : prev);
										}, {id: 'end', x: action.xEnd})
										
										var closestLaneDown = action.lanes
														.filter(function (d) {return d.x <= ref} )
														.reduce(function (prev, curr) {
											return (Math.abs(curr.x - ref) < Math.abs(prev.x - ref) ? curr : prev);
										}, {id: 'init', x: action.xInit})									
						
                var particle = {id: state.particleIndex+i,
																	x: action.x,
																	y: action.y,
																	closestLaneDown: closestLaneDown,
																	closestLaneUp: closestLaneUp,
																};

                particle.vector = [particle.id%2 ? - action.randNormal() : action.randNormal(),
                                   - action.randNormal2()*3.3];

                newParticles.unshift(particle);
            }
            return Object.assign({}, state, {
                particles: newParticles,
                particleIndex: state.particleIndex+i+1
            });
						
						
        case ActionTypes.TICK_PARTICLES:		// tickParticles
							var laneXs = action.lanes
									.map(function(l) {
										var x = parseInt(l.x)
										return x})
							var svgWidth = action.width
							var svgHeight = action.height
              var gravity = action.gravity
              var movedParticles = state.particles
								.filter(function (p) {
											return (!(p.y > svgHeight))
									})
								.filter(function (p) {
											return (!(p.y < 0))
									})
								.map(function (p) {
										var vx = p.vector[0]
										var vy = p.vector[1]
										p.x += vx
										p.y += vy

										var ref = parseInt(p.x)

										var laneUp = action.lanes
												.filter(function(l) {
													return (l.id == p.closestLaneUp.id)
													})
										p.closestLaneUp.x = (laneUp.length > 0 ) ? +laneUp[0].x : +p.closestLaneUp.x
										
										var laneDown = action.lanes
												.filter(function(l) {
													return (l.id == p.closestLaneDown.id)
													})
										 p.closestLaneDown.x = (laneDown.length > 0 ) ? +laneDown[0].x : +p.closestLaneDown.x

										if (ref < (p.closestLaneDown.x + state.particleRadio) || ref > (p.closestLaneUp.x - state.particleRadio)) {
												p.vector[0] = -p.vector[0] 
											}
										p.vector[1] += gravity + 2 * gravity * (p.y - svgHeight) / svgHeight
										return p
							});
							return Object.assign({}, state, {
										particles: movedParticles,
										particleIndex: movedParticles.length,
								});
					default:
            return state;
	}
}

// _____________ combined reducer
var reducer = combineReducers({
		debugReducer: debugReducer,
		configReducer: configReducer,
		courtReducer: courtReducer,
		lanesReducer: lanesReducer,
		particlesReducer: particlesReducer,
})

exports.reducer = reducer;
}));