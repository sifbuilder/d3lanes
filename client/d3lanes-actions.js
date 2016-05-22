(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesActions = global.d3lanesActions || {})));
}(this, function (exports) { 'use strict';


// ____________________ merge_objects
function merge_objects(ctt1,ctt2){	
    var i, obj = {}
    for (i = 0; i < arguments.length; i++) {
        Object.assign(obj, arguments[i])
    }
    return obj;
}

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

var cttsLanes = {
	DELETE_LANE: '',
	SET_LANE: '',
	SET_LANES: '',
	SET_MESSAGES: '',
	SET_RECORDS: '',
	WALK_DOWN_RECORDS: '',
	WALK_UP_RECORDS: '',
	SET_RECORDS_COLLECTION: '',
	SET_RECORDS_FETCHED: '',
	UPDATE_MESSAGES: '',
}

var cttsDebug = {
	SET_DEBUGMODE: '',
	SET_FPS: '',
	SWITCH_DEBUGMODE: '',
}

var cttsParticles = {
	CREATE_PARTICLES: '',
	START_PARTICLES: '',
	START_TICKER: '',
	STOP_PARTICLES: '',
	STOP_TICKER: '',
	TICK_PARTICLES: '',
}

// ____________________ actions COURT
var ActionCreatorsCourt = {
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

// ____________________ actions LANES
var ActionCreatorsLanes = {
	setRecordsFetched(areRecordsFetched) {
    return {
        type: ActionTypes.SET_RECORDS_FETCHED,
        areRecordsFetched: areRecordsFetched,
    }
  },
	setRecordsCollection(recordsCollection) {
    return {
        type: ActionTypes.SET_RECORDS_COLLECTION,
        recordsCollection: recordsCollection,
    }
  },
	setRecords(argObj) {	// SET_RECORDS
    return {
        type: ActionTypes.SET_RECORDS,
        itemSpan: argObj.itemSpan,
        mode: argObj.currentMode,
    }
  },
	walkDownRecords(itemSpan, mode) {	// WALK_DOWN_RECORDS
    return {
        type: ActionTypes.WALK_DOWN_RECORDS,
        itemSpan: itemSpan,
        mode: mode,
    }
  },
	walkUpRecords(itemSpan, mode) {	// WALK_UP_RECORDS
    return {
        type: ActionTypes.WALK_UP_RECORDS,
        itemSpan: itemSpan,
        mode: mode,
    }
  },
	increaseCursorLow() {		// INCREASE_CURSOR_LOW
    return {
        type: ActionTypes.INCREASE_CURSOR_LOW,	
		}
  },
	decreaseCursorLow() {
    return {
        type: ActionTypes.DECREASE_CURSOR_LOW,
		}
  },
	increaseCursorHigh() {
    return {
        type: ActionTypes.INCREASE_CURSOR_HIGH,
		}
  },
	decreaseCursorHigh() {
    return {
        type: ActionTypes.DECREASE_CURSOR_HIGH,
		}
  },
	deleteLane(lane) {
    return {
        type: ActionTypes.DELETE_LANE,
        lane: lane,
		}
  },
	setLane(lane) {
    return {
        type: ActionTypes.SET_LANE,
        lane: lane,
		}
  },
	setLanes(lanes) {
    return {
        type: ActionTypes.SET_LANES,
        lanes: lanes,
		}
  },
	setMessages(messages) {
    return {
        type: ActionTypes.SET_MESSAGES,
        messages: messages,
		}
  },
	updateMessages(messages) {
    return {
       type: ActionTypes.UPDATE_MESSAGES,
       cursorLow: cursorLow,
       cursorHigh: cursorHigh,
		}
  },
}
// ____________________ actions DEBUG
var ActionCreatorsDebug = {
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
// ____________________ actions PARTICLES
var ActionCreatorsParticles = {
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

var ctts = merge_objects(cttsLanes, cttsCourt, cttsDebug, cttsParticles)
var ActionTypes = keyMirror(ctts, '')
var ActionCreators = merge_objects(ActionCreatorsCourt, ActionCreatorsParticles, ActionCreatorsDebug, ActionCreatorsLanes)

exports.ActionTypes = ActionTypes;
exports.ActionCreators = ActionCreators;
}));