import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class MyMap extends Component {
  constructor(props){
    super(props);
    this.state = {mapRegion:null,hasLocationPermissions:false,locationResult:null};
  }

  componentDidMount() {this._getLocationAsync();}

  _handleMapRegionChange = mapRegion => {console.log(mapRegion);this.setState({ mapRegion });};

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({locationResult:'Permission to access location was denied',});
    } else {this.setState({ hasLocationPermissions:true });}
    console.log('this.state1');

    // let location = await Location.getCurrentPositionAsync({});
    console.log('this.state2');
    this.setState({ locationResult:'OKS' });
    // this.setState({ locationResult:JSON.stringify(location) });
    // this.setState({mapRegion:{ latitude:location.coords.latitude, longitude:location.coords.longitude, latitudeDelta:0.0922, longitudeDelta:0.0421 }});
    this.setState({mapRegion:{ latitude:21.037843, longitude:105.781418, latitudeDelta:0.0922, longitudeDelta:0.0421 }});
    // {lat:21.037843, lng:105.781418}
    console.log(this.state);
    console.log('this.state');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView style={{ alignSelf:'stretch', height:400 }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            />
        }
        <Text>Location:{this.state.locationResult}</Text>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',paddingTop:Constants.statusBarHeight,backgroundColor:'#ecf0f1'},
  paragraph:{margin:24,fontSize:18,fontWeight:'bold',textAlign:'center',color:'#34495e'}
});
