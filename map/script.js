
// Load the geojson data from a file
var geoJsonData;
$.getJSON('countries.geojson', function(data) {
    geoJsonData = data;

// Load the map 
var map = L.mapbox.map('map', 'robertocarroll.g9m2cn4j', {

    center: [25, -15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
    maxBounds: [[-85, -180.0],[85, 180.0]],

    gridLayer: {},
    // This line redefines part of the underlying code which
    // sanitizes HTML from MapBox Hosting. The original code is there
    // for the protection of sites, so that malicious map-creators
    // can't add cross-site scripting attacks to sites that use their
    // maps.
    // Turning it off allows any content to be available in tooltips.
    // It's recommended to only with trusted maps.
    gridControl: {
        sanitizer: function (x) { return x; }
    }
});

// Add a marker layer
var countries = L.mapbox.markerLayer();

function getColor(d) {
     return d > 1000 ? '#FF6600' :
           d > 100   ? '#FFCC00' :
                      '#ff0000';
}

function style(feature) {
    return {
        fillColor: getColor(feature.status),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

var geojson;

geojson = L.geoJson(geoJsonData, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(geoJsonData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


// Listen for individual marker clicks
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());

}

geojson.on('click',function (e) {

  var details = e.layer.feature;
                
  var info =  details.details;

 document.getElementById('info').innerHTML = info;

});

}); // close the loading of the geojson 


 