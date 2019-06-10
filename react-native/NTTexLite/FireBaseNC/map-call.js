	document.body.innerHTML = '<div id="googleMap" style="width:100%;height:600px;"></div>';
	var vnu = {lat:21.037843, lng:105.781418};
	var mapProp= {center:vnu,zoom:18};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	// auto complete
  var divp = document.createElement("div");
  var cstyle =
  '<style>'+
	  '#pac-card{margin:10px;box-shadow:0 2px 6px #9E9E9E;background-color:#fff;}'+
    '#title{text-align:center;margin:0;padding:8px 0;color:#fff;background-color:#4d90fe;}'+
    '.mode{margin:8px;text-align:center;}'+
    '.mode span{background-color:#2196F3;color:white;margin:6px;padding:4px 10px;border-radius:5px;cursor:pointer;}'+
    '.mode-body input[type="text"]{background-color:#fff;margin:5px;padding:0 12px;text-overflow:ellipsis;width:280px;}'+
    '.mode-body .ihide,.ihide,.ihide div,.ihide input{display:none;}'+
  '</style>';
  var iMode=
    '<div id="div-search"><input id="pac-search" type="text" placeholder="Enter a location"></div>'+
  	'<div id="div-distance" class="ihide">'+
      '<div id="div-selector">'+
        '<input type="radio" name="type" id="changemode-walking" checked="checked">Walking'+
        '<input type="radio" name="type" id="changemode-transit">Transit'+
        '<input type="radio" name="type" id="changemode-driving">Driving'+
      '</div>'+
      '<input id="dfrom" type="text" placeholder="From"><br/>'+
    	'<input id="dto" type="text" placeholder="To">'+
    '</div>';
  var pcard =
	'<div class="pac-card" id="pac-card">'+
	  '<h1 id="title">Autocomplete search</h1>'+
	  '<div class="mode"><span id="mode-search">Search</span><span id="mode-distance">Calc Distance</span></div>'+
	  '<div id="mode-body" class="mode-body" style="padding:1px 8px;position: relative;">'+iMode+'</div>'+
	'</div>';
	var icontent =
	'<div id="infowindow-content">'+
    '<img src="" width="16" height="16" id="place-icon">'+
    '<span id="place-name" class="title"></span><br>'+
    '<span id="place-address"></span>'+
  '</div>';
	divp.innerHTML=cstyle+pcard+icontent;
	document.body.appendChild(divp);

	var pacCard = document.getElementById('pac-card');
  var pacSearch = document.getElementById('pac-search');
  var pacDfrom = document.getElementById('dfrom');
  var pacDto = document.getElementById('dto');
  var types = document.getElementById('type-selector');
  var suggest = document.getElementById('infowindow-content');

  var mbody = document.getElementById('mode-body');
  var ms = document.getElementById('mode-search');
  var md = document.getElementById('mode-distance');

	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(pacCard);
  var completeSearch = new google.maps.places.Autocomplete(pacSearch);
  completeSearch.bindTo('bounds', map);
  completeSearch.setFields(['address_components', 'geometry', 'icon', 'name']);
	
	var infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(suggest);

	var markerComplete = new google.maps.Marker({map:map,animation:google.maps.Animation.BOUNCE});

	completeSearch.addListener('place_changed', function() {
    infoWindow.close();
    markerComplete.setVisible(false);
    var place = completeSearch.getPlace();
    if (!place.geometry) {console.log("No details for:'" + place.name + "'");return;}
    if (place.geometry.viewport) {map.fitBounds(place.geometry.viewport);}
    else {map.setCenter(place.geometry.location);map.setZoom(18);}
    
    markerComplete.setPosition(place.geometry.location);
    markerComplete.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    suggest.children['place-icon'].src = place.icon;
    suggest.children['place-name'].textContent = place.name;
    suggest.children['place-address'].textContent = address;
    infoWindow.open(map, markerComplete);
  });

  var completeFrom = new google.maps.places.Autocomplete(pacDfrom);
  var completeTo = new google.maps.places.Autocomplete(pacDto);
	// End auto complete
	// Switch Mode
  ms.onclick=function() {
    document.getElementById('div-distance').className='ihide';
    document.getElementById('div-search').className='';
  }
  md.onclick=function() {
    document.getElementById('div-search').className='ihide';
    document.getElementById('div-distance').className='';
  }
	// End Switch Mode

