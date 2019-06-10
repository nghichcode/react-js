import React from 'react';
import { Text,View,StyleSheet } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';

import Data from './models/Data';
import CustInfor from './CustInfor';

export default class Details extends React.Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {sb:"", db:Data, err:false};
  }

  render() {
    const qrdata = this.props.navigation.getParam('qrdata',0);
    const {navigate} = this.props.navigation;
    return (
    <View style={styles.container}>
      <CustInfor navigation={this.props.navigation} />
      <View style={styles.content}>
        <View style={{flex:3, paddingTop: 3}}>
          <Text style={{display: this.state.err? 'none':'flex'}}>So BB kiem dem:</Text>
          <Text style={{display: this.state.err? 'none':'flex',fontWeight: 'bold'}}>{this.state.err? 0:qrdata.data}</Text>
          <Text style={{display: this.state.err? 'flex':'none'}}>Hay quet san pham de kiem dem!</Text>
        </View>
        <View style={{flex:9}}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={['SP', 'TT', 'Da nhat', 'KH']} style={styles.head} textStyle={styles.text}/>
            <Rows data={this.state.db} textStyle={styles.text}/>
          </Table>
        </View>
      </View>
      <View style={styles.btn}>
        <View style={styles.font}><FontAwesome name="cog" size={50} /></View>
        <View style={styles.font}><FontAwesome name="barcode" size={50} /></View>
        <View style={styles.font}><FontAwesome name="angle-double-left" size={50} onPress={()=>this.props.navigation.goBack()}/></View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: '#FFFFFF',paddingTop: 5, paddingLeft:5, paddingRight:5},
  content: {flex: 9, backgroundColor: '#FFF'},
  btn:{bottom: 10,marginLeft:20,marginRight:20,
    display: 'flex',flexDirection:'row',alignItems: 'center',justifyContent:'space-around'
  },
  font:{borderWidth:1,paddingRight:27,paddingLeft:27,paddingTop:5,paddingBottom:5}
});