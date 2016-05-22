if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.40.js')
}	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesControls = global.d3lanesControls || {})));
}(this, function (exports) { 'use strict';


/*  -------------          */
/*    stepControls        */
/*  -------------          */
	function stepControls(store) {
	
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

		// ______________________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			
		
		// ____________________ tc
		function tc() {}
		
		// ____________________ start
		tc.start = function start() {
					var periodFactor = store.getState().configReducer.periodFactor					
					var beatTime = store.getState().configReducer.beatTime				
					var periodTime = periodFactor	* beatTime // items added						
							
					var itemSpan = store.getState().configReducer.itemSpan
							
					var tickspan = store.getState().configReducer.tickspan
					var vLow = store.getState().lanesReducer.messagesCursorLow
					var vHigh = store.getState().lanesReducer.messagesCursorHigh

					var tf = setInterval(function() {
						
						var currentMode = store.getState().courtReducer.currentMode
																	
						var listeners = currentListeners = nextListeners
						for (var i = 0; i < listeners.length; i++) {
							listeners[i]()
						}									
					}, periodTime)
					
					return tc
			}
		// ______________________________ subscribe
	 tc.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}

			var isSubscribed = true

			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return tc
		}
		
		return tc
}		

/*  -------------          */
/*    tickControls        */
/*  -------------          */
	function tickControls(store) {
	
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

		// ______________________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			
		
		// ____________________ tc
		function tc() {}
		
		// ____________________ start
		tc.start = function start() {
			// Anatomy of a video game
			// Misuse of the requestAnimationFrme()
					var started = false
					var rfps = 60
					var last = performance.now()
					var timestamp = 0
					var ticker = function(timestamp) {
						window.requestAnimationFrame(ticker)
					
						if (timestamp != undefined) rfps = rfps * 0.9 + (1000/(timestamp-last)) * 0.1
						if (timestamp != undefined) last = timestamp						
						while( performance.now() - timestamp < 17 ) {}
						var fps = parseFloat(Math.round(rfps * 100) / 100).toFixed(0)							
						store.dispatch(actions.setFps(fps))
							
						var listeners = currentListeners = nextListeners
						for (var i = 0; i < listeners.length; i++) {
							listeners[i]()
						}
					}
					if (!started) {
						started = true
						ticker()	
					}
					return tc
			}
		// ______________________________ subscribe
	 tc.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}

			var isSubscribed = true

			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return tc
		}

		return tc
}		
		

/*  -------------          */
/*    mouseControls        */
/*  -------------          */
	function mouseControls(store) {
		var store = store

		// ____________________ mouseEventsActions
			var mousedown = function mousedown(svg) {

// console.log("event: ", d3.event)
				// var e = window.event;
				var e = d3.event
				pauseEvent(e);

				function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			
			
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateMousePos(coords[0], coords[1]))
				store.dispatch(actions.startParticles())
				store.dispatch(actions.createParticles({
						particlesPerTick: store.getState().particlesReducer.particlesPerTick,
						x: coords[0], 
						y: coords[1],
						xInit: 0, 
						xEnd: store.getState().courtReducer.svgWidth, 
						randNormal: store.getState().configReducer.randNormal,
						randNormal2: store.getState().configReducer.randNormal2,
						lanes: store.getState().lanesReducer.lanes,
				}))
			}
			var touchstart = function touchstart(svg) {
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateTouchPos(coords[0], coords[1]))
				store.dispatch(actions.startParticles())
				store.dispatch(actions.createParticles({
						particlesPerTick: store.getState().particlesReducer.particlesPerTick,
						x: coords[0], 
						y: coords[1],
						xInit: 0, 
						xEnd: store.getState().courtReducer.svgWidth, 
						randNormal: store.getState().configReducer.randNormal,
						randNormal2: store.getState().configReducer.randNormal2,
						lanes: store.getState().lanesReducer.lanes,
				}))
			}
			var mousemove = function mousemove(svg) {
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateMousePos(coords[0], coords[1]))
				var generating = store.getState().particlesReducer.particlesGenerating
				if (generating === true) {

					store.dispatch(actions.createParticles({
							particlesPerTick: store.getState().particlesReducer.particlesPerTick,
							x: coords[0], 
							y: coords[1],
							xInit: 0, 
							xEnd: store.getState().courtReducer.svgWidth, 
							randNormal: store.getState().configReducer.randNormal,
							randNormal2: store.getState().configReducer.randNormal2,
							lanes: store.getState().lanesReducer.lanes,
					}))
				}
			}
			var touchmove = function touchmove(svg) {
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateTouchPos(coords[0], coords[1]))
			}	
			var mouseup = function mouseup(svg) {
				store.dispatch(actions.stopParticles())
				var generating = store.getState().particlesReducer.particlesGenerating
			}	
			var touchend = function touchend(svg) {
				store.dispatch(actions.stopParticles())
			}	
			var mouseleave = function mouseleave(svg) {
				store.dispatch(actions.stopParticles())
			}		

		// ____________________ controlfn
	  function controlfn() {
 		}
			// ____________________ startMouseEvents
		controlfn.startMouseEvents = function startMouseEvents(svg) {
					svg.on('mousedown', 	function() {mousedown(this)})
					svg.on('touchstart', 	function() {touchstart(this)})
					svg.on('mousemove', 	function() {mousemove(this)})
					svg.on('touchmove', 	function() {touchmove(this)})
					svg.on('mouseup', 		function() {mouseup(this)})
					svg.on('mouseleave', 	function() {mouseleave(this)})
					svg.on('mouseleave', 	function() {mouseleave(this)})
		}

	return controlfn
		
}

