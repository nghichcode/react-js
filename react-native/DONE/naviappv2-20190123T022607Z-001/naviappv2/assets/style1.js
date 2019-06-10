import {StyleSheet} from 'react-native' 
import { Constants } from 'expo';

export default StyleSheet.create({
  container:{flex: 1,paddingTop: Constants.statusBarHeight},
  customDrawerIcon: { paddingRight: 10, color:'#fff' },
  expandButtonRow: {flexDirection: 'row',paddingVertical: 12,paddingLeft: 3},
  btnExpand:{justifyContent: 'space-between'},
  activeTintColor: {paddingLeft:100, color:"#fff", fontWeight:'bold'},
  activeBackgroundColor: {backgroundColor:'rgba(0, 0, 0, .04)'},
  inactiveTintColor: {fontWeight: 'bold',color:'#fff', paddingLeft:20},
  inactiveBackgroundColor: {backgroundColor:'gray'}
});