/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.40.js')
	var d3lanesComponentLanes = require('./d3lanes-component-lanes.js')
	var d3lanesComponentCourt = require('./d3lanes-component-court.js')
	var d3lanesComponentParticles = require('./d3lanes-component-particles.js')
	var d3lanesReducer = require('./d3lanes-reducer.js')
	var d3lanesStore = require('./d3lanes-store.js')
	var d3lanesActions = require('./d3lanes-actions.js')
	var d3lanesControls = require('./d3lanes-controls.js')
}	

		var store = d3lanesStore.createStore(d3lanesReducer.reducer, d3lanesReducer.reducer())
		store.subscribe(store.compose(d3lanesComponentCourt.render, store.getState))	
		store.subscribe(store.compose(d3lanesComponentLanes.render, store.getState))
		store.subscribe(store.compose(d3lanesComponentParticles.render, store.getState))	
		var actions = d3lanesActions.ActionCreators

		
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
				
		d3lanesControls.kbdControls(store, d3.select('svg')).startKeybKeyEvents()
		d3lanesControls.mouseControls(store).startMouseEvents(d3.select('svg'))

		store.dispatch(actions.setRecordsCollection(
				store.getState().reducerConfig.messageCollection))
		store.dispatch(actions.setRecordsFetched(true))
		
		// jff
		store.dispatch(actions.startParticles())
		store.dispatch(actions.createParticles({
				particlesPerTick: store.getState().reducerParticles.particlesPerTick * 5,
				x: store.getState().reducerCourt.svgWidth / 2, 
				y: store.getState().reducerCourt.svgWidth / 2,
				xInit: 0, 
				xEnd: store.getState().reducerCourt.svgWidth, 
				randNormal: store.getState().reducerConfig.randNormal,
				randNormal2:store.getState().reducerConfig.randNormal2,
				lanes: [],
		}))
		store.dispatch(actions.stopParticles())
		
		
		var ticker = d3lanesControls.tickControls(store)
		.subscribe(
			store.compose(
				store.dispatch,
				actions.tickParticles,
				function() { return {
											width: store.getState().reducerCourt.svgWidth,
											height: store.getState().reducerCourt.svgHeight,
											gravity: store.getState().reducerConfig.gravity,
											lanes: store.getState().reducerLanes.lanes
										}
									}
			))
		.start()
		
		var walker = d3lanesControls.stepControls(store)
		.subscribe(
			store.compose(
				store.dispatch,
				actions.setRecords,
				function() { return {
											itemSpan: store.getState().reducerConfig.itemSpan,
											currentMode: store.getState().reducerCourt.currentMode
										}
									}
			))
		.start()
			