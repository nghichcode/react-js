function myMap() {
	console.log('CALLME 1');
	document.body.innerHTML = '';
	document.body.innerHTML = '<h1>My First Google Map</h1>'+
		'<div id="googleMap" style="width:100%;height:600px;"></div>';
	var vnu = {lat:21.037843, lng:105.781418};
	var yho = {lat:21.037925, lng:105.780668};
	var mapProp= {center:vnu,zoom:15,};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	// Marker
	var mark= new google.maps.Marker({position:vnu,animation:google.maps.Animation.BOUNCE,map:map});
	//  Show lat long details
	var infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(ShowInfo(vnu, map.getZoom()));
  infoWindow.setPosition(vnu);
  infoWindow.open(map);

  map.addListener('zoom_changed', function() {
    infoWindow.setContent(ShowInfo(vnu, map.getZoom()));
    infoWindow.open(map);
  });
  // Goto CurrentPosition
	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    	cpos={lat:position.coords.latitude,lng:position.coords.longitude};
      infoWindow.setPosition(cpos);
      var mark= new google.maps.Marker({position:cpos,animation:google.maps.Animation.BOUNCE,map:map});
      infoWindow.open(map);
      map.setCenter(cpos);
    }, function() {locError(true, infoWindow, map.getCenter());});
  } else {locError(false, infoWindow, map.getCenter());}

  function locError(hasGeo, iw, pos) {
    iw.setPosition(pos);
    iw.setContent(hasGeo?'Error:The Geolocation service failed.' :'Error:Your browser doesn\'t support geolocation.');
    iw.open(map);
  }
	// Draw earthquake_GeoJSONP
  var sdata = document.createElement('script');
  sdata.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.head.appendChild(sdata);

	map.data.setStyle(function(feature) {
		var magnitude = feature.getProperty('mag');
		return {icon:getCircle(magnitude)};
	});
  function getCircle(magnitude) {
    return {
      path:google.maps.SymbolPath.CIRCLE,
      fillColor:'red',fillOpacity:.2,strokeColor:'white',strokeWeight:.5,
      scale:Math.pow(2, magnitude) / 2
    };
  }
  // Auto complete
  var divp = document.createElement("div");
  var cstyle = '<style>'+
	  '.pac-card{margin:10px 10px 0 0;border-width:8px;background-color:#CDDC39;padding:6px;}'+
  '</style>';
  var pcard =
	'<div class="pac-card" id="pac-card">'+
	  '<h3 id="title">Autocomplete search</h3>'+
	  '<div id="type-selector" class="pac-controls">'+
	    '<input type="radio" name="type" id="changetype-all" checked="checked"><label for="changetype-all">All</label>'+
	  '</div>'+
	  '<div id="pac-container"><input id="pac-input" type="text" placeholder="Enter a location"></div>'+
	'</div>';
	var icontent =
	'<div id="infowindow-content">'+
    '<img src="" width="16" height="16" id="place-icon">'+
    '<span id="place-name"  class="title"></span><br>'+
    '<span id="place-address"></span>'+
  '</div>';
	divp.innerHTML=cstyle+pcard+icontent;
	document.body.appendChild(divp);

	var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var types = document.getElementById('type-selector');
  var iwc = document.getElementById('infowindow-content');

	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
	
	var infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(iwc);
	var macp = new google.maps.Marker({map:map,anchorPoint:new google.maps.Point(0, -29)});

	autocomplete.addListener('place_changed', function() {
    infoWindow.close();
    macp.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {window.alert("No details for:'" + place.name + "'");return;}

    if (place.geometry.viewport) {map.fitBounds(place.geometry.viewport);}
    else {map.setCenter(place.geometry.location);map.setZoom(18);}
    macp.setPosition(place.geometry.location);
    macp.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    iwc.children['place-icon'].src = place.icon;
    iwc.children['place-name'].textContent = place.name;
    iwc.children['place-address'].textContent = address;
    infoWindow.open(map, macp);
  });
  // End auto complete
  console.log('CALLME 2');
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}
function ShowInfo(latLng, zoom) {
	return [
	  '<b>Info:</b>',
	  'Latitude :'+latLng.lat,
	  'Longitude :'+latLng.lng,
	  'Zoom level:' + zoom
	].join('<br>');
}
function mapCall() {
  console.log("OKKK");
}

// Create script
var key1 = 'AIzaSyA0x0g0fWswz2HZEStZmhEaDCZllLkLlBs';
var keystyle = 'AIzaSyDk4C4EBWgjuL1eBnJlu1J80WytEtSIags';
var keyntt = 'AIzaSyBszAVl97xw8vHCI8_EGFzgljX6UCGl2EA';
var keyfull = 'AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM';
var keyw3d = 'AIzaSyA3XfuMJJGzaU8TUItQM7XWD4esZdbpgtA';
var url = 'https://maps.googleapis.com/maps/api/js?key='+keyw3d+'&libraries=places&callback=AutocompleteDirect';
var node = document.createElement("script");node.setAttribute('src',url);
document.body.appendChild(node);
