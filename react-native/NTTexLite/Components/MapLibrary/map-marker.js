const MapMarker =`
MapMarker();
function MapMarker() {
  document.body.style = "overflow:hidden;";
  document.body.innerHTML = '<div id="googleMap" style="width:100%;height:99%;"></div>';
  var vnu = {lat:21.037843, lng:105.781418};
  var mapProp= {center:vnu,zoom:18,mapTypeControl:false,fullscreenControl:false,mapTypeId: 'satellite'};
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var marker=new google.maps.Marker({position: vnu,animation:google.maps.Animation.BOUNCE});marker.setMap(map);
  google.maps.event.addListener(map, 'click', function(e) {placeMarker(e.latLng, map);marker.setMap(null);});

}

var infowindow = null;
var marker = null;
function placeMarker(location, map) {
  if (infowindow) infowindow.close();
  if(marker) marker.setMap(null);
  marker = new google.maps.Marker({position: location,map: map});

  infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() +
    '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
}
`;
export default MapMarker;