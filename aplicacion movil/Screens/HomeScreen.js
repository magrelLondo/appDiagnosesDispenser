import React, {useState, useEffect, useContext} from 'react';
import {View,StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import {Card, Icon} from 'react-native-elements';
import logo from "../assets/Logo.png";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

import { URLContext } from './Context';

const data = [
    {
        idcan: 1,
        nombrecan: 'Rubio',
        edad: 3,
        peso: 25,
        genero: 'M',
        altura: 40.0,
        cantidadcons_alimentodia: 625.0,
        cantidadcons_aguadia: 1.0,
        nitdispensador: '323232'

    },
    {
        idcan: 2,
        nombrecan: 'Kira',
        edad: 3,
        peso: 25,
        genero: 'M',
        altura: 40.0,
        cantidadcons_alimentodia: 625.0,
        cantidadcons_aguadia: 1.0,
        nitdispensador: '323232'
    },
    {
        idcan: 3,
        nombrecan: 'Sasha',
        edad: 3,
        peso: 25,
        genero: 'M',
        altura: 40.0,
        cantidadcons_alimentodia: 625.0,
        cantidadcons_aguadia: 1.0,
        nitdispensador: '323232'
    }
]

function HomeScreen() {
    
    const navigation = useNavigation();
    const route= useRoute();
    const {datas,usuario1}=route.params;
    
    const { url } = useContext(URLContext);

    console.log(datas);
    console.log(usuario1);


    const [diagnosticos,setDiagnosticos]=useState(null);
    const [alimento,setAlimentos]=useState('');
    const [agua,setAgua]=useState('');
    const [idcan,setIdcan]=useState('');

    

    const obtenerDiagnosticos = async(iddiagnostico)=> {
        try {
            const response = await axios.get(url+'/diagnosticos/'+iddiagnostico);
            

            if(response.data)
            {
                setDiagnosticos(response.data);
                setIdcan(iddiagnostico);
                Alert.alert('Historial','historial de diagnosticos');

            }
            else{
                Alert.alert('Error','error al querer entrar a los diagnosticos');
            }
            
        }catch(error) {
            Alert.alert('Error','Ha ocurrido un error vuelve a intentarlo');
            console.log(error);
        }
    };

    useEffect(() => {
            if (diagnosticos) {
            navigation.navigate('Diagnoses', { diagnosticos: diagnosticos, idcan: idcan });
            }
            }, [diagnosticos, navigation, idcan]);

    useEffect(() => {
            console.log(datas)
    }, [navigation]);

    // -------------------------------- obtener datos del dispensador -----------------------------------

    const [dispensador,setDispensador]=useState(null);

    const obtenerDispensador = async(idcan, alimento, agua)=> {
        try {
            const response = await axios.get(url+'/dispensador/'+idcan);
            

            if(response.data)
            {
                setDispensador(response.data);
                setAlimentos(alimento);
                setAgua(agua);
                Alert.alert('Historial','historial del dispensador de comida');

            }
            else{
                Alert.alert('Error','error al querer entrar al historial del dispensador de su perro');
            }
            
        }catch(error) {
            Alert.alert('Error','Ha ocurrido un error vuelve a intentarlo');
            console.log(error);
        }
    };

    useEffect(() => {
            if (dispensador) {
            navigation.navigate('Dispenser', { dispensador: dispensador,  alimento:alimento, agua:agua});
            }
            }, [dispensador, alimento, agua, navigation]);


    
    //---------------------------------------------------------------------------------------------------

    //----------------------guardar datos del can--------------------------------------------------------
      
    const handleEditCan = (item) => {
        navigation.navigate('Editcan',{item:item});
        console.log(item);
    };    


    //---------------------------------------------------------------------------------------------------
    
    const handleObtenerDispensador = async (idcan, alimento,agua) => {
        await obtenerDispensador(idcan, alimento, agua);
    };

    const handleObtenerDiagnosticos = async (iddiagnosticos) => {
        await obtenerDiagnosticos(iddiagnosticos);
    };

    return (
        <ScrollView>
            <View style={styles.container}>                
                <TouchableOpacity style={styles.button} onPress={() => {if (datas.length) {
                                                                            navigation.navigate('Newcan', { idusuario: datas[0].idusuario_field });
                                                                        } else {
                                                                            navigation.navigate('Newcan', { idusuario: usuario1.idusuario });
                                                                            console.log(usuario1)
                                                                        }}}>
                            <View style={styles.buttonInterno}>
                                <Icon
                                    name="plus"
                                    type="font-awesome"
                                    color="#ffffff"
                                    size={24}
                                    style={styles.icon}
                                />
                                <Text style={styles.textBoton}>NUEVO CAN</Text>
                            </View>                       
                </TouchableOpacity>
            {datas.map((item) => (
                <Card key={item.idcan}>
                    <Card.Title style={{ fontSize: 20 }}>Nombre Can: {item.nombrecan}</Card.Title>
                    <Card.Divider style={{borderColor: '#5F9DF7', borderWidth:2 }} />
                    <Text style={styles.text}>Edad: {item.edad}</Text>
                    <Text style={styles.text}>Peso: {item.peso} Kg</Text>
                    <Text style={styles.text}>Genero: {item.genero}</Text>
                    <Text style={styles.text}>Altura: {item.altura} cm</Text>
                    <Text style={styles.text}>Cantidad de alimento que debe consumir en el dia: {item.cantidadcons_alimentodia} gr</Text>
                    <Text style={styles.text}>Cantidad de agua que debe tomar en el dia: {item.cantidadcons_aguadia} lt</Text>
                    <Text style={styles.text}>Nit dispensador: {item.nitdispensador}</Text>
                    <View style={styles.containerButtonCentral}>
                        <TouchableOpacity style={styles.button} onPress={() => handleEditCan(item)}>
                        <View style={styles.buttonInterno}>
                             <Icon
                                name="pencil"
                                type="font-awesome"
                                color="#ffffff"
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.textBoton}>EDITAR {item.nombrecan}</Text>
                        </View>                       
                        </TouchableOpacity>
                    </View>                    
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={() => handleObtenerDiagnosticos(item.idcan)}>
                             <View style={styles.buttonInterno}>
                             <Icon
                                name="stethoscope"
                                type="font-awesome"
                                color="#ffffff"
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.textBoton}>DIAGNOSTICOS</Text>
                            </View>
                        </TouchableOpacity>
                        {item.nitdispensador && item.nitdispebsador !=='' &&(
                        <TouchableOpacity style={styles.button} onPress={() => handleObtenerDispensador(item.idcan, item.cantidadcons_alimentodia, item.cantidadcons_aguadia)}>
                            <View style={styles.buttonInterno}>
                             <Icon
                                name="cutlery" 
                                type="font-awesome"
                                color="#ffffff"
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.textBoton}>DISPENSADOR</Text>
                            </View>
                        </TouchableOpacity>
                        )}
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
        paddingTop: 5,
    },
    text: {
        marginVertical: 8,
        fontSize: 16,
        textAlign: 'center',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerButtonCentral: {
        alignItems: 'center',
    },
    buttonInterno:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button: {
        height: 50,
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
    icon: {
        margin: 4
    }
       
});

export default HomeScreen;