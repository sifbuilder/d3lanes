/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')

	var d3lanesComponentCourt = require('./d3lanes-component-court.js')
	var d3lanesComponentLanes = require('./d3lanes-component-lanes.js')
	var d3lanesComponentParticles = require('./d3lanes-component-particles.js')
	var d3lanesComponentRang = require('./d3lanes-component-rang.js')

	var d3lanesReducer = require('./d3lanes-reducer.js')
	var d3lanesStore = require('./d3lanes-store.js')
	var d3lanesActions = require('./d3lanes-actions.js')
	var d3lanesControls = require('./d3controls.js')
}	

		/* actions */
		var actions = d3lanesActions.ActionCreators

		/* store */
		var store = d3lanesStore.createStore(d3lanesReducer.reducer, d3lanesReducer.reducer())
			store.subscribe(store.compose(d3lanesComponentCourt.render, store.getState))
			store.subscribe(store.compose(d3lanesComponentLanes.render, store.getState))
			store.subscribe(store.compose(d3lanesComponentParticles.render, store.getState))	
			// store.subscribe(store.compose(d3lanesComponentRang.render, store.getState))

		/* container */
		var svgContainer = d3.select(store.getState().reducerConfig.containerElem)
			.selectAll('svg')
				.data(['svg'])		
		var svgContainerNew = svgContainer.enter()
			.append("svg")
				.attr("id", store.getState().reducerConfig.containerId)
				.style('width', store.getState().reducerCourt.svgWidth)
				.style('height', store.getState().reducerCourt.svgHeight)
				.style('background', 'oldlace')
				.attr('class', 'bar-chart')			// 
				.style('border', '1px solid darkgrey')
				.attr('viewbox',"0 0 3 2")										
				
		/* start keyboad controls - mode on arrows */
		d3lanesControls.kbdControls(store, d3.select('svg')).startKeybKeyEvents()

			var stopParticlesLauncher = store.compose(
				store.dispatch,
				actions.stopParticles
			)			
			var startParticlesLauncher = store.compose(
				store.dispatch,
				actions.startParticles
			)	
			var createParticlesPayload = function () { return {
						particlesPerTick: store.getState().reducerParticles.particlesPerTick,
						x: store.getState().reducerCourt.mousePos[0], 
						y: store.getState().reducerCourt.mousePos[1],
						xInit: store.getState().reducerCourt.leftBorder,
						xEnd: store.getState().reducerCourt.svgWidth, 
						randNormal: store.getState().reducerConfig.randNormal,
						randNormal2: store.getState().reducerConfig.randNormal2,
						lanes: store.getState().reducerLanes.lanes,
						generating: store.getState().reducerParticles.particlesGenerating,
			}}
			
			var createParticlesLauncher = store.compose(
				store.dispatch,
				actions.createParticles,
				createParticlesPayload
			)

			/* early particles */
			var initiateParticlesLauncher = store.compose(
				store.dispatch,
				actions.introduceParticles,
				createParticlesPayload
			)
			
			d3lanesControls.mouseDownControl(store)
					.subscribe(startParticlesLauncher)
					.subscribe(createParticlesLauncher)
						.start(d3.select('svg'))
	
			d3lanesControls.touchStartControl(store)
					.subscribe(startParticlesLauncher)
					.subscribe(createParticlesLauncher)
						.start(d3.select('svg'))
	
			d3lanesControls.mouseMoveControl(store)
					.subscribe(createParticlesLauncher)
						.start(d3.select('svg'))
	
			d3lanesControls.touchMoveControl(store)
					.subscribe(createParticlesLauncher)
						.start(d3.select('svg'))
	
			d3lanesControls.mouseUpControl(store)
					.subscribe(stopParticlesLauncher)
						.start(d3.select('svg'))
	
			d3lanesControls.touchEndControl(store)
					.subscribe(stopParticlesLauncher)
						.start(d3.select('svg'))
	
			d3lanesControls.mouseLeaveControl(store)
					.subscribe(stopParticlesLauncher)
						.start(d3.select('svg'))
	
		/* set messages on lanes */
		store.dispatch(actions.setRecordsCollection(
				store.getState().reducerConfig.messageCollection))
		store.dispatch(actions.setRecordsFetched(true))
		

		/* particles on tick */
		var tickParticlesPayload = function () { return {
				width: store.getState().reducerCourt.svgWidth,
				height: store.getState().reducerCourt.svgHeight,
				gravity: store.getState().reducerConfig.gravity,
				lanes: store.getState().reducerLanes.lanes
			}}
		var tickParticlesLauncher = store.compose(
				store.dispatch,
				actions.tickParticles,
				tickParticlesPayload
			)
		var ticker = d3lanesControls.tickControls(store)
		.subscribe(tickParticlesLauncher)
		.start()
		
		/* lanes on step  */
		var setRecordsPayload = function () { return {
				itemSpan: store.getState().reducerConfig.itemSpan,
				currentMode: store.getState().reducerCourt.currentMode
			}}
		var setRecordsLauncher = store.compose(
				store.dispatch,
				actions.setRecords,
				setRecordsPayload
			)								
		var walker = d3lanesControls.stepControls(store)
		.start()
	

		var dolanes = true
		if (dolanes) {
				walker.subscribe(setRecordsLauncher)
				walker.subscribe(initiateParticlesLauncher)
		}

					
					
					
					
					
					
		
			