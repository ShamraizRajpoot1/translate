import {View, Text, SafeAreaView} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const AppNavigator = () => {

 

  const Stack = createNativeStackNavigator();
  return (
    
    
       <Stack.Navigator>
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        
       
      </Stack.Navigator>
    
    
  );
};

export default AppNavigator;