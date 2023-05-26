import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import DiagnosesScreen from './Screens/DiagnosesScreen';
import DispenserScreen from './Screens/DispenserScreen';
import NewCanScreen from './Screens/NewCanScreen';
import EditCanScreen from './Screens/EditCanScreen';
import NewDiagnosesScreen from './Screens/NewDiagnosesScreen';

import { URLProvider } from './Screens/Context';

const Stack = createStackNavigator();


export default function App() {
  return (
    <URLProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            title: "INICIO DE SESIÓN",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{
            title: "REGISTRO",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Diagnoses" 
          component={DiagnosesScreen} 
          options={{
            title: "DIAGNOSTICOS",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "CAN",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Dispenser" 
          component={DispenserScreen} 
          options={{
            title: "DISPENSADOR",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Newcan" 
          component={NewCanScreen} 
          options={{
            title: "NUEVO CAN",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Editcan" 
          component={EditCanScreen} 
          options={{
            title: "EDITAR CAN",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
        <Stack.Screen 
          name="Newdiagnoses" 
          component={NewDiagnosesScreen} 
          options={{
            title: "NUEVO DIAGNOSTICO",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: '#2D4059',
              elevation: 50,
              shadowRadius: 20,             
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              color: '#F5F5F5',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </URLProvider>
  );
} 