/*  -------------          */
/*    kbdControls        */
/*  -------------          */
function kbdControls(store) {
		var store = store
	
		// ____________________ handleKeyDown
		// https://www.kirupa.com/html5/keyboard_events_in_javascript.htm
		// https://github.com/gaearon/redux-devtools-dock-monitor
		var handleKeyDown = function handleKeyDown(e) {
			e.stopPropagation();
			e.preventDefault();			
			
			store.dispatch(actions.setKeybKey(e.keyCode))
			var keys = 	store.getState().courtReducer.keys
			
			// keys[e.keyCode] = true;
			if (keys[70] && keys[17])										fKeyCtrl()		// change currentView
				else if (keys[68] && keys[17])						dKeyCtrl()		// change debugMode
				else if (e.keyCode == '37' && !keys[17]) leftArrow()		// change currentMode autoMode/walkMode
				else if (e.keyCode == '37' &&  keys[17]) leftArrowCtrl() // change width
				else if (e.keyCode == '39' && !keys[17]) rightArrow()		// change currentMode
				else if (e.keyCode == '39' &&  keys[17]) rightArrowCtrl()	// change width
				else if (e.keyCode == '38' && !keys[17]) upArrow()			// change currentMode nextWalk
				else if (e.keyCode == '38' &&  keys[17]) upArrowCtrl()	// change height
				else if (e.keyCode == '40' && !keys[17]) downArrow()		// change currentMode		
				else if (e.keyCode == '40' &&  keys[17]) downArrowCtrl()	// change height	
		}	
		// ____________________ downArrowCtrl
		var downArrowCtrl = function downArrowCtrl() {
				store.dispatch(actions.resizeHeight(+10))
		}
			// ____________________ fKeyCtrl
		var fKeyCtrl = function fKeyCtrl() {		// change view
				// // Ctrl 17 + Shift 16  + f 70
				var views = Object.keys(store.getState().configReducer.views)
				var idx = views.indexOf(store.getState().courtReducer.currentView)
				var newIdx = idx + 1 % views.length
				var newview = store.getState().configReducer.views[views[newIdx]]
				store.dispatch(actions.setView(newview))
		}
			// ____________________ dKeyCtrl
		var dKeyCtrl = function dKeyCtrl() {		// change debug mode
				// // Ctrl 17 + Shift 16  + d 68
				store.dispatch(actions.switchDebugMode())
		}
		// ____________________ matchesKey
			function matchesKey(key, event) {
				if (!key) return false
				const charCode = event.keyCode || event.which;
				const char = String.fromCharCode(charCode);
				return key.name.toUpperCase() === char.toUpperCase() &&
					key.alt === event.altKey &&
					key.ctrl === event.ctrlKey &&
					key.meta === event.metaKey &&
					key.shift === event.shiftKey;
			}
		// ____________________ handleKeyPressed
		var handleKeyPressed = function handleKeyPressed(e) {
		}			
		// ____________________ handleKeyReleased
		var handleKeyReleased = function handleKeyReleased(e) {
				store.dispatch(actions.releaseKeybKey(e.keyCode))
		}	
		// ____________________ keysEventsActions
		// arrows up/down => currentMode walkMode
		// arrow right => currentMode autoMode
		// arrow left => currentMode walkMode
		
		// ____________________ leftArrow
			var leftArrow = function leftArrow() { // set currentMode walkMode
				var currentMode = 'walkMode'
				store.dispatch(actions.setMode(currentMode))				
		}
		// ____________________ rightArrow
		var rightArrow = function rightArrow() {	// set currentMode autoMode
				var currentMode = 'autoMode'
				store.dispatch(actions.setMode(currentMode))				
		}
		// ____________________ upArrow
		var upArrow = function upArrow() {
			var currentMode = store.getState().courtReducer.currentMode
			if (currentMode == 'autoMode') {
				var newMode = 'walkMode'
				store.dispatch(actions.setMode(newMode))
			} else if (currentMode == 'walkMode') {

						var itemSpan = store.getState().configReducer.itemSpan
						store.dispatch(actions.walkUpRecords(itemSpan, currentMode))

			}
		}
		// ____________________ downArrow
		var downArrow = function downArrow() {
			var currentMode = store.getState().courtReducer.currentMode
			if (currentMode == 'autoMode') {
				var newMode = 'walkMode'
				store.dispatch(actions.setMode(newMode))
			} else if (currentMode == 'walkMode') {

					var itemSpan = store.getState().configReducer.itemSpan
					store.dispatch(actions.walkDownRecords(itemSpan, currentMode))

			}
		}
		// ____________________ leftArrowCtrl
		var leftArrowCtrl = function leftArrowCtrl() {
			console.log("leftArrowCtrlFn")
			store.dispatch(actions.resizeWidth(-10))
		}
		// ____________________ rightArrowCtrl
		var rightArrowCtrl = function rightArrowCtrl() {
			console.log("rightArrowCtrlFn")
			store.dispatch(actions.resizeWidth(10))
		}
		// ____________________ upArrowCtrl
		var upArrowCtrl = function upArrowCtrl() {
			console.log("upArrowCtrlFn")
			store.dispatch(actions.resizeWidth(-10))
		}
		// ____________________ controlfn
	  function controlfn() {
 		}
		// ____________________ startKeysEvents
		controlfn.startKeybKeyEvents = function startKeybKeyEvents() {
			store.dispatch(actions.startKeybKeyEvents())
			document.addEventListener("keydown", handleKeyDown, false);
			document.addEventListener("keypress", handleKeyPressed, false);
			document.addEventListener("keyup", handleKeyReleased, false);
		}

	return controlfn
}
		
exports.stepControls = stepControls
exports.tickControls = tickControls
exports.mouseControls = mouseControls
exports.kbdControls = kbdControls
}));		
