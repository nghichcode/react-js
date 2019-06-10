MapSearch();
function MapSearch(){
  document.body.style = "overflow:hidden;";
  document.body.innerHTML = '<div id="googleMap" style="width:100%;height:99%;"></div>';
  var vnu = {lat:21.037843, lng:105.781418};
  var mapProp= {center:vnu,zoom:18,mapTypeControl:false,fullscreenControl:false,mapTypeId: 'satellite'};
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  // auto complete
  var divp = document.createElement("div");
  var cstyle =
  '<style>'+
    '#pac-card{text-align:center;margin:10px;box-shadow:0 2px 6px #9E9E9E;background-color:#fff;}'+
    '#title{text-align:center;margin:0;padding:4px;color:#fff;background-color:#4d90fe;}'+
    'body>div>#suggest,body>div>#suggest span{display:none;}'+
    '#pac-search{background-color:#fff;margin:5px;padding:0 12px;text-overflow:ellipsis;}'+
  '</style>';
  var pcard =
  '<div id="pac-card">'+
    '<h4 id="title">Autocomplete search</h4>'+
    '<input id="pac-search" type="text" placeholder="Enter a location">'+
  '</div>';
  var icontent =
  '<div id="suggest">'+
    '<img id="place-icon" src="" width="16" height="16" >'+
    ' <span id="place-name"></span><br/>'+
    ' <span id="place-address"></span><br/>'+
    '<span>Lat : </span><span id="place-lat"></span><br/>'+
    '<span>Lng : </span><span id="place-lng"></span>'+
  '</div>';
  divp.innerHTML=cstyle+pcard+icontent;
  document.body.appendChild(divp);

  var pacCard = document.getElementById('pac-card');
  var pacSearch = document.getElementById('pac-search');
  var suggest = document.getElementById('suggest');

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

    suggest.children['place-icon'].src = place.icon;
    suggest.children['place-name'].innerHTML = '<b>'+place.name+'</b>';
    suggest.children['place-address'].textContent = '';
    if (place.address_components) {
      suggest.children['place-address'].textContent = place.address_components.map(function(k,v){return k.long_name;} ).join(", ");
    }
    suggest.children['place-lat'].innerHTML = place.geometry.location.lat();
    suggest.children['place-lng'].innerHTML = place.geometry.location.lng();
    infoWindow.open(map, markerComplete);
  });
  // End auto complete
}