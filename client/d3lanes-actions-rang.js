/* 																	*/
/* d3lanes-actions-rang.js   						*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesActionsRang = global.d3lanesActionsRang || {})));
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


var consts = {
	DELETE_RANG: '',
	SET_RANG: '',
	SET_RANGS: '',
}


var ActionTypes = keyMirror(consts, '')

// ____________________ actions RANGS
var ActionCreators = {
	deleteRang(rang) {
    return {
        type: ActionTypes.DELETE_RANG,
        rang: rang,
		}
  },
	setRang(rang) {
    return {
        type: ActionTypes.SET_RANG,
        rang: rang,
		}
  },
	setRangs(rangs) {
    return {
        type: ActionTypes.SET_RANGS,
        rangs: rangs,
		}
  },
}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));