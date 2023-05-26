import React, {useState, useEffect, useContext} from 'react';
import {View,StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Card, Icon} from 'react-native-elements';
import logo from "../assets/comida.jpg";
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress/Bar';
import { URLContext } from './Context';
import axios from 'axios';

const data = [
    {
        iddispensador_alimento: 1,
        consumoalimento_dia: 450.0,
        consumoagua_dia: 1.0,
        fecha: "2023-03-16",
        idcann_field: 1
    },
    {
        iddispensador_alimento: 2,
        consumoalimento_dia: 625.0,
        consumoagua_dia: 0.5,
        fecha: "2023-03-17",
        idcann_field: 1
    }
]

function DispenserScreen() {
    
    const navigation = useNavigation();
    const route = useRoute();
    const {dispensador,alimento,agua}=route.params;
    const { url } = useContext(URLContext);

    console.log(alimento);
    console.log(agua);
    
    useEffect(() => {
            
            }, [navigation]);


    
    const eliminarDispensador = async(iddispensador_alimento)=> {

        try{

            const response = await axios.delete(url+'/dispensador/'+iddispensador_alimento);

             if(response.data)
            {
                Alert.alert('Exitoso','se elimino con exito, volver a cargar el historial para ver el cambio');
            }
            else{
                Alert.alert('Error','no se pudo eliminar');
            }

        }catch(error){

            Alert.alert('Error', 'Ha ocurrido un error vuele a intentar');
            console.log(error);
        }
    };


    return (
        <ScrollView>
            <View style={styles.container}>
            <Image 
                source={logo} 
                style={styles.logo} 
            />
            {dispensador.map((item) => (
                <Card key={item.iddispensador_alimento}>
                    <Card.Title style={{ fontSize: 22  }}>Fecha: {item.fecha}</Card.Title>
                    <Card.Divider style={{borderColor: '#5F9DF7', borderWidth:2 }}/>
                    <Text style={styles.text}>Cantidad de alimento que ha consumido en el día: {item.consumoalimento_dia} gr</Text>
                    <ProgressBar 
                        progress={(item.consumoalimento_dia)/alimento}
                        width={310}
                        height={20}
                        borderRadius={10}
                        borderWidth={1}
                        animation={true}
                        color='#ED7B31'
                        borderColor='#ED7B31'
                    />
                    {item.consumoalimento_dia >= alimento - 5.0? (
                        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom:8}}>Consumio el alimento necesario.</Text>
                    ):(
                        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom:8}}>No ha consumido el alimento necesario.</Text>
                    )}
                    <Card.Divider/>
                    <Text style={styles.text}>Cantidad de agua que ha consumido en el día: {item.consumoagua_dia} lt</Text>                                     
                    <ProgressBar 
                        progress={(item.consumoagua_dia)/agua}
                        width={300}
                        height={20}
                        borderRadius={10}
                        borderWidth={1}                        
                        animation={true}
                        
                        color='#ED7B31'
                        borderColor='#ED7B31'
                    />
                    {item.consumoagua_dia >= agua - 0.1? (
                        <Text style={{fontSize: 16, textAlign: 'center', marginBottom:8}}>Consumio el agua necesaria.</Text>
                    ):(
                        <Text style={{fontSize: 16, textAlign: 'center', marginBottom:8}}>No ha consumido el agua necesaria.</Text>
                    )}
                    <Card.Divider/>

                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={()=>eliminarDispensador(item.iddispensador_alimento)}>
                                <View style={styles.buttonInterno}>
                                <Icon
                                    name="trash" 
                                    type="font-awesome"
                                    color="#ffffff"
                                    size={24}
                                    style={styles.icon}
                                />
                                <Text style={styles.textBoton}>ELIMINAR</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                                          
                </Card>
             ))}             
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
        paddingTop: 2,
    },
    text: {
        marginVertical: 8,
        fontSize: 18,
        textAlign: 'center',
    },
    containerButton: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonInterno:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button: {
        height: 60,
        width: 170,
        backgroundColor: '#2e4957',
        borderRadius: 20,        
        borderWidth: 2,
        borderColor: '#688391',
        margin: 5,
        justifyContent: 'center',
        marginTop: 20,
    },
    textBoton:{
        fontSize: 18,        
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: 4,
    },
    logo: {
        width: 285,
        height: 190,
    },
    icon: {
        margin: 4
    }
       
});

export default DispenserScreen;