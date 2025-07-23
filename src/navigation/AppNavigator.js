import * as React from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListScreen from "../screens/ListScreen.tsx";
import AddItemScreen from "../screens/AddItemScreen.tsx";



const Tab = createBottomTabNavigator();


export default function AppNavigator(){
    return(
        
        <Tab.Navigator
            screenOptions={({route}) =>({
                tabBarIcon:({focused,color,size}) =>{
                    let iconName;

                    if(route.name === 'ListScreen')
                    {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if(route.name == 'AddItemScreen')
                    {
                        iconName = focused? 'fridge' : 'fridge-outline';
                    }
                   
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor:'green',
                tabBarInactiveTintColor:'grey',

                tabBarStyle: {
                position: 'absolute',
                height: 70,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'white',
                borderTopWidth: 0,
                elevation: 10,
                shadowOpacity: 0.1,
                shadowRadius: 10,
              },
              headerShown: false,


            })}
        >
            <Tab.Screen name="ListScreen" component={ListScreen} options={{title:"List"}} />
            <Tab.Screen name="AddItemScreen" component={AddItemScreen} options={{title:"Add"}} />
            
        
        </Tab.Navigator>

        
        
    )
}