from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import joblib
import pandas as pd

from myapp.models import Can,Diagnosticos,DispensadorAlimento,Usuario,Enfermedades,DispensadorAlimentoESP
from myapp.serializers import CanSerializer,DiagnosticosSerializer,DispensadorAlimentoSerializer,UsuarioSerializer,EnfermedadesSerializer,DispensadorAlimentoESPSerializer


#entrenar modelo 
def prediccion(request, sintomasV):
    
    sintomas =['Dolor en la parte posterior','Anorexia','Decaimiento','Dolor renal','Disminucion de apetito',
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
               'Orina maloliente','Dificultad al orinar','Diarrea verdosa','Secrecion nasal mucosa',
               'Sonidos respiratorios','Hiperqueratosis de los pulpejos','Secrecion nasal verdosa',
               'Retencion de liquidos','Vomito con sangre','Heces con parasitos','Parasitos externos',
               'Bradicardia','comezon orejas','serumen','cabeceo','irritacion en las oreajas',
               'dolor en las orejas','Dolor','Secrecion otica','acaros (Otodectes)',
               'piel enrojecidad','mal olor','erupcciones ventrales con contaminacion bacteriana.',
               'lesiones por contacto al pasto','piel seca','hongos ','escamas en la piel',
               'granos en el estomago','mucosas rojas','areas de lesion infesiosa en piel',
               'oidos congestionados','infesion en la piel','malestar general','debilitacion general',
               'secrecion oidos  cafe lodosa y mal olorosa','deshidratacion','anemia']

    dataFrame = pd.DataFrame(columns=sintomas, index=range(1))
    dataFrame.iloc[0] = sintomasV

    algoritmo = joblib.load('C:/Users/magre/OneDrive/Documentos/codigoTesis/backend_1/modelo_entrenado.pkl')
    prediccion = algoritmo.predict(dataFrame)
    predi = prediccion[0]
    return predi

def sintomasTexto(request, sintomasV):
    sintomas = ['Dolor en la parte posterior', 'Anorexia', 'Decaimiento', 'Dolor renal', 'Disminucion de apetito',
                'Duerme mucho', 'Brote abdominal', 'Caida de pelo', 'Cambio de color de pelo', 'Agitacion',
                'Fiebre alta', 'Tos', 'Laganas', 'Dolor lumbar', 'Letargo', 'Ganglios aumentados', 'Mucosas palidas',
                'Queratitis', 'Baba espesa', 'Fiebre', 'Ojos rojos', 'Ataque canino', 'Bebe poca agua',
                'Vomito amarillo', 'Sarro leve', 'No camina', 'Jadeo', 'Moco', 'Depresion', 'Dolor abdominal craneal',
                'Dolor abdominal', 'No bebe agua', 'Sensibilidad renal', 'orina con sangre', 'defeca con sangre',
                'mal aliento', 'palida ', 'diarrea sanguinolienta', 'alterada inquieta', 'Diarrea', 'Alopecia',
                'Presencia de garrapatas', 'pulgas', 'Vomito', 'prurito intenso', 'Prurito', 'ectoparasitos',
                'obeso', 'Eritema en region dorso lumbar ', 'Eritema en oidos', 'pioderma', 'Eritema',
                'Diarrea verdosa', 'mucosas congestionadas', 'no hace necesidades fisiologicas', 'camina encorbado',
                'Heces con moco', 'ataxia', 'diarrea mucosa', 'cojera', 'papulas', 'temblores musculares', 'taquinea',
                'Nariz seca', 'Diarrea muy liquida', 'Diarrea mal oliente', 'Vomito amarillo con pintas de sangre',
                'Borborigmos aumentados', 'Espectoracion', 'Tos con sangre', 'Convulsiones', 'Estridor traqueal',
                'Estornudos frecuentes', 'Congestion ocular', 'tos seca', 'ojos irritados',
                'secreccion salibal abundante', 'Inflamacion de ganglios faringeos', 'Dolor zona faringea',
                'Lesion en piel', 'Seborrea seca', 'Postulas', 'Descamacion', 'Inflamacion', 'Orina turbia',
                'Orina maloliente', 'Dificultad al orinar', 'Diarrea verdosa', 'Secrecion nasal mucosa',
                'Sonidos respiratorios', 'Hiperqueratosis de los pulpejos', 'Secrecion nasal verdosa',
                'Retencion de liquidos', 'Vomito con sangre', 'Heces con parasitos', 'Parasitos externos',
                'Bradicardia', 'comezon orejas', 'serumen', 'cabeceo', 'irritacion en las oreajas',
                'dolor en las orejas', 'Dolor', 'Secrecion otica', 'acaros (Otodectes)',
                'piel enrojecidad', 'mal olor', 'erupcciones ventrales con contaminacion bacteriana.',
                'lesiones por contacto al pasto', 'piel seca', 'hongos ', 'escamas en la piel',
                'granos en el estomago', 'mucosas rojas', 'areas de lesion infesiosa en piel',
                'oidos congestionados', 'infesion en la piel', 'malestar general', 'debilitacion general',
                'secrecion oidos  cafe lodosa y mal olorosa', 'deshidratacion', 'anemia']
    
    
    sintomasT = ""
    for i in range(0,len(sintomas)):
        if sintomasV[i] == 1:
            if sintomasT=="":
                sintomasT = sintomasT+sintomas[i]
            else:
                sintomasT = sintomasT+", "+sintomas[i]
        
    
    
    return sintomasT
    

