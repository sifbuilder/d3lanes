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
		
		var svgContainer = d3.select(store.getState().configReducer.containerElem)
			.selectAll('svg')
				.data(['svg'])		
		var svgContainerNew = svgContainer.enter()
			.append("svg")
				.attr("id", store.getState().configReducer.containerId)
				.style('width', store.getState().courtReducer.svgWidth)
				.style('height', store.getState().courtReducer.svgHeight)
				.style('background', 'oldlace')
				.attr('class', 'bar-chart')			// 
				.style('border', '1px solid darkgrey')
				.attr('viewbox',"0 0 3 2")										
				
		d3lanesControls.kbdControls(store, d3.select('svg')).startKeybKeyEvents()
		d3lanesControls.mouseControls(store).startMouseEvents(d3.select('svg'))

		store.dispatch(actions.setRecordsCollection(
				store.getState().configReducer.messageCollection))
		store.dispatch(actions.setRecordsFetched(true))
		
		// jff
		store.dispatch(actions.startParticles())
		store.dispatch(actions.createParticles({
				particlesPerTick: store.getState().particlesReducer.particlesPerTick * 5,
				x: store.getState().courtReducer.svgWidth / 2, 
				y: store.getState().courtReducer.svgWidth / 2,
				xInit: 0, 
				xEnd: store.getState().courtReducer.svgWidth, 
				randNormal: store.getState().configReducer.randNormal,
				randNormal2:store.getState().configReducer.randNormal2,
				lanes: [],
		}))
		store.dispatch(actions.stopParticles())
		
		
		var ticker = d3lanesControls.tickControls(store)
		.subscribe(
			store.compose(
				store.dispatch,
				actions.tickParticles,
				function() { return {
											width: store.getState().courtReducer.svgWidth,
											height: store.getState().courtReducer.svgHeight,
											gravity: store.getState().configReducer.gravity,
											lanes: store.getState().lanesReducer.lanes
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
											itemSpan: store.getState().configReducer.itemSpan,
											currentMode: store.getState().courtReducer.currentMode
										}
									}
			))
		.start()
			