

   // ----------libreria LCD OLED------------
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
//----------------------------------------
#include "HX711.h" // libreria sensor de peso
//----------------------------------------
#include <ESP32Time.h> // libreria fecha y hora
//-------------- conexión internet--------
#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h" // para obtener la hora de un servidor
//------ json--------------------
//#include <ArduinoJson.hpp>
#include <ArduinoJson.h> // 



String nit = "159753";
float cantidadAli= 500.0;
int aper;
int cier;
int conteoServir = 1;
int conteoEnviar = 1;
int conteoSig = 1;
String concatenar;
float servir = 0.0;
float cantidad=0.0;
bool bandera1=false;
bool bandera2=false;
bool existe=false;
float vector[1];

//pines para la LCD oled 
/* Uncomment the initialize the I2C address , uncomment only one, If you get a totally blank screen try the other*/
#define i2c_Address 0x3c //initialize with the I2C addr 0x3C Typically eBay OLED's
//#define i2c_Address 0x3d //initialize with the I2C addr 0x3D Typically Adafruit OLED's

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET -1   //   QT-PY / XIAO
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

//pines para el HX711
const int LOADCELL_DOUT_PIN = 2;
const int LOADCELL_SCK_PIN = 4;
//motor
int motor1Pin1 = 27; 
int motor1Pin2 = 26; 
int enable1Pin = 14; 
// Setting PWM properties
const int freq = 30000;
const int pwmChannel = 0;  
const int resolution = 8; 
int dutyCycle = 255;
//compuerta
int apertura=35;
int cierre=32;
int abrir=1;
/*Definimos nuestras credenciales de la red WiFi*/
const char* ssid = "Coronavirus";
const char* pass = "jose1234";
const char* ntpServer = "2.pool.ntp.org"; // para obtener la hora de un servidor
const long  gmtOffset_sec = -5*60*60;
const int   daylightOffset_sec = 0;
int segundos = 0;
int minutos = 0;
int hora_24 = 0;
int dia = 12;
int mes = 11;
int anio = 2012;

//varibles importantes ha manejar Database
int idcan;
String nombreCan; 
int edad;
float peso;
char genero;
float altura;
int idusuario_field;
 float cantidadcons_alimentodia;
float cantidadcons_aguadia;
String nitdispensador;

int iddispensador_alimento;
float consumoalimento_dia;
float consumoagua_dia;
String fecha;
int idcann_field;


HX711 scale;
ESP32Time rtc; // creamos un objeto de tipo ESP32Time
//rtc.setTime(40,29,21,3,4,2023); // inicializacion de fecha y hora  seg/min/hor  dia/mes/año

void texto(String cadena, int posx, int posy);
float galga();
void motor(int giro);
void sistemaAutomatico(float alimento);
void horaServir();
void DeserializeObjectCan(String JS);
void reloj();

void printLocalTime()
{
  struct tm timeinfo;

  if(!getLocalTime(&timeinfo)) {
    rtc.setTime(segundos, minutos, hora_24, dia, mes, anio);
  }
  else
  {
  rtc.setTimeStruct(timeinfo);
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  // inicializacion de los componentes
  // display
  delay(250); // wait for the OLED to power up
  display.begin(i2c_Address, true); // Address 0x3C default
  display.clearDisplay();  
  display.display();
  
  //galga
  Serial.println("Load Cell Interfacing with ESP32 - DIY CHEAP PERFECT");  
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(-319.964  );    // this value is obtained by calibrating the scale with known weights as in previous step
  scale.tare();  
  //motor
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  // configure LED PWM functionalitites
  ledcSetup(pwmChannel, freq, resolution);  
  // attach the channel to the GPIO to be controlled
  ledcAttachPin(enable1Pin, pwmChannel);
  //compuerta 
  pinMode(apertura,INPUT);
  pinMode(cierre,INPUT);
  //rtc.setTime(40,29,21,3,4,2023); // inicializacion de fecha y hora  seg/min/hor  dia/mes/año

  // wifi
  WiFi.begin(ssid, pass);
  /*En el terminal Serial, indicamos que se está realizando la conexión*/
  Serial.print("Se está conectando a la red WiFi denominada ");
  Serial.println(ssid);
  /*Mientras se realiza la conexión a la red, aparecerán puntos, hasta que se realice la conexión*/
  /*while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }*/
  /*Con la conexión ya realizada, se pasa a imprimir algunos datos importantes, como la dirección IP asignada a nuestro dispositivo*/
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);  
  printLocalTime();
  //mensaje de bienvenida 
  texto("Bienvenidos",10,10);
  reloj();
  fechaC();
  delay(5000);
} 

