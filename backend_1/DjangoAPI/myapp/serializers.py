from rest_framework import serializers
from myapp.models import Can,Diagnosticos,DispensadorAlimento,Usuario,Enfermedades,DispensadorAlimentoESP

class CanSerializer(serializers.ModelSerializer):
    class Meta:
        model=Can
        fields=('idcan','nombrecan','edad','peso','genero','altura','idusuario_field','cantidadcons_alimentodia','cantidadcons_aguadia','nitdispensador')
         
class DiagnosticosSerializer(serializers.ModelSerializer):
    class Meta:
        model=Diagnosticos
        fields=('iddiagnosticos','fecha','sintomastext','enfermedadtext','tratamiento','idcan_field')
    
class DispensadorAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model=DispensadorAlimento
        fields=('iddispensador_alimento','consumoalimento_dia','consumoagua_dia','fecha','idcann_field')

class DispensadorAlimentoESPSerializer(serializers.ModelSerializer):
    class Meta:
        model=DispensadorAlimentoESP
        fields=('consumoalimento_dia','consumoagua_dia','fecha','idcann_field')
        
class EnfermedadesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Enfermedades
        fields=('idenfermedades','nombreenfermedad','tratamientos')

        
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields=('idusuario','nombre','correo','contrasena')


    
        