import {createStackNavigator} from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
import ItemDetailScreen from "../screens/ItemDetailsScreen";

const Stack = createStackNavigator();

export default function MainStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="HomeTabs" component={AppNavigator}/>
            <Stack.Screen name="ItemDetails" component={ItemDetailScreen}/>
        </Stack.Navigator>
    );
}