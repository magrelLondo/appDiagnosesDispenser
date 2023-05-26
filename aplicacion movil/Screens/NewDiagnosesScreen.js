import React, {useState, useEffect, useContext} from 'react';
import {View,StyleSheet, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Input,Icon,CheckBox} from 'react-native-elements';
import logo from "../assets/diagnostico.png";
import axios from 'axios';

import { URLContext } from './Context';

const sintomas =['Dolor en la parte posterior','Anorexia','Decaimiento','Dolor renal','Disminucion de apetito',
               'Duerme mucho','Brote abdominal','Caida de pelo','Cambio de color de pelo','Agitacion',
               'Fiebre alta','Tos','Laganas','Dolor lumbar','Letargo','Ganglios aumentados','Mucosas palidas',
               'Queratitis','Baba espesa','Fiebre','Ojos rojos','Ataque canino','Bebe poca agua',
               'Vomito amarillo','Sarro leve','No camina','Jadeo','Moco','Depresion','Dolor abdominal craneal',
               'Dolor abdominal','No bebe agua','Sensibilidad renal','orina con sangre','defeca con sangre',
               'mal aliento','palida ','diarrea sanguinolienta','alterada inquieta','Diarrea','Alopecia',
               'Presencia de garrapatas','pulgas','Vomito','prurito intenso','Prurito','ectoparasitos',
               'obeso','Eritema en region dorso lumbar ','Eritema en oidos','pioderma','Eritema',
               'Diarrea verdosa','mucosas congestionadas','no hace necesidades fisiologicas','camina encorbado',
               'Heces con moco','ataxia','diarrea mucosa','cojera','papulas','temblores musculares','taquinea',
               'Nariz seca','Diarrea muy liquida','Diarrea mal oliente','Vomito amarillo con pintas de sangre',
               'Borborigmos aumentados','Espectoracion','Tos con sangre','Convulsiones','Estridor traqueal',
               'Estornudos frecuentes','Congestion ocular','tos seca','ojos irritados',
               'secreccion salibal abundante','Inflamacion de ganglios faringeos','Dolor zona faringea',
               'Lesion en piel','Seborrea seca','Postulas','Descamacion','Inflamacion','Orina turbia',
               'Orina maloliente','Dificultad al orinar','Diarrea verde','Secrecion nasal mucosa',
               'Sonidos respiratorios','Hiperqueratosis de los pulpejos','Secrecion nasal verdosa',
               'Retencion de liquidos','Vomito con sangre','Heces con parasitos','Parasitos externos',
               'Bradicardia','comezon orejas','serumen','cabeceo','irritacion en las oreajas',
               'dolor en las orejas','Dolor','Secrecion otica','acaros (Otodectes)',
               'piel enrojecidad','mal olor','erupcciones ventrales con contaminacion bacteriana.',
               'lesiones por contacto al pasto','piel seca','hongos ','escamas en la piel',
               'granos en el estomago','mucosas rojas','areas de lesion infesiosa en piel',
               'oidos congestionados','infesion en la piel','malestar general','debilitacion general',
               'secrecion oidos  cafe lodosa y mal olorosa','deshidratacion','anemia']

