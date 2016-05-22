if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.40.js')
	}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesComponentCourt = global.d3lanesComponentCourt || {})));
}(this, function (exports) { 'use strict';

	function render(newState) {
		var state
		doRender(newState)

		function doRender(newState) {
			if (state === newState) return 
				state = newState
					
			var svgContainer = d3.select(state.configReducer.containerElem)
			.selectAll('svg')
				.data(['svg'])
			
			var svgContainerNew = svgContainer.enter()
				.append("svg")
					.attr("id", state.configReducer.containerId)
					.style('width', state.courtReducer.svgWidth)
					.style('height', state.courtReducer.svgHeight)
					.attr('class', 'bar-chart')			// 
					.style('border', '1px solid red')
					.style('color', 'blue')	
					.attr('viewbox',"0 0 3 2")										


			var svg = d3.select('svg')

			var itemsGroup = d3.select('svg')
				.selectAll('g.notices')		// items
				.data(['items'])
					
			itemsGroup.enter()	
				.append("g")
					.classed("notices", true)	// items
					
			// _________________________________ render Notice Update
				var errorNotice = (state.courtReducer.notice) ? state.courtReducer.notice : ""
				var noticeToShow = " " +
								"click mouse" + 
								" - " + state.configReducer.modeLabels[state.configReducer.modes[state.courtReducer.currentMode]] + 
								" - " + parseInt(svg.style("width")) + " x " + parseInt(svg.style("height")) +
								" - N: " + state.particlesReducer.particleIndex + 
								" fps: " + state.debugReducer.fps


				var winWidthPixels = parseInt(svg.style("width"))
				var winHeightPixels = parseInt(svg.style("height"))
				
				var fontSizeHw = 3 + "hw"
				var fontSize = winWidthPixels * 3/100
				var fontname = 'sans-serif'
						
				var c=document.createElement('canvas');
				var ctx=c.getContext('2d');
				ctx.font = fontSize + 'px ' + fontname;

				var noticeLength = ctx.measureText(noticeToShow).width
				
				var vlocation = winHeightPixels - fontSize
				var hlocation = winWidthPixels	- noticeLength

			 // items elems
				var itemsElems = svgContainer
					.select("g.notices")
						.selectAll("g.notice")
						.data([noticeToShow]);							
									
				// items elems enter
				var itemsElemsNew = itemsElems.enter()
						.append("g")
							.classed("notice", true)	
					
					itemsElemsNew.each(function(d, i) {
							var itemElemNew = d3.select(this)	
								.append("text")					
									.classed("info", true)
									.style("font-family", fontname)
									.attr("x", function(d) { 
											return hlocation; })
									.attr("y", function(d) { 							
											return vlocation
									})
									.style("font-size", function(d, i) {
											return fontSize
										})
									.text(function(d) { return d })
									.style("fill-opacity", 1)
							})
						
			// items elems update
					itemsElems
						.select('text')
							.text(function(d) { return d })
							.attr("x", function(d) { 
											return hlocation; })
							.attr("y", function(d) { 
											return vlocation; })

			// items elems exit
					itemsElems.exit()
						.select('text')
							.remove()					

		} // render
	}
	
	exports.render = render;
}))