void loop() {
  // put your main code here, to run repeatedly:  
  
  display.clearDisplay();  
  concatenar = "NIT:"+(String)nit;
  texto(concatenar,0,48);

  float peso = galga();
  String mensaje =  String(peso,1);
  texto(mensaje,70 ,20);
  
  //conexion ha internet
  if((WiFi.status() == WL_CONNECTED))
  {
    //DeserializeObjectCan();
    //actualiza hora y fecha cuando hay internet 
    reloj();
    fechaC();

    //realiza una peticion get se realiza solo una vez solo si el nit existe
    // si no existe vuelve a pedir peticion get
    if(bandera1 == false)
    {
      DeserializeObjectCan();
    }
    

    //pregunta si el nit existe en la base de datos se realiza esto una vez al dia 
    if(nitdispensador == nit)
    {
      bandera1=true;
      if(bandera2==false)
      {
        bandera2=true;
        reloj();
        fechaC();
        SerializeObjectDispensador(0,0,anio,mes,dia,idcan); // esto lo realiza una vez al dia
      }
      existe=true;      
    }
    

    if(existe==true)//si existe el nit hace lo del parentesis
    {
      reloj();
      fechaC();
      cantidadAli = (cantidadcons_alimentodia/3.0);
      horaServir(cantidadAli);

      //se envia antes de servir la siguiente comida 
      if((hora_24==17 && minutos==42 && conteoEnviar==2)||
           (hora_24==17 && minutos==47 && conteoEnviar==3)||
           (hora_24==17 && minutos==50 && conteoEnviar==4)||
           (hora_24==17 && minutos==52 && conteoEnviar==5))
       {
         float p=0.0;
         float a=0.0;
       
         for(int i=0; i<5; i++)
         {
          if(conteoEnviar == 5)
          {
            p=(vector[0]-galga())+p;
            a=a;
          }else
          {
            p=(cantidadAli-galga())+p;
            a=a;
          }
            
         }
         p = (p/5.0);
         cantidad = cantidad+p;
         SerializeObjectDispensador(cantidad,a,anio,mes,dia,idcan); 

         
         if(conteoEnviar==4)
         {
          vector[0] = galga();
         }
         
         if(conteoEnviar == 5)
         {
          conteoEnviar=1;                    
         }
         else if(conteoEnviar >=2)
         {
          conteoEnviar = conteoEnviar+1;
         }
         
       }

     }

    if(existe==false)// si no existe realiza lo del parentesis
    {
      reloj();
      fechaC();
      horaServir(cantidadAli);
      if((hora_24==17 && minutos==42)||
         (hora_24==17 && minutos==47)||
         (hora_24==17 && minutos==52)||
         (hora_24==17 && minutos==55))
       {
         float p=0.0;
         float a=0.0;
       
         for(int i=0; i<5; i++)
         {
          if(conteoEnviar == 5)
          {
            p=(vector[0]-galga())+p;
            a=a;
          }else
          {
            p=(cantidadAli-galga())+p;
            a=a;
          }
            
         }
         p = (p/5.0);
         cantidad = cantidad+p;
         //SerializeObjectDispensador(cantidad,a,anio,mes,dia,idcan); 

         
         if(conteoEnviar==4)
         {
          vector[0] = p;
         }
         
         if(conteoEnviar == 5)
         {
          conteoEnviar=1;
          conteoServir=1;                    
         }
         else if(conteoEnviar >=2)
         {
          conteoEnviar = conteoEnviar+1;
         }
         
       }
    }

    
  }
  else
  {
    reloj();
    fechaC();
    horaServir(cantidadAli);
    if((hora_24==17 && minutos==42)||
         (hora_24==17 && minutos==47)||
         (hora_24==17 && minutos==52)||
         (hora_24==17 && minutos==55))
       {
         float p=0.0;
         float a=0.0;
       
         for(int i=0; i<5; i++)
         {
          if(conteoEnviar == 5)
          {
            p=(vector[0]-galga())+p;
            a=a;
          }else
          {
            p=(cantidadAli-galga())+p;
            a=a;
          }
            
         }
         p = (p/5.0);
         cantidad = cantidad+p;
         SerializeObjectDispensador(cantidad,a,anio,mes,dia,idcan); 

         
         if(conteoEnviar==4)
         {
          vector[0] = p;
         }
         
         if(conteoEnviar == 5)
         {
          conteoEnviar=1;                    
         }
         else if(conteoEnviar >=2)
         {
          conteoEnviar = conteoEnviar+1;
         }
         
       }
  }

  //para que actualize todo desde cero y comenzar el proceso nuevamente
  if(hora_24==0 && minutos==0 && segundos>=0)
  {
    bandera1=false;
    bandera2=false;
    existe=false;
  }

  
    
    
}

