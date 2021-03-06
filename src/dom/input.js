/**
 * @fileoverview mouse input implementation
 * 
 * @author Tony Parisi
 */

goog.provide('glam.DOMInput');

glam.DOMInput = {};

glam.DOMInput.add = function(docelt, obj) {
	
	function addListener(picker, evt) {
		picker.addEventListener(evt, function(event){
			var domEvent = new CustomEvent(
					evt, 
					{
						detail: {
						},
						bubbles: true,
						cancelable: true
					}
				);
			for (var propName in event) {
				if (domEvent[propName] === undefined) {
					domEvent[propName] = event[propName];					
				}
				else {
					; // console.log("Skipping prop", propName);					
				}
			}
			var res = docelt.dispatchEvent(domEvent);
			
		});
	}
	
	var picker = new glam.Picker;
	
	var events = ["click", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove",
		"touchstart", "touchend"];
	for (var index in events) {
		var evt = events[index];
		addListener(picker, evt);
	}
		
	obj.addComponent(picker);

	var viewpicker = new glam.ViewPicker;
	obj.addComponent(viewpicker);
	addListener(viewpicker, "viewover")
	addListener(viewpicker, "viewout");
}
