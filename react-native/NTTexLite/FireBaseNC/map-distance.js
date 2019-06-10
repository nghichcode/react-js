document.body.style = "overflow:hidden;";
document.body.innerHTML = '<div id="googleMap" style="width:100%;height:99%;"></div>';
var divp = document.createElement("div");
var pstyle = 
	'<style>'+
		'#origin,#destination{background-color:#fff;font-size:15px;margin:0px 0 5px 5px;padding:5px;width:260px;}'+
		'#mode-selector{color:#fff;background-color:#4d90fe;margin:5px;padding:8px 10px;width: 260px;}'+
	'</style>';
var div2push =	
  '<input id="origin" class="controls" type="text" placeholder="Origin location">'+
  '<input id="destination" class="controls" type="text" placeholder="Destination location">'+
  '<div id="mode-selector" class="controls">'+
    '<input type="radio" name="type" id="mwalking" checked="checked"><span>Walking</span>'+
    '<input type="radio" name="type" id="mtransit"><span>Transit</span>'+
    '<span><input type="radio" name="type" id="mdriving">Driving</span>'+
  '</div>';
divp.style="display:none;"
divp.innerHTML=pstyle+div2push;
document.body.appendChild(divp);
MapDistance();
function MapDistance() {
	var vnu = {lat:21.037843, lng:105.781418};
	var mapProp= {center:vnu,zoom:18,mapTypeControl:false,fullscreenControl:false,mapTypeId: 'satellite'};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'WALKING';
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);
  var me = this;
  // FUNC
	this.setClick = function (id, mode) {
	  var radioButton = document.getElementById(id);
	  radioButton.addEventListener('click', function() {me.travelMode = mode;me.route();});
	};
	this.setPlaceChange = function(autocomplete, mode) {
	  autocomplete.bindTo('bounds', this.map);
	  autocomplete.addListener('place_changed', function() {
	    var place = autocomplete.getPlace();
	    if (!place.place_id) {console.log('Please select an option from the dropdown list.');return;}
	    console.log(mode);
	    if (mode === 'ORIG') {me.originPlaceId = place.place_id;}
	    else {me.destinationPlaceId = place.place_id;}
	    me.route();
	  });
	};
	this.route = function() {
	  if (!this.originPlaceId || !this.destinationPlaceId) {return;}
	  this.directionsService.route(
	    {origin:{'placeId':this.originPlaceId},destination:{'placeId':this.destinationPlaceId},travelMode:this.travelMode},
	    function(response, status) {
	    	const discalc=response.routes[0].legs[0].distance.value+' m';
				console.log(discalc);
				window.postMessage(JSON.stringify({error: false,message: discalc}));
	      if (status === 'OK') {me.directionsDisplay.setDirections(response);}
	      else {console.log('Directions request failed due to ' + status);}
    });
	};
  // FUNC
  setClick('mwalking', 'WALKING');
  setClick('mtransit', 'TRANSIT');
  setClick('mdriving', 'DRIVING');

	var orig = document.getElementById('origin');
	var dest = document.getElementById('destination');
	var mode = document.getElementById('mode-selector');
	//google.maps.ControlPosition
  this.map.controls[5].push(mode);
  this.map.controls[5].push(orig);
  this.map.controls[5].push(dest);
	var origAuto = new google.maps.places.Autocomplete(orig);origAuto.setFields(['place_id']);
	var destAuto =new google.maps.places.Autocomplete(dest);destAuto.setFields(['place_id']);

  setPlaceChange(origAuto, 'ORIG');
  setPlaceChange(destAuto, 'DEST');
}