void reloj()
{
  segundos = rtc.getSecond();
  minutos = rtc.getMinute();
  hora_24 = rtc.getHour(true);
  concatenar = String(hora_24)+":"+String(minutos)+":"+String(segundos);
  texto(concatenar,0,40);
}

void fechaC()
{
  dia = rtc.getDay();
  mes = (rtc.getMonth())+1;
  anio = rtc.getYear();
  concatenar = String(anio)+"/"+String(mes)+"/"+String(dia);
  texto(concatenar,50,40);
}

void texto(String cadena, int posx, int posy)
{
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(posx,posy);
  display.print(cadena);  
  display.display();
  delay(200);
}

float galga()
{
  //Serial.print("Weight: ");
  Serial.println(scale.get_units(10), 1);
  float peso= scale.get_units(10);
  scale.power_down();              // put the ADC in sleep mode
  delay(1000);
  scale.power_up();

  return peso;
}

void motor(int giro)
{
  if(giro == 1)
  {
    digitalWrite(motor1Pin1, LOW); 
    digitalWrite(motor1Pin2, HIGH); 
    //ledcWrite(pwmChannel, dutyCycle);
  }
  else if(giro == -1)
  {
    digitalWrite(motor1Pin1, HIGH);
    digitalWrite(motor1Pin2, LOW); 
    //ledcWrite(pwmChannel, dutyCycle);
  }
  else
  {
    digitalWrite(motor1Pin1, LOW);
    digitalWrite(motor1Pin2, LOW); 
  }
}



