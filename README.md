LeafletSlider
=============

The [Leaflet](http://leafletjs.com/) Time-Slider enables you to dynamically add and remove Markers on a map by using a [JQuery UI slider
](http://jqueryui.com/slider/).


Check out the [Demo](http://dwilhelm89.github.io/LeafletSlider/)!


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
var testlayer = L.geoJson(json);
var sliderControl = L.control.sliderControl({position: "topright", layer: testlayer});
		
//Make sure to add the slider to the map ;-)
map.addControl(sliderControl);

//And initialize the slider
sliderControl.startSlider();
````

Adjust the used time property so that it fits your project:
```javascript
$('#slider-timestamp').html(options.markers[ui.value].feature.properties.time.substr(0, 19));
````

You can also use a range-slider by using the range property:
```javascript
sliderControl = L.control.sliderControl({position: "topright", layer: testlayer, range: true});
````

The Leaflet Slider can also be used for usual LayerGroups with mixed features (Markers and Lines, etc.)
```javascript
var marker1 = L.marker([51.5, -0.09]);
var marker2 = L.marker([51.6, -0.09]);
var marker3 = L.marker([51.7, -0.09]);
var marker4 = L.marker([51.8, -0.09]);
	
var pointA = new L.LatLng(51.8, -0.09);
var pointB = new L.LatLng(51.9, -0.2);
var pointList = [pointA, pointB];

var polyline = new L.Polyline(pointList, {
	color: 'red',
	weight: 3,
	opacity: 1,
	smoothFactor: 1
});
		
		
layerGroup = L.layerGroup([marker1, marker2, marker3, marker4, polyline ]);
var sliderControl = L.control.sliderControl({layer:layerGroup});
map.addControl(sliderControl);
sliderControl.startSlider();
````

For touch support add:
```javascript
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
````

Bower
----
Leaflet Slider is also a registered package in [Bower](http://bower.io/) (based on [nodejs](http://nodejs.org/)). Integrate the source in your project with:
```
npm install -g bower
bower install leaflet-slider
```




Author
-----
Dennis Wilhelm, 2013
