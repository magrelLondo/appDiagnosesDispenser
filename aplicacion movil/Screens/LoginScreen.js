import React, {useState, useEffect, useContext} from 'react';
import {View,StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import {Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import logo from "../assets/Logo.png";
import axios from 'axios';

import { URLContext } from './Context';


function LoginScreen() {
    const navigation = useNavigation();
    const { url } = useContext(URLContext);
    const [usuario,setUsuario] = useState({
        correo: '',
        contrasena: ''
    });

    const[datas,setData]=useState(null);
    const[usuario1,setUsuario1] = useState(null);

    const logearUsuario = async()=>{
        try {
        
        const response = await axios.post(url+'/usuario', usuario);
        
        // Aquí puedes manejar la respuesta del servidor
        // Por ejemplo, si el registro es exitoso, mostrar un mensaje de éxito
        if (response.data === 'usuario no existe') {
            Alert.alert('Error', 'usuario no existe o correo y contraseña son incorrectas');
            console.log(response.data);
            
        } else {
                 
            //setData(response.data);
            //console.log({datas: datas});                  
            //navigation.navigate('Home',{datas:datas})
            if(response.data.length === 0)
            {
                try{
                    const response1 = await axios.get(url+'/usuario1/'+usuario.correo+'/'+usuario.contrasena);
                    if (response.data === 'usuario no existe') {
                        //Alert.alert('Error', 'usuario no existe o correo y contraseña son incorrectas');
                        console.log(response.data);
                        
                    } else {
                          setUsuario1(response1.data);
                          setData(response.data);
                          Alert.alert('Exitoso', 'BIENVENIDO'); 
                        //setData(response.data);
                        console.log({usuario1: usuario1}); 
                        //Alert.alert('Exitoso', 'BIENVENIDO');
                    }

                }catch(error)
                {
                    Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión');
                    console.log(error);
                }      
            }else
            {
                setData(response.data)
                Alert.alert('Exitoso', 'BIENVENIDO');
            }
            
            
            
        }
        } catch (error) {
        // Manejar el error en caso de que ocurra
        Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión');
        console.log(error);
        }

        
    };

    useEffect(() => {
            if (datas) {
            navigation.navigate('Home', { datas: datas, usuario1:usuario1 });
            }
            }, [datas, usuario1, navigation]);

    

    const validarFormulario = () => {
    if (usuario.correo === '' || usuario.contrasena === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos');
    } else {
      logearUsuario();
    }
  };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Image 
                source={logo} 
                style={styles.logo} 
            />
             <Input 
                placeholder="Correo"
                onChangeText={text => setUsuario({ ...usuario, correo: text })}
                value={usuario.correo}
                leftIcon = {{type: 'font-awesome', name: 'envelope', size: 20}}
                style={styles.input}
                inputStyle={styles.textFormulario}
            />
            <Input 
                placeholder="Contraseña"
                onChangeText={text => setUsuario({ ...usuario, contrasena: text })}
                value={usuario.contrasena}
                leftIcon = {{type: 'font-awesome', name: 'lock', size: 30}}
                style={styles.input}
                inputStyle={styles.textFormulario}
                secureTextEntry={true} 
            />
            <TouchableOpacity style={styles.button} onPress={validarFormulario}>
                <Text style={styles.textBoton}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textBoton}>REGISTRARSE</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingTop: 5,
    },
    containerBoton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 20,
    },
    input: {      
        borderColor: '#375261',
        backgroundColor:'#FFFFFF',
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: 200,
        height: 40,
    },
    button: {
        height: 50,
        width: 170,
        backgroundColor: '#2e4957',
        borderRadius: 20,        
        borderWidth: 2,
        borderColor: '#688391',
        margin: 10,
        justifyContent: 'center',
        marginTop: 30,
    },
    textFormulario: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 50,
    },
    textBoton:{
        fontSize: 20,        
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#FFFFFF',
    },    
});

export default LoginScreen;