void sistemaAutomatico(float alimento)
{
  
      
  if((digitalRead(cierre) == LOW) &&  (digitalRead(apertura) == HIGH)) // indica que la compuerta esta cerrada
  {
    while(abrir == 1)
    {
      float peso = galga();
      if((digitalRead(cierre) == HIGH) &&  (digitalRead(apertura) == LOW) && (peso < (alimento - 20)) )
      {
        // va parar el motor
        motor(0);
        String mensaje =  String(peso,1);
        texto("aun no se termina ser",0,5);
        texto(mensaje,0,16);
      }
      else
      {
        //va mover el motor a la derecha para abrir compuerta
        
        if((peso < (alimento-20.0)) && ((digitalRead(apertura) == HIGH) || (digitalRead(cierre) == HIGH)))
        {        
          motor(1); // se abre compuerta
          String mensaje =  String(peso,1);
          texto("sirviendo a",0,5);
          texto(mensaje,0,16);
        }
        else if(peso >= (alimento-20.0))
        {
          motor(-1); // comienza a cerrar la compuerta dado que ya se sirvio
          String mensaje =  String(peso,1);
          texto("cerrando",0,5);
          texto(mensaje,0,16);
          if((digitalRead(cierre) == LOW) &&  (digitalRead(apertura) == HIGH))
          {
            abrir=0;
            motor(0);
            if(conteoServir==3)
            {
              conteoServir=1;
            }
            
            conteoServir=conteoServir+1;
            if(conteoEnviar == 1)
            {
              conteoEnviar = conteoEnviar+1;
            }
             
            String mensaje =  String(peso,1);
            texto("se termino de ce",0,5);
            texto(mensaje,0,16);
             
          }
        }
        
      }
      display.clearDisplay();
    }
    // ya termino de servir 
    abrir=1;
  }
  display.clearDisplay();
  delay(200);
  
}

void horaServir(float alimento)
{
  if((hora_24==17 && minutos==40 && conteoServir==1)||
     (hora_24==17 && minutos==45 && conteoServir==2)||
     (hora_24==17 && minutos==50 && conteoServir==3))
  {
     sistemaAutomatico(alimento);
  }
  //texto("esperando...",0,16);
  display.clearDisplay();
}


void DeserializeObjectCan()
{
  HTTPClient http; 
  http.begin("http://a511-190-68-195-120.ngrok-free.app/cansp32/159753"); //Specify the URL
  int httpCode = http.GET();
  if (httpCode > 0)
  {
    String json = http.getString();
    Serial.println(httpCode);
    Serial.println(json);  

    DynamicJsonDocument doc(1024);  //Reservo una variable dinamica de 1024bytes para guardar el archivo JSON deserializado.
    deserializeJson(doc, json);
  
    idcan = doc["idcan"];
    nombreCan = doc["nombrecan"].as<String>(); 
    edad = doc["edad"];
    peso = doc["peso"];
    genero = doc["genero"];
    altura = doc["altura"];
    idusuario_field = doc["idusuario_field"];
    cantidadcons_alimentodia = doc["cantidadcons_alimentodia"];
    cantidadcons_aguadia = doc["cantidadcons_aguadia"];
    nitdispensador = doc["nitdispensador"].as<String>();
    Serial.println(idcan);
    Serial.println(cantidadcons_alimentodia);
    Serial.println(cantidadcons_aguadia);
    Serial.println(nitdispensador);
  }
  else
      {
        Serial.println("Error on HTTP request");
        Serial.println(httpCode);
      }
  http.end(); //Free the resources
  
}


void SerializeObjectDispensador(float alimento, float agua,int a,int m,int d,int idc )
{
    HTTPClient http;  
    DynamicJsonDocument doc(1024);

    //doc["iddispensador_alimento"]=id
    doc["consumoalimento_dia"]=alimento;
    doc["consumoagua_dia"]=agua;
    doc["fecha"] = (String)a+"-"+(String)m+"-"+(String)d;
    //doc["fecha"] =rtc.getDate();
    doc["idcann_field"]=idc;
    
    String envio;
    serializeJson(doc,envio);
    http.begin("http://a511-190-68-195-120.ngrok-free.app/dispensadorsp32/"+(String)idc+"/"+(String)a+"-"+(String)m+"-"+(String)d);
    int httpCode2 = http.POST(envio);

    if (httpCode2 > 0) { //Check for the returning code
  
        String payload2 = http.getString();
        Serial.println(httpCode2);
        Serial.println(payload2);
        Serial.println(envio);
      }
  
    else {
      Serial.println("Error on HTTP request");
      Serial.println(httpCode2);
    }
    http.end(); //Free the resources
}
