import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './navigation/MainStack';


export default function MainNavigator() {

  

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <MainStack/>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
