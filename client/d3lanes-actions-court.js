/* 																	*/
/* d3lanes-actions-court.js   			*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesActionsCourt = global.d3lanesActionsCourt || {})));
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
};

// ____________________ action TYPES
var cttsCourt = {
	ADD_KEYS_EVENT: '',
	FETCH_RECORDS: '',
	RELEASE_KEYBKEY: '',
	RESET_KEYS_EVENTS: '',
	RESIZE_SCREEN: '',
	RESIZE_HEIGHT: '',
	RESIZE_WIDTH: '',
	SET_KEYBKEY: '',
	SET_MODE: '',
	SET_NOTICE: '',
	SET_VIEW: '',
	START_KEYS_EVENTS: '',
	START_KEYBKEY_EVENTS: '',
	UPDATE_MOUSE_POS: '',
}

var ActionTypes = keyMirror(cttsCourt, '')

// ____________________ actions COURT
var ActionCreators = {
	resizeHeight(height) {
    return {
        type: ActionTypes.RESIZE_HEIGHT,
        delta: height
		}
  },
	resizeScreen(width, height) {
    return {
        type: ActionTypes.RESIZE_SCREEN,
        width: width,
        height: height
		}
  },
	resizeWidth(width) {
    return {
        type: ActionTypes.RESIZE_WIDTH,
        delta: width
		}
  },
	setKeybKey(keyCode) {
    return {
        type: ActionTypes.SET_KEYBKEY,
        keyCode: keyCode,
		}
  },
	releaseKeybKey(keyCode) {
    return {
        type: ActionTypes.RELEASE_KEYBKEY,
        keyCode: keyCode,
		}
  },
	setMode(currentMode) {
    return {
        type: ActionTypes.SET_MODE,
        currentMode: currentMode,
		}
  },
	setView(currentView) {
    return {
        type: ActionTypes.SET_VIEW,
        currentView: currentView,
		}
  },
	setNotice(notice) {
    return {
        type: ActionTypes.SET_NOTICE,
        notice: notice,
		}
  },
	startKeybKeyEvents() {
    return {
        type: ActionTypes.START_KEYBKEY_EVENTS
    }
	},
	updateMousePos(x, y) {
    return {
        type: ActionTypes.UPDATE_MOUSE_POS,
        x: x,
        y: y
    }
	},
}


exports.ActionTypes = ActionTypes;
exports.ActionCreators = ActionCreators;
}));