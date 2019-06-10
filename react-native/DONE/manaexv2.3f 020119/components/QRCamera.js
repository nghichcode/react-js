import * as React from 'react';
import { Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Camera,Permissions,BarCodeScanner } from 'expo';
import {FontAwesome} from '@expo/vector-icons';

export default class QRCamera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      scanned: true
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  Flip(){
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front:Camera.Constants.Type.back,
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const params = this.props.navigation.getParam("userData",false);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{flex:1}}>
          <Camera style={{flex:2}} type={this.state.type}
            barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]}}
            onBarCodeScanned={ (d)=>{
              if (this.state.scanned) navigate('Details',{userData:params,qrdata:d});
              this.setState({scanned:false});
            }}>
              <View style={styles.touchView} >
                <View style={styles.rotateBtn}>
                  <FontAwesome name="refresh" size={50} onPress={()=>this.Flip()}/>
                </View>
              </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  touchView:{marginBottom:10, marginTop:10,display:'flex',flex:1,flexDirection:'column-reverse',alignItems:'center'},
  rotateBtn:{borderWidth:1,paddingRight:20,paddingLeft:20,paddingTop:5,paddingBottom:5}
});