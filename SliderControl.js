L.Control.SliderControl = L.Control.extend({
    options: {
        position: 'topright',
        layers: null,
        maxValue: -1,
        minValue: -1,
        markers: null,
        range: false,
        follow: false
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._layer = this.options.layer;

    },

    setPosition: function (position) {
        var map = this._map;

        if (map) {
            map.removeControl(this);
        }

        this.options.position = position;

        if (map) {
            map.addControl(this);
        }
        this.startSlider();
        return this;
    },

    onAdd: function (map) {
        this.options.map = map;

        // Create a control sliderContainer with a jquery ui slider
        var sliderContainer = L.DomUtil.create('div', 'slider', this._container);
        $(sliderContainer).append('<div id="leaflet-slider" style="width:200px"><div class="ui-slider-handle"></div><div id="slider-timestamp" style="width:200px; margin-top:13px; background-color:#FFFFFF; text-align:center; border-radius:5px;"></div></div>');
        //Prevent map panning/zooming while using the slider
        $(sliderContainer).mousedown(function () {
            map.dragging.disable();
        });
        $(document).mouseup(function () {
            map.dragging.enable();
            //Only show the slider timestamp while using the slider
            $('#slider-timestamp').html('');
        });

        var options = this.options;
        this.options.markers = [];

        //If a layer has been provided: calculate the min and max values for the slider
        if (this._layer) {
            this._layer.eachLayer(function (layer) {
                if (options.minValue === -1) {
                    options.minValue = layer._leaflet_id;
                }
                options.maxValue = layer._leaflet_id;
                options.markers[layer._leaflet_id] = layer;
            });
            this.options = options;
        } else {
            console.log("Error: You have to specify a layer via new SliderControl({layer: your_layer});");
        }
        return sliderContainer;
    },

    onRemove: function (map) {
        //Delete all markers which where added via the slider and remove the slider div
        for (i = this.options.minValue; i < this.options.maxValue; i++) {
            map.removeLayer(this.options.markers[i]);
        }
        $('#leaflet-slider').remove();
    },

    startSlider: function () {
        _options = this.options;
        $("#leaflet-slider").slider({
            range: _options.range,
            value: _options.minValue + 1,
            min: _options.minValue,
            max: _options.maxValue +1,
            step: 1,
            slide: function (e, ui) {
                var map = _options.map;
                if(!!_options.markers[ui.value]) {
                    // If there is no time property, this line has to be removed (or exchanged with a different property)
                    if(_options.markers[ui.value].feature !== undefined) {
                        if(_options.markers[ui.value].feature.properties.time){
                            if(_options.markers[ui.value]) $('#slider-timestamp').html(_options.markers[ui.value].feature.properties.time.substr(0, 19));
                        }else {
                            console.error("You have to have a time property");
                        }
                    }else {
                        // set by leaflet Vector Layers
                        if(_options.markers [ui.value].options.time){
                            if(_options.markers[ui.value]) $('#slider-timestamp').html(_options.markers[ui.value].options.time.substr(0, 19));
                        }else {
                            console.error("You have to have a time property");
                        }
                    }
                    
                    var i;
                    if(_options.range){
                        // jquery ui using range
                        for (i = ui.values[0]; i <= ui.values[1]; i++){
                           if(_options.markers[i]) map.addLayer(_options.markers[i]);
                        }
                        for (i = _options.maxValue; i > ui.values[1]; i--) {
                            if(_options.markers[i]) map.removeLayer(_options.markers[i]);
                        }
                        for (i = _options.minValue; i < ui.values[0]; i++) {
                            if(_options.markers[i]) map.removeLayer(_options.markers[i]);
                        }
                    }else if(_options.follow){
                        for (i = _options.minValue; i < (ui.value - _options.follow); i++) {
                            if(_options.markers[i]) map.removeLayer(_options.markers[i]);
                        }
                        for (i = (ui.value - _options.follow); i < ui.value ; i++) {
                            if(_options.markers[i]) map.addLayer(_options.markers[i]);
                        }
                        for (i = ui.value; i <= _options.maxValue; i++) {
                            if(_options.markers[i]) map.removeLayer(_options.markers[i]);
                        }
                    }else{
                        // jquery ui for point before
                        for (i = _options.minValue; i <= ui.value ; i++) {
                            if(_options.markers[i]) map.addLayer(_options.markers[i]);
                        }
                        for (i = (ui.value + 1); i <= _options.maxValue; i++) {
                            if(_options.markers[i]) map.removeLayer(_options.markers[i]);
                        }
                    }
                }
            }
        });
        _options.map.addLayer(_options.markers[_options.minValue]);
    }
});

L.control.sliderControl = function (options) {
    return new L.Control.SliderControl(options);
};