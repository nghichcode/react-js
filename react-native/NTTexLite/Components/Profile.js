import React from 'react';
import { Text,View,StyleSheet,TouchableHighlight,Image,Alert,TextInput } from 'react-native';
import firebconfig from './FirebaseConfig';
import * as firebaselg from 'firebase';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    var naData = props.navigation.state.params;
    var displayName;
    var photoURL;
    if ( naData && naData.userData ){
      naData = naData.userData;
      displayName= naData.displayName;
      photoURL= naData.photoURL
    }
    this.state = {isUpdate:false,displayName,photoURL};
  }

  DoSendEmail(auth){
    var user = auth.currentUser;
    user.sendEmailVerification().then(function(){
      console.log("Send successful!!!");
    }).catch(function(error){console.log(error.message);});
  }
  DoUpdate(auth){
    var user = auth.currentUser;
    var self=this;
    if(!self.state.isUpdate) {
      self.setState({isUpdate:true});return;
    }
    // self.setState({isUpdate:false});return;
    user.updateProfile({displayName:this.state.displayName,photoURL:this.state.photoURL})
    .then(function() {
      console.log('Update OK');
      self.setState({isUpdate:false});
    }).catch(function(error) {Alert.alert('ErrrUp');});
  }
  DoLogout(auth){
    var self=this;
    auth.signOut().then(function() {
      console.log('Logout Successful');
      self.props.navigation.goBack();
    }).catch(function(error) {
      console.log('Logout error.');
    });
  }

  render() {
    var naData = this.props.navigation.state.params;
    if ( naData && naData.userData ){
      naData = naData.userData;
    } else if (typeof this.props.navigation.getParam !== 'undefined' ) {
      naData=this.props.navigation.getParam('userData',{
        uid:'',creationTime:'',email:'',emailVerified:'',
        displayName:'',photoURL:'',lastLogin:''
      });
    } else {return;}
    // uid,creationTime,email,emailVerified,displayName,photoURL,lastLogin
    
    return (
    <View style={{flex:1,marginHorizontal:10}}>
      <View style={{flex:4,top: 30,position:'absolute',flexWrap: 'wrap'}}>
        <Text style={{marginLeft:20,fontSize: 20,color: 'red'}}>Info User:</Text> 
      </View>
      <View style={{flex: 5,justifyContent: 'center'}}>
        <View style={styles.row}>
          <View style={styles.title}><Text>Display Name :</Text></View>
          {this.state.isUpdate?
          (<TextInput style={[styles.tbody,styles.input]} placeholder='Edit Display Name'
            defaultValue={naData.displayName} placeholderTextColor='#6f6f6f'
            onChangeText={(displayName) => this.setState({displayName}) }/>)
          :(<View style={styles.tbody}><Text style={{fontWeight:'bold'}}>{this.state.displayName || 'Unknow'}</Text></View>)
          }
        </View>
        <View style={styles.row}>
          <View style={styles.title}><Text>PhotoURL :</Text></View>
          {this.state.isUpdate?
          (<TextInput style={[styles.tbody,styles.input]} placeholder='Edit Photo URL'
            defaultValue={naData.photoURL} placeholderTextColor='#6f6f6f'
            onChangeText={(photoURL) => this.setState({photoURL}) }/>)
          :(<View style={styles.tbody}><Text style={{fontWeight:'bold'}}>{this.state.photoURL || 'No Photo'}</Text></View>)
          }
        </View>
        <View style={styles.row}>
          <View style={styles.title}><Text>Email :</Text></View>
          <View style={styles.tbody}><Text style={{fontWeight:'bold'}}>{naData.email}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.title}><Text>Creation Time :</Text></View>
          <View style={styles.tbody}><Text style={{fontWeight:'bold'}}>{naData.creationTime || 'No Unknow'}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.title}><Text>Last Login :</Text></View>
          <View style={styles.tbody}><Text style={{fontWeight:'bold'}}>{naData.lastLogin || 'Unknow'}</Text></View>
        </View>
      </View>
      <View style={{flex:3,justifyContent: 'center'}}>
        <TouchableHighlight style={styles.btn} onPress={()=>this.DoUpdate(naData.auth) } >
            <Text style={styles.load}>{this.state.isUpdate?'Update Now':'Update Profile'}</Text>
        </TouchableHighlight>
        {naData.emailVerified?
        (<View style={styles.btn}>
          <Text style={styles.load}>Email Verified</Text>
        </View>)
        :
        (<TouchableHighlight style={styles.btn} onPress={()=>this.DoSendEmail(naData.auth)} >
              <Text style={styles.load}>SendVerifyEmail</Text>
        </TouchableHighlight>)
        }
        <TouchableHighlight style={styles.btn} onPress={()=>this.DoLogout(naData.auth) }>
            <Text style={styles.load}>Logout</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{paddingLeft:20,width:'30%',height:20,marginRight:30},
  tbody:{paddingLeft:10,width:'55%',height:20},
  input:{borderBottomWidth:1,borderColor:'#196DF9'},
  row: {display:'flex',flexDirection:'row'},
  btn:{flexDirection:'row',justifyContent: 'center',marginHorizontal:50,marginBottom: 10,backgroundColor:"#33FF66",borderRadius:20},
  load: {paddingVertical:10,color:'#fff',fontWeight:'bold'},
});