import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './navigation/MainStack';
import AuthNavigator from './navigation/AuthNavigator';
import auth, { firebase } from '@react-native-firebase/auth';
import { setUser } from './redux/store/slices/authSlice';

export default function MainNavigator() {
  
  const dispatch = useDispatch(); 

  const user = useSelector((state) => state.auth.user);
  

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      dispatch(setUser(user ? user.toJSON() : null));
    });

    return unsubscribe;
  }, []);

  //const isUserLogin = true;

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {user? <MainStack /> : <AuthNavigator />}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
