import React, { Component } from 'react';
import { WebView, StyleSheet, Alert,View,Button,TouchableOpacity,Text } from 'react-native';
import { Constants, Permissions } from 'expo';

import MapSearch from './MapLibrary/map-search.js';
import MapDistance from './MapLibrary/map-distance.js';
import MapMarker from './MapLibrary/map-marker.js';

export default class MapWebView extends Component {
  constructor(props){
    super(props);
    this.webView = null;
    this.state = {wv:MapSearch};
  }

  // <Button buttonStyle={styles.btn} title="Search" onPress={() => {this.webView.injectJavaScript(MapSearch); }}/>
  // <Button buttonStyle={styles.btn} title="Distance" onPress={() => {this.webView.injectJavaScript(MapDistance); }}/>
  // <Button buttonStyle={styles.btn} title="Marker" onPress={() => {this.webView.injectJavaScript(MapMarker); }}/>
  onMessage = (e) => {
    const {error,message} = JSON.parse(e.nativeEvent.data);
    console.log(error);
    console.log(message);
    Alert.alert('OK','Distance: '+message);
  }
  render() {
    return (
      <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={() => {this.webView.injectJavaScript(MapSearch); }}>
          <Text style={styles.txt}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={() => {this.webView.injectJavaScript(MapDistance); }}>
          <Text style={styles.txt}>Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={() => {this.webView.injectJavaScript(MapMarker); }}>
          <Text style={styles.txt}>Marker</Text>
        </TouchableOpacity>
        </View>
        <WebView
        ref={ref => {this.webView = ref;}}
        source={{uri: 'https://google-developers.appspot.com/maps/documentation/javascript/examples/full/places-autocomplete-directions'}}
        style={{}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadEnd={(k)=>{this.webView.injectJavaScript(MapSearch);} }
        onMessage={this.onMessage}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode='always' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{flex:1,marginTop:Constants.statusBarHeight},
  btn:{width:'33%',backgroundColor: '#2196F3'},
  txt:{padding: 8,textAlign:'center',color:'#FFF',fontWeight:'bold'}
});