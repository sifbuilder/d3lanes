/* 																	*/
/* d3lanes-actions-debug.js					*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesActionsDebug = global.d3lanesActionsDebug || {})));
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

// ____________________ action TYPES
var cttsDebug = {
	SET_DEBUGMODE: '',
	SET_FPS: '',
	SWITCH_DEBUGMODE: '',
}


var ActionTypes = keyMirror(cttsDebug, '')

// ____________________ actions DEBUG
var ActionCreators = {
	setDebugMode(debugMode) {
    return {
        type: ActionTypes.SET_DEBUG_MODE,
        debugMode: debugMode,
		}
  },
	setFps(fps) {
    return {
        type: ActionTypes.SET_FPS,
        fps: fps,
		}
  },
	switchDebugMode() {
    return {
        type: ActionTypes.SWITCH_DEBUGMODE
    };
	},
}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));