# consultas desde la SP32
@csrf_exempt
def canApiSP32(request, nit=""):
    if request.method=='GET':
        try:
            can_asignado = Can.objects.get(nitdispensador=nit)
        except Can.DoesNotExist:
            can_asignado = None
        if (can_asignado is None):
            return JsonResponse( {'nit no existe'} ,safe=False);    
        else :   
            can_serializer=CanSerializer(can_asignado)
            return JsonResponse(can_serializer.data,safe=False);

         
 
@csrf_exempt
def dispensadorApiSP32(request, idcan=0, dat=''):
    if request.method=='POST':
        try:
            dispensador_asignado = DispensadorAlimentoESP.objects.get(idcann_field=idcan, fecha=dat)
        except DispensadorAlimentoESP.DoesNotExist:
            dispensador_asignado = None
            
        if (dispensador_asignado is None):
            dispensadoralimento_data=JSONParser().parse(request)
            dispensadoralimento_serializer=DispensadorAlimentoESPSerializer(data=dispensadoralimento_data)
            if dispensadoralimento_serializer.is_valid():
                dispensadoralimento_serializer.save()
                return JsonResponse("added Successfully",safe=False)
            return JsonResponse("Failed to Add",safe=False)
        else:
            dispensadoralimento_data=JSONParser().parse(request)
            dispensadoralimento=DispensadorAlimentoESP.objects.get(idcann_field=idcan, fecha=dat)
            dispensadoralimento_serializer=DispensadorAlimentoESPSerializer(dispensadoralimento,data=dispensadoralimento_data)
            if dispensadoralimento_serializer.is_valid():
                dispensadoralimento_serializer.save()
                return JsonResponse("Update Successfully",safe=False)
            return JsonResponse("Failed to Update", safe=False)
        
# Create your views here.

@csrf_exempt
def usuarioApi(request, id=0):
    if request.method=='GET':
        """usuario = Usuario.objects.all()
        usuario_serializer=UsuarioSerializer(usuario,many=True)
        return JsonResponse(usuario_serializer.data,safe=False)"""
        
    
    
    elif request.method=='POST':
        try:
            usuario_data = JSONParser().parse(request)
            usuario_asignado = Usuario.objects.get(correo=usuario_data['correo'], contrasena=usuario_data['contrasena'])
        except Usuario.DoesNotExist:
            usuario_asignado = None
            
        if(usuario_asignado is None):
           return JsonResponse("usuario no existe",safe=False);
        else:
           try:
                can_asignado = Can.objects.filter(idusuario_field=usuario_asignado.idusuario)
           except Can.DoesNotExist:
                can_asignado = None
           if (can_asignado is None):
                return JsonResponse('vacio', safe=False)
           else:
                can_serializer = CanSerializer(can_asignado, many=True)
                response_data = can_serializer.data                
                return JsonResponse(response_data, safe=False)
            
           
            
            #usuario_serializer=UsuarioSerializer(usuario_asignado)
            #return JsonResponse(usuario_serializer.data,safe=False);
    elif request.method=='PUT':
        usuario_data=JSONParser().parse(request)
        usuario=Usuario.objects.get(idusuario=usuario_data['idusuario'])
        usuario_serializer=UsuarioSerializer(usuario,data=usuario_data)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method=='DELETE':
        usuario=Usuario.objects.get(idusuario=id)
        usuario.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    

@csrf_exempt
def usuario(request, correo="", contrasena=""):
    if request.method == 'GET':
        try:
            usuario_asignado = Usuario.objects.get(correo=correo,contrasena=contrasena)
        except Usuario.DoesNotExist:
            usuario_asignado = None
        if (usuario_asignado is None):
            return JsonResponse({'no extste usuario'}, safe=False)
        else:
            usuario_serializer = UsuarioSerializer(usuario_asignado)
            return JsonResponse(usuario_serializer.data, safe=False)
    
