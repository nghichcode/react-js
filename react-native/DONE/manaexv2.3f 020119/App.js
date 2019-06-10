import React from 'react';
import {StackNavigator} from 'react-navigation';

import Home from './components/Home';
import CheckDetails from './components/CheckDetails';
import Details from './components/Details';
import Login from './components/demo2/Login';
import Account from './components/demo2/Account';
import Setting from './components/demo2/Setting';
import Description from './components/demo2/Description';
import Config from './components/demo2/Config';
import QRCamera from './components/demo2/QRCamera';

export default class App extends React.Component {
  render() { return (<HomePage/>); }
}

const HomePage = StackNavigator({
  Login: {screen: Login},
  Home: {screen: Home},
  Account: {screen: Account},
  CheckDetails:{screen: CheckDetails},
  Details: {screen: Details},
  Setting: {screen: Setting},
  Description: {screen: Description},
  Config: {screen: Config},
  QRCamera: {screen: QRCamera},
});