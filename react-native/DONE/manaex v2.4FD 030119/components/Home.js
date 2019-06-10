import React from 'react';
import { Text,View,StyleSheet,TouchableHighlight } from 'react-native';
import CustInfor from './CustInfor'

export default class Home extends React.Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    const selectData = {
      act1: [
        {scr:'',txt:'Nhập hàng'},
        {scr:'',txt:'Xuất hàng'},
        {scr:'',txt:'Kiểm kho'},
        {scr:'',txt:'Chuyển vị trí'},
        {scr:'',txt:'Bao hàng lỗi'},
        {scr:'',txt:'Đóng gói'},
        {scr:'',txt:'Đóng gói trong kho'},
        {scr:'',txt:'Đổi tính chất'},
        {scr:'CheckDetails',txt:'Kiểm đếm'}
      ],
      act2: [
        {scr:'',txt:'Tìm kiếm vị trí'}
      ]
    };
    this.state = {sdata:selectData};
  }

  render() {
    const {navigate} = this.props.navigation;
    const params = this.props.navigation.getParam("userData",false);
    return (
      <View style={styles.container}>
        <CustInfor navigation={this.props.navigation} />
        <View style={styles.content}>
          <Text style={{backgroundColor: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>Hoạt Động</Text>
          <View style={{paddingTop: 2, marginBottom: 2}}>
            {this.state.sdata.act1.map((item, index)=>{return(
            <TouchableHighlight key={index} underlayColor='#bdb4b4' style={styles.buttonItem}
              onPress={ ()=>{ if (item.scr!='') navigate(item.scr,{userData:params} );} } >
              <Text>{index}. {item.txt}</Text>
            </TouchableHighlight>
            ); } )}
          </View>
          <Text style={{backgroundColor: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>Hoạt Động</Text>
          <View style={{paddingTop: 2, marginBottom: 2}}>
            {this.state.sdata.act2.map((item, index)=>{return(
            <TouchableHighlight key={index} underlayColor='#bdb4b4' style={styles.buttonItem}
              onPress={ ()=>{ if (item.scr!='') navigate(item.scr,{userData:params} );} } >
              <Text>{index}. {item.txt}</Text>
            </TouchableHighlight>
            ); } )}
          </View>          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonItem: {backgroundColor: '#FFF', paddingBottom:1,borderBottomWidth: 2, borderColor: '#000'},
  content: {flex: 9, backgroundColor: '#FFF'},
  container:{flex: 1,justifyContent: 'center',backgroundColor: '#FFFFFF',paddingTop: 5, paddingLeft:5, paddingRight:5}
});