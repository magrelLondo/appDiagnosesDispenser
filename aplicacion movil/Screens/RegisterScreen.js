import React, {useState, useContext} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert} from "react-native";
import {Input} from "react-native-elements";
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import logo from "../assets/Logo.png";


import { URLContext } from './Context';

function RegisterScreen({navigation}) {
    const [usuario,setUsuario] = useState({
        nombre:'',
        correo:'',
        contrasena:''
    });

    const { url } = useContext(URLContext);

    const registrarUsuario = async()=>{
        try {
        const response = await axios.post(url+'/registrar', usuario);
        // Aquí puedes manejar la respuesta del servidor
        // Por ejemplo, si el registro es exitoso, mostrar un mensaje de éxito
        if (response.data === 'added Successfully') {
            Alert.alert('Éxito', 'Usuario registrado exitosamente');
            console.log(response.data);
        } else {
            console.log(response.data);
            Alert.alert('Error', 'ya existe este correo');
        }
        } catch (error) {
        // Manejar el error en caso de que ocurra
        Alert.alert('Error', 'Ha ocurrido un error al registrar el usuario');
        }
    };

    const validarFormulario = () => {
    if (usuario.nombre === '' || usuario.correo === '' || usuario.contrasena === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos');
    } else {
      registrarUsuario();
    }
  };

    return(
        <ScrollView>
        <View style={styles.container}>
            <Image 
                source={logo} 
                style={styles.logo}
            />
            <Input 
                placeholder="Nombre"
                onChangeText={text => setUsuario({ ...usuario, nombre: text })}
                value={usuario.nombre}
                leftIcon = {{type: 'font-awesome', name: 'user', size: 25}}
                style={styles.input}
                inputStyle={styles.textFormulario}
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
        fontWeight: 'bold',     
        marginBottom: 10,
        textAlign: 'center',
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


export default RegisterScreen;