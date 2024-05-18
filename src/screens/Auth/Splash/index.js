import { ImageBackground, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const id = AsyncStorage.getItem("Token", async (error, data) => {
        if (data) {
            navigation.navigate('AppStack')
        } else {
            console.log("data: ", data);
            navigation.navigate('AuthStack')
        }
      })
    console.log("User ID: ", id);
}, []);

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#000000'}}>
    <Image source={require('../../../assets/icons/splash.png')} style={{width:scale(200),height:scale(200)}} />
    </View>
  );
};

export default Splash;