@csrf_exempt    
def registrarApi(request):
    if request.method == 'POST':
       try:
            usuario_data = JSONParser().parse(request)
            registro_asignado = Usuario.objects.get(correo=usuario_data['correo'])
       except Usuario.DoesNotExist:
            registro_asignado = None
            
       if (registro_asignado is None):
            usuario_serializer=UsuarioSerializer(data=usuario_data)
            if usuario_serializer.is_valid():
                usuario_serializer.save()
                return JsonResponse("added Successfully",safe=False)
            return JsonResponse("Failed to Add",safe=False)
       else:
            return JsonResponse("Usuario ya existe ", safe=False)
    elif request.method == 'GET':
       try:
            usuario_data = JSONParser().parse(request)
            usuario_asignado = Usuario.objects.get(correo=usuario_data['correo'], contrasena=usuario_data['contrasena'])
       except Usuario.DoesNotExist:
            usuario_asignado = None
            
       if (usuario_asignado is None):
            usuario_serializer=UsuarioSerializer(data=usuario_data)
            return JsonResponse("usuario no existe",safe=False);
       else:
           usuario_serializer=UsuarioSerializer(usuario_asignado)
           return JsonResponse(usuario_serializer.data,safe=False);
        

@csrf_exempt
def canApi(request, id=0):
    if request.method=='GET':
        try:
            can_asignado = Can.objects.filter(idusuario_field=id)
        except Can.DoesNotExist:
            can_asignado = None
        if (can_asignado is None):
            return JsonResponse({'vacio'}, safe=False)
        else:
            can_serializer = CanSerializer(
                can_asignado, many=True)
            return JsonResponse(can_serializer.data, safe=False)
        
        
    elif request.method=='POST':
        can_data=JSONParser().parse(request)
        print(can_data)
        can_serializer=CanSerializer(data=can_data)
        if can_serializer.is_valid():
            can_serializer.save()
            return JsonResponse("added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        can_data=JSONParser().parse(request)
        can=Can.objects.get(idcan=can_data['idcan'])
        can_serializer=CanSerializer(can,data=can_data)
        if can_serializer.is_valid():
            can_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to Update", safe= False)
    elif request.method=='DELETE':
        can=Can.objects.get(idcan=id)
        can.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    

@csrf_exempt
def dispensadoralimentoApi(request, id=0):
    if request.method=='GET':
        try:
            dispensador_asignado = DispensadorAlimento.objects.filter(
                idcann_field=id)
        except DispensadorAlimento.DoesNotExist:
            dispensador_asignado = None
        if (dispensador_asignado is None):
            return JsonResponse({'no existe control de comida'}, safe=False)
        else:
            dispensador_serializer = DispensadorAlimentoSerializer(dispensador_asignado, many=True)
            return JsonResponse(dispensador_serializer.data, safe=False)
    elif request.method=='POST':
        dispensadoralimento_data=JSONParser().parse(request)
        dispensadoralimento_serializer=DispensadorAlimentoSerializer(data=dispensadoralimento_data)
        if dispensadoralimento_serializer.is_valid():
            dispensadoralimento_serializer.save()
            return JsonResponse("added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        dispensadoralimento_data=JSONParser().parse(request)
        dispensadoralimento=DispensadorAlimento.objects.get(iddispensador_alimento=dispensadoralimento_data['iddispensador_alimento'])
        dispensadoralimento_serializer=DispensadorAlimentoSerializer(dispensadoralimento,data=dispensadoralimento_data)
        if dispensadoralimento_serializer.is_valid():
            dispensadoralimento_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method=='DELETE':
        dispensadoralimento=DispensadorAlimento.objects.get(iddispensador_alimento=id)
        dispensadoralimento.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    

@csrf_exempt
def diagnosticosApi(request, id=0):
    if request.method=='POST':
        diag_data=JSONParser().parse(request)
        #print (prediccion(request,diagnosticos_data["sintomas"]))
        id = (prediccion(request, diag_data["selectedSintomas"]))+1
        sintomasG = sintomasTexto(request, diag_data["selectedSintomas"])
        #print(sintomasTexto(request, diagnosticos_data["sintomas"]))
        enfermedad_asignado = Enfermedades.objects.get(idenfermedades=id)
        enfermedad_serializer = EnfermedadesSerializer(enfermedad_asignado)
        diccionarioEnf = enfermedad_serializer.data
        diagnosticos_data = {
            "fecha": diag_data["fecha"],
            "sintomastext": sintomasG,
            "enfermedadtext": diccionarioEnf["nombreenfermedad"],
            "tratamiento": diccionarioEnf["tratamientos"],
            "idcan_field": diag_data["idcan"]
        }
        diagnosticos_serializer = DiagnosticosSerializer(data=diagnosticos_data)
        if diagnosticos_serializer.is_valid():
            diagnosticos_serializer.save()
            return JsonResponse(diagnosticos_serializer.data, safe=False)
        return JsonResponse("Failed to Add", safe=False)   
    elif request.method == 'GET':
        try:
            diagnosticos_asignado = Diagnosticos.objects.filter(idcan_field=id)
        except Diagnosticos.DoesNotExist:
            diagnosticos_asignado = None
        if (diagnosticos_asignado is None):
            return JsonResponse({'no existe diagnostico'}, safe=False)
        else:
            diagnosticos_serializer = DiagnosticosSerializer(diagnosticos_asignado, many=True)
            return JsonResponse(diagnosticos_serializer.data, safe=False)
    elif request.method == 'DELETE':
        diagnosticos = Diagnosticos.objects.get(iddiagnosticos=id)
        diagnosticos.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
    if request.method == 'POST':
        diag_data = JSONParser().parse(request)
        # print (prediccion(request,diagnosticos_data["sintomas"]))
        id = (prediccion(request, diag_data["selectedSintomas"]))+1
        sintomasG = sintomasTexto(request, diag_data["selectedSintomas"])
        # print(sintomasTexto(request, diagnosticos_data["sintomas"]))
        enfermedad_asignado = Enfermedades.objects.get(idenfermedades=id)
        enfermedad_serializer = EnfermedadesSerializer(enfermedad_asignado)
        diccionarioEnf = enfermedad_serializer.data
        diagnosticos_data = {
            "fecha": diag_data["fecha"],
            "sintomastext": sintomasG,
            "enfermedadtext": diccionarioEnf["nombreenfermedad"],
            "tratamiento": diccionarioEnf["tratamientos"],
            "idcan_field": diag_data["idcan"]
        }
        diagnosticos_serializer = DiagnosticosSerializer(
            data=diagnosticos_data)
        if diagnosticos_serializer.is_valid():
            diagnosticos_serializer.save()
            return JsonResponse(diagnosticos_serializer.data, safe=False)
        return JsonResponse("Failed to Update", safe=False)
    
    
        
    """elif request.method=='GET':
        diagnosticos = Diagnosticos.objects.all()
        diagnosticos_serializer=DiagnosticosSerializer(diagnosticos,many=True)
        return JsonResponse(diagnosticos_serializer.data,safe=False)
    elif request.method=='POST':
        diagnosticos_data=JSONParser().parse(request)
        diagnosticos_serializer=DiagnosticosSerializer(data=diagnosticos_data)
        if diagnosticos_serializer.is_valid():
            diagnosticos_serializer.save()
            return JsonResponse("added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        diagnosticos_data=JSONParser().parse(request)
        diagnosticos=Diagnosticos.objects.get(iddiagnosticos=diagnosticos_data['iddiagnosticos'])
        diagnosticos_serializer=DiagnosticosSerializer(diagnosticos,data=diagnosticos_data)
        if diagnosticos_serializer.is_valid():
            diagnosticos_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to Update", safe =False)
    elif request.method=='DELETE':
        diagnosticos=Diagnosticos.objects.get(iddiagnosticos=id)
        diagnosticos.delete()
        return JsonResponse("Deleted Successfully",safe=False)"""
    
    
@csrf_exempt
def enfermedadesApi(request, id=0):
    if request.method=='GET':
        enfermedades = Enfermedades.objects.all()
        enfermedades_serializer=EnfermedadesSerializer(enfermedades,many=True)
        return JsonResponse(enfermedades_serializer.data,safe=False)
    elif request.method=='POST':
        enfermedades_data=JSONParser().parse(request)
        enfermedades_serializer=EnfermedadesSerializer(data=enfermedades_data)
        print("ss:",enfermedades_serializer)
        if enfermedades_serializer.is_valid():
            enfermedades_serializer.save()
            return JsonResponse("added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        enfermedades_data=JSONParser().parse(request)
        enfermedades=Enfermedades.objects.get(idenfermedades=enfermedades_data['idenfermedades'])
        enfermedades_serializer=EnfermedadesSerializer(enfermedades,data=enfermedades_data)
        if enfermedades_serializer.is_valid():
            enfermedades_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method=='DELETE':
        enfermedades=Enfermedades.objects.get(idenfermedades=id)
        enfermedades.delete()
        return JsonResponse("Deleted Successfully",safe=False)