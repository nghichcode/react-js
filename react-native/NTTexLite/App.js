import React from 'react';
import {StackNavigator} from 'react-navigation';

import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';

// import MyMap from './Components/MyMap';
// import MapDistanceView from './Components/MapDistanceView';
// import MapMarkerView from './Components/MapMarkerView';
// import MapSearchView from './Components/MapSearchView';
import MapWebView from './Components/MapWebView';

export default class App extends React.Component {
  render() {
    return (<MapWebView />);
  }
}

// const HomePage = StackNavigator({
//   Login: {screen: Login},
//   Register: {screen: Register},
//   Profile: {screen: Profile},
//   Update: {screen: UpdateProfile}
// });

// const HomePage = StackNavigator({
//   MapDistanceView:{screen: MapDistanceView},
//   MapMarkerView:{screen: MapMarkerView},
//   MapSearchView:{screen: MapSearchView}
// });