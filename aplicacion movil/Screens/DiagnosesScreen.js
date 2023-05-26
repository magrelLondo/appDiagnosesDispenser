import React, {useState, useEffect, useContext} from 'react';
import {View,StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Card, Icon} from 'react-native-elements';
import logo from "../assets/Logo.png";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

import { URLContext } from './Context';

const data = [
    {
        iddiagnosticos: 2,
        fecha: "2023-03-16",
        sintomastext: "fiebre, vomito, diarrea",
        enfermedadtext: "parvovirus",
        tratamiento: "No existe ningún tratamiento 100% efectivo para combatir el parvovirus, pero es importante mantenerlo hidratado, entre las primeras 24-48 horas después de contraer el virus es primordial no dar alimento, se les puede dar un caldo de pollo sin sal, ni condimentos, la enfermedad es importante tratarla con antibióticos y antieméticos, si posee más perros es importante mantenerlos alejados porque la enfermedad es de amplio contagio, si los síntomas son disminución del apetito, vómitos muy severos, se ve cansado, diarrea abundante y con sangre, fiebre puede que tu perro tenga parvovirus, es importante vacunarlos cada año, los cachorros son propensos a contraer esta enfermedad, es importante desparasitarlos y mantener su hogar limpio para prevenir esta mortal enfermedad.",
        idcan_field: 1

    },
    {
        iddiagnosticos: 5,
        fecha: "2023-04-15",
        sintomastext: "Caida de pelo, pulgas, Lesion en piel",
        enfermedadtext: "Dermatitis",
        tratamiento: "La dermatitis es causada por hongos se manifiesta cambiando el color de la piel, caída del pelo, aparición de masas purulentas que segregan pus, resequedad, el tratamiento indicado es el uso de cremas tópicas para eliminar el hongo y con los síntomas, es importante aplicar la crema durante un tiempo prolongado, ya que en caso contrario los hongos pueden volver aparecer y seguramente mas fuerte que antes. A veces la dermatitis también puede ser provocada por sustancias perjudicial para su piel, como el cloro, pinturas, etc.… lo mejor que puede hacer es alejar a su perro de estas sustancias. Hay otro tipo de dermatitis llamada dermatitis seborreica que puede ser provocada por exceso de baño, el síntoma principal es que la piel empieza a producir mas grasa de la necesaria, provocando a su vez un olor intenso y desagradable que identifica la enfermedad, el tratamiento consiste en baños con productos especiales que ayuden a devolver a la piel su estado habitual.",
        idcan_field: 1
    }
]

function DiagnosesScreen() {
    
    const navigation = useNavigation();
    const route = useRoute();
    const {diagnosticos, idcan}=route.params;
    console.log(idcan);
    const { url } = useContext(URLContext);

    
    useEffect(() => {
            
            }, [navigation]);


    const eliminarDiagnostico = async(iddiagnosticos)=> {

        try{

            const response = await axios.delete(url+'/diagnosticos/'+iddiagnosticos);

             if(response.data)
            {
                Alert.alert('Exitoso','se elimino el diagnostico, para ver el cambio volver a cargar el historial de diagnosticos');
            }
            else{
                Alert.alert('Error','no se pudo eliminar este diagnostico');
            }

        }catch(error){

            Alert.alert('Error', 'Ha ocurrido un error vuele a intentar');
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}  onPress={() => {if (diagnosticos.length) {
                                                                            navigation.navigate('Newdiagnoses', { idcan_field: diagnosticos[0].idcan_field });
                                                                        } else {
                                                                            navigation.navigate('Newdiagnoses', { idcan_field: idcan });
                                                                        }}}>
                            <View style={styles.buttonInterno}>
                                <Icon
                                    name="plus"
                                    type="font-awesome"
                                    color="#ffffff"
                                    size={24}
                                    style={styles.icon}
                                />
                                <Text style={styles.textBoton}>NUEVO DIAGNOSTICO</Text>
                            </View>                       
                </TouchableOpacity>
            {diagnosticos.map((item) => (
                <Card key={item.iddiagnosticos}>
                    <Card.Title style={{ fontSize: 20 }}>Enfermedad: {item.enfermedadtext}</Card.Title>
                    <Card.Divider style={{borderColor: '#5F9DF7', borderWidth:2 }}/>
                    <Text style={styles.text}>Fecha: {item.fecha}</Text>
                    <Text style={styles.text}>Sintomas: {item.sintomastext}</Text>
                    <Text style={styles.text}>tratamiento: {item.tratamiento}</Text>  
                    <View style={styles.containerButtonCentral}>
                        <TouchableOpacity style={styles.button} onPress={()=>eliminarDiagnostico(item.iddiagnosticos)}>
                        <View style={styles.buttonInterno}>
                             <Icon
                                name="pencil"
                                type="font-awesome"
                                color="#ffffff"
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.textBoton}>ELIMINAR </Text>
                        </View>                       
                        </TouchableOpacity>
                    </View>                    
                    <View style={styles.containerButton}></View>
                    
                                          
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
    icon: {
        margin: 4
    }
       
});

export default DiagnosesScreen;