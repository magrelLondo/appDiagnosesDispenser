from django.urls import path, re_path
from myapp import views

urlpatterns = [
    re_path(r'^usuario$',views.usuarioApi),
    re_path(r'^usuario/([0-9]+)$',views.usuarioApi),
    re_path(r'^can$',views.canApi),
    re_path(r'^can/([0-9]+)$',views.canApi),
    re_path(r'^dispensador$',views.dispensadoralimentoApi),
    re_path(r'^dispensador/([0-9]+)$',views.dispensadoralimentoApi),  
    re_path(r'^diagnosticos$',views.diagnosticosApi),
    re_path(r'^diagnosticos/([0-9]+)$',views.diagnosticosApi),
    re_path(r'^enfermedades$',views.enfermedadesApi),
    re_path(r'^enfermedades/([0-9]+)$',views.enfermedadesApi),
    # SP32
    # si el nit son letras en alguna circunstancia, todo se va al carajos
    path('cansp32/<nit>', views.canApiSP32),
    path('dispensadorsp32/<idcan>/<dat>',views.dispensadorApiSP32),
    path('diagnosticos/<id>', views.diagnosticosApi),
    path('dispensador/<id>',views.dispensadoralimentoApi),
    path('can/<id>', views.canApi),
    #aplicacion movil
    #path('registrar/<correoE>', views.registrarApi)
    path('registrar', views.registrarApi),
    path('usuario1/<correo>/<contrasena>', views.usuario)
    #re_path(r'^apisp32/([0-9]+)$',views.canApiSP32)
]
