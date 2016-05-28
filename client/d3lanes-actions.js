/* 																	*/
/* d3lanes-actions.js   						*/
/* 																	*/

if (typeof require === "function") {
	var d3lanesActionsCourt = require('./d3lanes-actions-court.js')
	var d3lanesActionsDebug = require('./d3lanes-actions-debug.js')
	var d3lanesActionsLanes = require('./d3lanes-actions-lanes.js')
	var d3lanesActionsParticles = require('./d3lanes-actions-particles.js')
}	


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

var ActionTypes = merge_objects(d3lanesActionsCourt.ActionTypes,
		d3lanesActionsDebug.ActionTypes,
		d3lanesActionsLanes.ActionTypes,
		d3lanesActionsParticles.ActionTypes)
		
var ActionCreators = merge_objects(d3lanesActionsCourt.ActionCreators,
		d3lanesActionsDebug.ActionCreators, 
		d3lanesActionsLanes.ActionCreators, 
		d3lanesActionsParticles.ActionCreators)

exports.ActionTypes = ActionTypes;
exports.ActionCreators = ActionCreators;
}));