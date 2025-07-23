import {createStackNavigator} from '@react-navigation/stack';
import AuthForm from "../components/AuthForm.tsx";


const Stack = createStackNavigator();

export default function AuthNavigator(){

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                animation:'fade',
            }}
        >
            <Stack.Screen name="Login" component={AuthForm} initialParams={{isLogin:true}} />
            <Stack.Screen name="Register" component={AuthForm} initialParams={{isLogin:false}}/>

        </Stack.Navigator>
    );
}