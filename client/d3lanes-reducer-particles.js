/* 														*/
/*    d3lanes-reducer.js      */
/* 														*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.40.js')
		var d3lanesActions = require('./d3lanes-actions-particles.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerParticles = global.d3lanesReducerParticles || {})));
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



// _____________ PARTICLES
var initialStateParticles = {
			particles: [],
			particleIndex: 0,
			particlesGenerating: false,
			particlesPerTick: 33,
			particleRadio: 9,
}
function reducerParticles(state = initialStateParticles, action) {
	if (action == null) return state
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
						if (action.generating == true) {
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
							})
						} else {
							return state
						}
						
						
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


exports.reducerParticles = reducerParticles;
}));