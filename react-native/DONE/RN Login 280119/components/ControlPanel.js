import * as React from 'react';
import { Constants } from 'expo';
import { Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import {DrawerNavigator} from 'react-navigation';

import CreateUser from './User/CreateUser';
import SearchUser from './User/SearchUser';
import CreateRole from './Role/CreateRole';
import SearchRole from './Role/SearchRole';
import Home from './Home';
// import Data from './MainDrawer.data';
var Data = [
  {id:'tracking',txt:'Tracking',l2Items:[
    {id:'tracking',txt:'Tracking',childs:[
      {nav:'Home',txt:'Search Tracking'},
    ]}
  ]},
  {id:'settings',txt:'Administration',l2Items:[
    {id:'user',txt:'USER',childs:[
      {nav:'CreateUser',txt:'Create User'},
      {nav:'SearchUser',txt:'Search User'},
    ]},
    {id:'role',txt:'ROLE',childs:[
      {nav:'CreateRole',txt:'Create Role'},
      {nav:'SearchRole',txt:'Search Role'}
    ]},
    {id:'none',txt:'NONE'}
  ]},
  {id:'groups',txt:'Process Management',l2Items:[
    {id:'role2',txt:'Role 2',childs:[
      {nav:'Home',txt:'Management'},
    ]},
    {id:'home',nav:'Home',txt:'Process'}
  ]},
  {id:'action',txt:'Action',l2Items:[
    {id:'home',nav:'Home',txt:'Home'}
  ]},
  {id:'other',nav:'Home',txt:'Other'},
  {id:'others',txt:'Others'}
];
// import MainDrawer from './MainDrawer';
class MainDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state={iteml2Index:-1,iteml1Index:-1,itemData:Data};
  }
  DrawL1(props,item,index){
    let activeItemKey = props.activeItemKey?props.activeItemKey:props.navigation.state.routes[props.navigation.state.index].key;
    if (!item.l2Items && item.nav) {return this.DrawChilds(props,item,activeItemKey==item.nav?true:false);}
    else if (!item.l2Items) {return ;}
    return(
      <View key={index}>
      <TouchableOpacity onPress={()=>{this.setState({iteml1Index:index});}}>
        <View style={[styles.RowExpand,styles.btnExpand,styles.BgExpand]}>
          <Text style={styles.inactiveTintColor}>{item.txt}</Text>
          <Icon name="ios-arrow-forward" size={20}/>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
  DrawL2(props,item,index){
    let activeItemKey = props.activeItemKey?props.activeItemKey:props.navigation.state.routes[props.navigation.state.index].key;
    if (!item.childs && item.nav) {return this.DrawChilds(props,item,activeItemKey==item.nav?true:false);}
    else if (!item.childs) {return;}
    return(
      <View key={index}>
      <TouchableOpacity
        onPress={()=>{this.setState({iteml2Index:this.state.iteml2Index===index?-1:index});}}>
        <View style={[styles.RowExpand,styles.btnExpand,styles.BgExpand]}>
          <Text style={styles.inactiveTintColor}>{item.txt}</Text>
          <Icon name={this.state.iteml2Index===index?"ios-arrow-down":"ios-arrow-forward"} size={20}/>
        </View>
      </TouchableOpacity>
      {(
        this.state.iteml2Index===index?
        item.childs.map( (it,i)=>( this.DrawChilds(props,it,activeItemKey==it.nav?true:false) ) )
        :null
      )}
      </View>
    );
  }
  DrawChilds(props,item,active) {return (
    <TouchableOpacity key={item.nav} onPress={()=>{
      this.props.navigation.navigate(item.nav,{userData:this.props.userData});
    }}>
      <View style={[styles.RowExpand,styles.btnExpand,active?styles.BgChild:styles.BgItem]}>
        <Text style={active?styles.activeTintColor:styles.inactiveTintColor}>{item.txt}</Text>
      </View>
    </TouchableOpacity>
  );}
  DrawBtnBack() {return (
  <TouchableOpacity
    onPress={()=>{this.setState({iteml2Index:-1,iteml1Index:-1});}}>
    <View style={[styles.RowExpand,styles.btnBack,styles.BgExpand]}>
      <Icon name="ios-arrow-back" size={20} style={styles.iconBtnBack}/>
      <Text style={styles.inactiveTintColor}>BACK</Text>
    </View>
  </TouchableOpacity>
  );}
  render(){
    return (<View style={{flex: 1,paddingTop: Constants.statusBarHeight}}>
      <Text style={{textAlign: 'center'}}>Menu Items</Text>
      <View style={{backgroundColor:'#FFF'}}>
        {(this.state.iteml1Index!=-1 && this.DrawBtnBack())}
        {(
          this.state.iteml1Index!=-1
            ?this.state.itemData[this.state.iteml1Index].l2Items.map( (it,i)=>(this.DrawL2(this.props,it,i)) )
            :this.state.itemData.map( (it,i)=>(this.DrawL1(this.props,it,i)) )
        )}
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  RowExpand: {
    flexDirection: 'row',alignItems: 'center',marginBottom:0,marginTop:0,
    paddingVertical: 12,paddingHorizontal: 12,borderBottomColor: '#F0F0F0',borderBottomWidth: 2
  },
  btnExpand:{justifyContent: 'space-between'},
  btnBack:{justifyContent: 'flex-start'},
  iconBtnBack: { paddingRight: 10 },
  activeTintColor: {fontWeight: 'bold',color:'#2196f3'},
  inactiveTintColor: {fontWeight: 'bold',color:'rgba(0, 0, 0, .87)'},
  BgExpand: {backgroundColor:'rgba(0,0,0,.2)'},
  BgChild: {backgroundColor:'rgba(0,0,0,.04)'},
  BgItem: {backgroundColor:'rgba(0,0,0,.08)'},
});

export default class ControlPanel extends React.Component {
  static navigationOptions = {headerStyle: {display: 'none'}};
  render() {
    const DrawerNavi = DrawerNavigator({
      Home: {screen: Home},
      CreateUser: {screen:CreateUser},
      SearchUser: {screen: SearchUser},
      CreateRole: {screen:CreateRole},
      SearchRole: {screen: SearchRole}
      }, {
      contentComponent: (propsc)=>(<MainDrawer userData={this.props.navigation.state.params.userData} {...propsc} ></MainDrawer>)
      // contentComponent: (props)=>(<MainDrawer userData={this.props.navigation.state.params.userData} {...props} ></MainDrawer>)
    });
    return (<DrawerNavi />);
  }
}
// console.log();