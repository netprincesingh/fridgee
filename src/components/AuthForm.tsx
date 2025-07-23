import React,{useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import { loginUser, registerUser } from "../redux/store/slices/authSlice.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthForm({route,navigation}){
    const {isLogin} = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () =>{
        try{
            if(isLogin)
            {
                await dispatch(loginUser({email,password})).unwrap();

            }
            else
            {
                await dispatch(registerUser({email,password})).unwrap();
            }
            
        }
        catch(err)
        {
            setError(err);
        }
    };

    return(
        <SafeAreaView style = {styles.container}>
            <View>
                <Text style = {styles.title}>{isLogin? 'Login': 'Register'}</Text>
                {error && <Text style={styles.error}>{error}</Text>}

                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style = {styles.button} onPress={handleSubmit}>
                    <Text style = {styles.buttonText}>
                        {isLogin? 'Login' : 'Create Account'}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate(isLogin? 'Register' : 'Login')}
                >
                    <Text style={styles.switchText}>
                        {isLogin? 'Need an account? Register' :'Have an account? Login'}
                    </Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:'#fff',
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20,
        textAlign:'center',
    },
    error:{
        color:'red',
        textAlign:'center',
        marginBottom:15,
    },
    input:{
        height:50,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:8,
        padding:10,
        marginBottom:15,
    },
    button:{
        backgroundColor:'green',
        padding:15,
        borderRadius:8,
        alignItems:'center',
        marginTop:10,

    },
    buttonText:{
        color:'white',
        fontWeight:'600',
    },
    switchText:{
        color:'green',
        textAlign:'center',
        marginTop:15,
    }

})