import React, { Component } from 'react';
import { WebView, StyleSheet, Alert,View,Button } from 'react-native';
import { Constants, Permissions } from 'expo';

import MapSearch from './MapLibrary/map-search.js';
import MapDistance from './MapLibrary/map-distance.js';
import MapMarker from './MapLibrary/map-marker.js';

export default class MapSearchView extends Component {
  constructor(props){
    super(props);
    this.webView = null;
    this.state = {wv:null};
  }

  onMessage = (e) => {
    const {error,message} = JSON.parse(e.nativeEvent.data);
    console.log(error);
    console.log(message);
    Alert.alert('OK','Distance: '+message);
  }
  static navigationOptions = {title:'Login',header:null};
  render() {
    return (
  <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
  <Button title="DISTANCE" onPress={() => {this.props.navigation.navigate('MapWebView')}}/>
        <WebView
        ref={ref => {this.webView = ref;}}
        source={{uri: 'https://google-developers.appspot.com/maps/documentation/javascript/examples/full/places-autocomplete-directions'}}
        style={{}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadEnd={(k)=>{this.webView.injectJavaScript(searchAddress);} }
        onMessage={this.onMessage}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode='always' />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{flex:1,marginTop:Constants.statusBarHeight}
});