function NewDiagnosesScreen() {
    //const [fecha, setFecha] = useState('');
    //const [selectedSintomas, setSelectedSintomas] = useState([]);
    const navigation = useNavigation();
    const route=useRoute();
    const {idcan_field} = route.params;
    console.log(idcan_field);

    const { url } = useContext(URLContext);

    const [diagnosticoS, setDiagnosticoS] = useState({
        fecha: '',
        selectedSintomas: [],
        idcan:''
    });

    //------------------------   para actualizar historial diagnosticos ------------------

    const [diagnosticos,setDiagnosticos]=useState(null);

    const obtenerDiagnosticos = async(iddiagnostico)=> {
        try {
            const response = await axios.get(url+'/diagnosticos/'+iddiagnostico);
            

            if(response.data)
            {
                setDiagnosticos(response.data); 
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
            navigation.navigate('Diagnoses', { diagnosticos: diagnosticos });
            }
            }, [diagnosticos, navigation]);


    const handleObtenerDiagnosticos = async (iddiagnosticos) => {
        await obtenerDiagnosticos(iddiagnosticos);
    };
    //------------------------------------------------------------------------------------


    const [selectedSintomas, setSelectedSintomas] = useState([]);

    const onSintomaSelect = (sintoma) => {
        if (selectedSintomas.includes(sintoma)) {
        setSelectedSintomas(selectedSintomas.filter((s) => s !== sintoma));
        } else {
        setSelectedSintomas([...selectedSintomas, sintoma]);
        }
    };

    useEffect(() => {
        console.log(selectedSintomas);
    }, [selectedSintomas]);

    const diagnosticarEnfermedad = async()=> {
        try {
            Alert.alert('Diagnosticando','en este momento nos encontramos diagnosticando');
            const response = await axios.post(url+'/diagnosticos',diagnosticoS);
            console.log(response.data);
            Alert.alert('Diagnosto exitoso','Enfermedad diagnosticada: '+response.data.enfermedadtext+' tratamiento: '+response.data.tratamiento);
            handleObtenerDiagnosticos(response.data.idcan_field);

        }catch (error) {
            Alert.alert('Error','Ha ocurrido un error vuelve a intentarlo');
            console.log(error);
        }
    };

    const agregarSintoma = (nuevoSintoma) => {
        setDiagnosticoS((prevState) => ({
            ...prevState,
            selectedSintomas: nuevoSintoma,
            idcan: idcan_field,
        }));
        diagnosticarEnfermedad();
    };

    const recorrer = (arr1, arr2) => {

        const nuevoSintomas=[];
        for (let i = 0; i < arr2.length; i++) {
            
            let encontrado = false;
            for (let j = 0; j < arr1.length; j++) {
                if (arr2[i] === arr1[j]) {
                    nuevoSintomas.push(1);
                    encontrado=true;
                    break; // Se agrega un break para salir del bucle interno una vez que se encuentra el valor
                } 
            }

            if(encontrado === false)
            {
                nuevoSintomas.push(0);
            }

        }
        agregarSintoma(nuevoSintomas); // Actualizar el estado una vez al final del bucle
        
    };

    useEffect(() => {
        console.log(diagnosticoS);
    }, [diagnosticoS]);


    const validarFormulario = ()=> {
        if(diagnosticoS.fecha==='')
        {
            Alert.alert('Error', 'Por favor complete la fecha');
        }else if (selectedSintomas.length>=0 && selectedSintomas.length <=2)
        {
            Alert.alert('Error', 'debe seleccionar al menos 3 sintomas');
        }
        else
        {
            setDiagnosticoS({...diagnosticoS,idcan:idcan_field.idcan_field})
            recorrer(selectedSintomas,sintomas);
            

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
                placeholder="Fecha YYYY-MM-DD" 
                onChangeText={text => setDiagnosticoS({...diagnosticoS,fecha:text})} 
                value={setDiagnosticoS.fecha}
                leftIcon = {{type: 'font-awesome', name: 'calendar', size: 30}}
                style={styles.input}
                inputStyle={styles.textFormulario}
            />
            <Text style={styles.textAdvertencia}>Si posees un dispensador que se conecte a la aplicación el te informa si el perro se siente sin apetito y si no ha tomado suficiente agua.</Text>
            <Text style={styles.textFormulario}>Selecciona los sintomas que presenta tu perro:</Text>
            {sintomas.map((sintoma) => (
                <CheckBox
                key={sintoma}
                title={sintoma}
                checked={selectedSintomas.includes(sintoma)}
                onPress={() => onSintomaSelect(sintoma)}
                />
            ))}            
            <View style={styles.containerButtonCentral}>
                        <TouchableOpacity style={styles.button} onPress={validarFormulario} >
                        <View style={styles.buttonInterno}>
                             <Icon
                                name="stethoscope"
                                type="font-awesome"
                                color="#ffffff"
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.textBoton}>DIAGNOSTICAR</Text>
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
        width: 180,
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
    textAdvertencia: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'justify',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 30,
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

export default NewDiagnosesScreen;