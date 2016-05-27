/* 																	*/
/* d3lanes-actions-particles.js 		*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesActionsParticles = global.d3lanesActionsParticles || {})));
}(this, function (exports) { 'use strict';

// ____________________ keyMirror
// https://github.com/STRML/keyMirror
var keyMirror = function(obj, prefix) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = prefix + key;
    }
  }
  return ret;
}


var cttsParticles = {
	CREATE_PARTICLES: '',
	START_PARTICLES: '',
	START_TICKER: '',
	STOP_PARTICLES: '',
	STOP_TICKER: '',
	TICK_PARTICLES: '',
}


var ActionTypes = keyMirror(cttsParticles, '')

// ____________________ actions PARTICLES
var ActionCreators = {
	createParticles(obj) {
    return {
        type: ActionTypes.CREATE_PARTICLES,	// createParticles
        N: obj.particlesPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				lanes: obj.lanes,
    }
  },
	startParticles() {
    return {
        type: ActionTypes.START_PARTICLES
    }
	},
	startTicker() {
    return {
        type: ActionTypes.START_TICKER
    };
	},
	stopTicker() {
    return {
        type: ActionTypes.STOP_TICKER
    };
	},
	tickParticles(arg) {
// console.log("arg: ", JSON.stringify(arg.lanes, null, 2))	
    return {
         type: ActionTypes.TICK_PARTICLES,		// tickParticles
				 width: arg.width,
				 height: arg.height,
				 gravity: arg.gravity,
				 lanes: arg.lanes,
    }
	},
	stopParticles() {
    return {
        type: ActionTypes.STOP_PARTICLES
    }
	},
}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));