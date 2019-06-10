import React from 'react';
import {StackNavigator} from 'react-navigation';

import Login from './components/Login';
import ControlPanel from './components/ControlPanel';
// import CreateUser from './components/User/CreateUser';

export default class App extends React.Component {
  render() { return (<HomePage/>); }
}

const HomePage = StackNavigator({
  Login: {screen: Login},
  ControlPanel: {screen: ControlPanel}
});