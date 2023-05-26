import React, {useState, useEffect, useContext} from 'react';
import {View,StyleSheet, Text, Image, TouchableOpacity,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute} from '@react-navigation/native';
import {Input,Icon} from 'react-native-elements';
import logo from "../assets/perro.jpg";
import axios from 'axios';

import { URLContext } from './Context';

function NewCanScreen() {
    
    const navigation = useNavigation();
    const route=useRoute();
    const { url } = useContext(URLContext);
    const {idusuario} = route.params;
    console.log(idusuario);

    const [nuevoCan, setNuevoCan] = useState({
        nombrecan: '',
        edad: '',
        peso: '',
        genero: '',
        altura: '',
        idusuario_field: '',
        cantidadcons_alimentodia: '',
        cantidadcons_aguadia:'',        
        nitdispensador:''        
    });

    const[datas,setData]=useState(null);
    //-------------------------actualizar canes -----------------------------

    const actualizarCanes = async()=>{
        try{
            const response = await axios.get(url+'/can/'+idusuario);
        
            if (response.data === 'vacio') {
            Alert.alert('Error', 'no actualizo');
            console.log(response.data);
            
            } else {
                    
                setData(response.data);
                //console.log({datas: datas}); 
                Alert.alert('Exitoso', 'se actualizo canes ');                   
                navigation.navigate('Home',{datas:datas})        
                
            }


        }catch(error){
            Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión');
            console.log(error);
        }

    };

    useEffect(() => {
            if (datas) {
            navigation.navigate('Home', { datas: datas });
            }
            }, [datas, navigation]);
    //----------------------------------------------------------------


    const validarFormulario=()=>{
            if(nuevoCan.nombrecan==='' || nuevoCan.edad==='' || nuevoCan.peso===''
            ||nuevoCan.genero==='-----' || nuevoCan.altura==='')
            {
                Alert.alert('Error', 'Por favor, complete todos los campos, el unico que se puede dejar libre es el nit por si no posee el dispensador');
            } else
            {
                let alimento=0.0;
                let agua= nuevoCan.peso * 0.04;
                if(nuevoCan.altura <= 24.0 && nuevoCan.peso <=4.0)
                {
                     if(nuevoCan.edad >= 9)
                    {
                        alimento = nuevoCan.peso * 0.02*1000.0;
                    }else{
                        alimento = nuevoCan.peso * 0.06*1000.0;
                    }
                    
                }else if(nuevoCan.altura>=25.0 && nuevoCan.altura <= 30.0 && nuevoCan.peso >=5.0 && nuevoCan.peso <=14.0)
                {
                    if(nuevoCan.edad >= 9)
                    {
                        alimento = nuevoCan.peso * 0.02*1000.0;
                    }else{
                        alimento = nuevoCan.peso * 0.05*1000.0;
                    }
                }else if(nuevoCan.altura>=31.0 && nuevoCan.altura <= 40.0 && nuevoCan.peso >=15.0 && nuevoCan.peso <=25.0)
                {
                    if(nuevoCan.edad >= 9)
                    {
                        alimento = nuevoCan.peso * 0.02*1000.0;
                    }else{
                        alimento = nuevoCan.peso * 0.025*1000.0;
                    }
                }else if(nuevoCan.altura>=41.0 && nuevoCan.altura <= 60.0 && nuevoCan.peso >=26.0 && nuevoCan.peso <=50.0)
                {
                    if(nuevoCan.edad >= 9)
                    {
                        alimento = nuevoCan.peso * 0.02*1000.0;
                    }else{
                        alimento = nuevoCan.peso * 0.025*1000.0;
                    }
                }
                else if(nuevoCan.altura>=60.0 && nuevoCan.peso >=51.0 && nuevoCan.peso <=82.0)
                {
                    if(nuevoCan.edad >= 9)
                    {
                        alimento = nuevoCan.peso * 0.02*1000.0;
                    }else{
                        alimento = nuevoCan.peso * 0.025*1000.0;
                    }
                }else{
                    alimento = nuevoCan.peso * 0.02*1000.0;
                }

                setNuevoCan((prevState) => ({
                ...prevState,
                idusuario_field: idusuario,
                cantidadcons_alimentodia: alimento,
                cantidadcons_aguadia:agua
                }));
                
                registrarCan();
                
                
            }
    };

    useEffect(() => {
                    console.log(nuevoCan);
                    setNuevoCan(nuevoCan);
    },[nuevoCan]);
    
    const registrarCan = async() => {
        try {
            
            console.log(nuevoCan);

            const response = await axios.post(url+'/can/'+idusuario, nuevoCan);
            //response = await axios.post('http://3e56-181-54-0-175.ngrok-free.app/can',nuevoCan);
            if(response.data === 'added Successfully'){
                Alert.alert('Exito',nuevoCan.nombrecan+' ha sido registrado');
                console.log(response.data);
                actualizarCanes();


            }else{
                console.log(response.data);
                Alert.alert('Error', 'ya tiene registrado un perro ');
            }
        }catch(error) {
            Alert.alert('Error', 'Ha ocurrido un error registrando el can');
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
                placeholder="Nombre del Can"
                onChangeText={text => setNuevoCan({ ...nuevoCan, nombrecan: text })} 
                value={nuevoCan.nombrecan}
                leftIcon = {{type: 'font-awesome', name: 'paw', size: 30}}
                style={styles.input}
                inputStyle={styles.textFormulario}
            />
            <Input 
                placeholder="Edad"
                onChangeText={text => {
                    const parsedValue = text !== ''? parseInt(text) :0;
                    setNuevoCan({ ...nuevoCan, edad: parsedValue });
                }}
                value={nuevoCan.edad.toString()}
                leftIcon = {{type: 'font-awesome', name: 'clock-o', size: 32}}
                style={styles.input}
                inputStyle={styles.textFormulario}
                //keyboardType='number-pad'
                keyboardType="numeric"
            />
            <Input 
                placeholder="Peso (Kg)"
                onChangeText={text => {
                    const parsedValue = text !== ''? parseFloat(text) :0;
                    setNuevoCan({ ...nuevoCan, peso: parsedValue });
                }}
                value={nuevoCan.peso.toString()}
                leftIcon = {{type: 'font-awesome', name: 'balance-scale', size: 23}}
                style={styles.input}
                inputStyle={styles.textFormulario}
                keyboardType='decimal-pad'
            />
            <Input 
                placeholder="Altura (cm)"
                onChangeText={text => {
                    const parsedValue = text !== ''? parseFloat(text):0;
                    setNuevoCan({ ...nuevoCan, altura: parsedValue });
                }}
                value={nuevoCan.altura.toString()}
                leftIcon = {{type: 'font-awesome', name: 'arrows-v', size: 40}}
                style={styles.input}
                inputStyle={styles.textFormulario}
                keyboardType='decimal-pad'
            />
            <Input 
                placeholder="Nit dispensador"
                onChangeText={text => setNuevoCan({ ...nuevoCan, nitdispensador: text })} 
                value={nuevoCan.nitdispensador}
                leftIcon = {{type: 'font-awesome', name: 'barcode', size: 25}}
                style={styles.input}
                inputStyle={styles.textFormulario}
            />
            <View style={styles.buttonInterno}>
            <Icon
                                name="venus-mars"
                                type="font-awesome"
                                color="#000"
                                size={24}
                                style={styles.icon}
            />
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={nuevoCan.genero}
                prompt="Selecciona un genero"
                onValueChange={(itemValue, itemIndex) =>
                    setNuevoCan((prevState) => ({ ...prevState, genero: itemValue }))
                 }
                >
                <Picker.Item label="-----" value=" " />
                <Picker.Item label="Macho" value="M" />
                <Picker.Item label="Hembra" value="H" />
            </Picker>
            </View>
            
            <View style={styles.containerButtonCentral}>
                        <TouchableOpacity style={styles.button} onPress={validarFormulario}>
                        <View style={styles.buttonInterno}>
                             <Icon
                                name="plus"
                                type="font-awesome"
                                color="#ffffff"
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.textBoton}>GUARDAR</Text>
                        </View>                       
                        </TouchableOpacity>
                    </View>  
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
        margin: 20,
    },
    textBoton:{
        fontSize: 20,        
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: 4,
    },
    picker: {
        height: 40,
        width: 250,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#E0E0E0',
        overflow: 'hidden', 
    },
    pickerItem: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerButtonCentral: {
        alignItems: 'center',
    },
    buttonInterno:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    icon: {
        margin:4
    }
});


export default NewCanScreen;