import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../../screens/App/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = () => {
    const Stack = createNativeStackNavigator();

  return (
  
        <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
       
        </Stack.Navigator>
   
  )
}

export default AppStack