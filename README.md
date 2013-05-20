LeafletSlider
=============

The [Leaflet](http://leafletjs.com/) Time-Slider enables you to dynamically add and remove Markers on a map by using a [JQuery UI slider
](http://jqueryui.com/slider/).


Usage
-----
Add: 
* ``SliderControl.js`` 
* [JQuery](http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js) 
* [JQueryUI - CSS](http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css)
* [JQueryUI - JS](http://code.jquery.com/ui/1.9.2/jquery-ui.js)

to your normal Leaflet map.




To enable the Slider you have to pass in a layer to the SliderControl, add the Slider.
The Control has to be initialized by using the method startSlider(); on the control.

```javascript
//Create a marker layer (in the example done via a GeoJSON FeatureCollection)
testlayer = L.geoJson(json);
sliderControl = new SliderControl({position: "topright", layer: testlayer});
		
//Make sure to add the slider to the map ;-)
map.addControl(sliderControl);

//An initialize the slider
sliderControl.startSlider();
````
