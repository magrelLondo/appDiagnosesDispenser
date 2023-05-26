# appDiagnosesDispenser


## API Django 

### recordatorio: se debe tener instalado python

la forma de correr el servidor es activar el entorno virtual primero

se ingresa el comando dentro de la carpeta backend_1  en el terminal para activar el entorno virtual

entorno-env\Scripts\activate.bat

despues entra a la carpeta DjangoAPI con el siguiente comando por el terminal

cd DjangoAPI

estando dentro de la carpeta en el terminal corre el siguiente comando, que sirve para correr el servidor de la API que ayudara para realizar las peticciones http

python manage.py runserver

el comando anterior hace que se  puede hacer peticiones de forma local pero luego toca crear un tunel para que la API sea publica. Entonces se usa lo siguiente:

NGROK es una herramienta de uso gratuito que nos permite exponer nuestro entorno local a la web, es decir, podemos "publicar" nuestro trabajo en local para 
que el resto del mundo lo pueda ver sin la necesidad de subir la aplicación a un servidor.

despues de correr el servidor de forma local abrimos otro terminal sin cerrar el terminal donde tenemos corriendo el servidor de forma local y ingresamos los 
siguientes comandos, es importante correr el comando en la misma ubicación donde se corrio el comando anterior de python.

ngrok http 8000

como respuesta nos crea una URL que nos servira para mandarle a la app para que logre hacer las peticiones, esta URL funciona mientras no cerremos
los terminales, si se cierran nos crea una nueva URL y toca volver a cambiar la URL en la aplicación móvil.
por ejemplo arroja una URL por este estilo http://59b3-181-54-0-175.ngrok-free.app

con esa URL ya se explica que se debe hacer acontinuación en la sección de la APP



## APP

### recordatorio: se debe tener instalado node.js 

Despues de tener la URL  vamos a la carpeta aplicacion movil, esta carpeta esta por fuera del backend_1, estando dentro nos ubicamos en el archivo Context,js
dentro del archivo hay una URL, esa URL se cambia por la nueva que se genero, esto permite luego hacer las peticiones cuando se corra la aplicación movil.

despues de hacer ese cambio abrimos una terminal donde este abierto la carpeta aplicacion movil y se corre el siguiente comando 

npx expo start 

El comando anterior  hace que la app se pueda correr ya sea en la aplicaón expo go, en un emulador android o correrlo en el celular, esto aun no me genera el APK
pero me permite visualizar y probar la aplicación móvil. 

si se quiere probar como funciona generando el APK se debe tener una cuenta en expo  y en el terminal donde se encuentra el codigo de la aplicación correr el siguiente comando 

eas build -p android --profile preview


## CÓDIGO DISPENSADOR

### recordatorio: tener instalado aruino y correr el codigo en una ESP32, aparte de eso tener instalado las librerias que se incluyen a proyecto que se ven evidenciadas dentro del codigo que aparecen en los include

para probrar el código es importante tener la armazon, en el PDF se evidencia los elementos que se utilizarón y como van conectados y una breve explicacón
del codigo por medio de los diagramas de flujo. en el codigo tambien va incluido la URL que se debe cambiar al final de codigo en las funciones DeserializeObjectCan()  y SerializeObjectDispensador(float alimento, float agua,int a,int m,int d,int idc )
