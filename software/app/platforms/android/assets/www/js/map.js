/**
 * Created by Ricardo on 03/06/2016.
 */
var mymap = L.map('mapid').setView([-22.242285, -45.929177], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmljYXJkby1mYXJpYSIsImEiOiJjaXB4ZXA2ZXkwd3FyZmptMm4zZ3JnOGI4In0.Md-nC4l8kf5vwur-fDJPJg',{
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);
