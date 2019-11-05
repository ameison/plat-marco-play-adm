'use strict';

angular.module('app.admin', ['ui.router', 'ngMessages', 'ui.bootstrap', 'chart.js']).

  config(function($stateProvider, $urlRouterProvider) {

      $stateProvider

      .state('admin.secciones', {
          url: '/secciones',
          views: {
              "content@app": {
                  controller: 'SeccionesCtrl',
                  templateUrl: 'templates/admin/views/secciones/lista.html'
              }
          },
          data: {
            "title": "Secciones",
            "description": "Gestión de secciones"
          }

      })

      .state('admin.nueva-seccion', {
          url: '/secciones/nuevo',
          views: {
              "content@app": {
                  controller: 'SeccionesCtrl',
                  templateUrl: 'templates/admin/views/secciones/nuevo.html'
              }
          },
          data: {
            "title": "Registrar Sección",
            "description": "Diseñador de nuevas secciones"
          }

      })

      .state('admin.editar-seccion', {
          url: '/seccion/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/secciones/editar.html',
                  controller: 'SeccionesEditCtrl'
              }
          },
          data: {
            "title": "Edición de secciones",
            "description": "Edición de secciones registradas anteriormente"
          }

      })

      .state('admin.categorias', {
          url: '/categorias',
          views: {
              "content@app": {
                  controller: 'CategoriasCtrl',
                  templateUrl: 'templates/admin/views/categorias/lista.html'
              }
          },
          data: {
            "title": "Categorías",
            "description": "Gestión de categorías"
          }

      })

      .state('admin.nueva-categoria', {
          url: '/categoria/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/categorias/nuevo.html',
                  controller: 'CategoriasCtrl'
              }
          },
          data: {
            "title": "Registrar Categoría",
            "description": "Gestión de nuevas categorías"
          }

      })

      .state('admin.editar-categoria', {
          url: '/categoria/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/categorias/editar.html',
                  controller: 'CategoriasEditCtrl'
              }
          },
          data: {
            "title": "Edición de categorías",
            "description": "Edición de categorías registradas anteriormente"
          }

      })

      .state('admin.minas', {
          url: '/minas',
          views: {
              "content@app": {
                  controller: 'MinasCtrl',
                  templateUrl: 'templates/admin/views/minas/lista.html'
              }
          },
          data: {
            "title": "Minas",
            "description": "Gestión de minas"
          }

      })

      .state('admin.nueva-mina', {
          url: '/mina/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/minas/nuevo.html',
                  controller: 'MinasCtrl'
              }
          },
          data: {
            "title": "Registrar Mina",
            "description": "Gestión de nuevas minas"
          }

      })

      .state('admin.editar-mina', {
          url: '/mina/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/minas/editar.html',
                  controller: 'MinasEditCtrl'
              }
          },
          data: {
            "title": "Edición de minas",
            "description": "Edición de minas registradas anteriormente"
          }

      })

      .state('admin.superintendencias', {
          url: '/superintendencias',
          views: {
              "content@app": {
                  controller: 'SuperintendenciasCtrl',
                  templateUrl: 'templates/admin/views/superintendencias/lista.html'
              }
          },
          data: {
            "title": "Superintendencias",
            "description": "Gestión de superintendencias"
          }

      })

      .state('admin.nueva-superintendencia', {
          url: '/superintendencia/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/superintendencias/nuevo.html',
                  controller: 'SuperintendenciasCtrl'
              }
          },
          data: {
            "title": "Registrar Superintendencia",
            "description": "Gestión de nuevas superintendencias"
          }

      })

      .state('admin.editar-superintendencia', {
          url: '/superintendencia/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/superintendencias/editar.html',
                  controller: 'SuperintendenciasEditCtrl'
              }
          },
          data: {
            "title": "Edición de superintendencias",
            "description": "Edición de superintendencias registradas anteriormente"
          }

      })

      .state('admin.modelos', {
          url: '/modelos',
          views: {
              "content@app": {
                  controller: 'ModelosCtrl',
                  templateUrl: 'templates/admin/views/modelos/lista.html'
              }
          },
          data: {
            "title": "Modelos",
            "description": "Gestión de modelos"
          }

      })

      .state('admin.nuevo-modelo', {
          url: '/modelo/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/modelos/nuevo.html',
                  controller: 'ModelosCtrl'
              }
          },
          data: {
            "title": "Registrar Modelos",
            "description": "Gestión de nuevos modelos"
          }

      })

      .state('admin.editar-modelo', {
          url: '/modelo/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/modelos/editar.html',
                  controller: 'ModelosEditCtrl'
              }
          },
          data: {
            "title": "Edición de Modelos",
            "description": "Edición de modelos registrados anteriormente"
          }

      })

      .state('admin.formatos', {
          url: '/formatos',
          views: {
              "content@app": {
                  controller: 'FormatosCtrl',
                  templateUrl: 'templates/admin/views/formatos/lista.html'
              }
          },
          data: {
            "title": "Formatos",
            "description": "Gestión de formatos"
          }
      })

      .state('admin.nuevo-formato', {
          url: '/formato/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/formatos/nuevo.html',
                  controller: 'FormatosCtrl'
              }
          },
          data: {
            "title": "Registrar Formatos",
            "description": "Gestión de nuevos Formatos"
          }

      })

      .state('admin.editar-formato', {
          url: '/formato/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/formatos/editar.html',
                  controller: 'FormatosEditCtrl'
              }
          },
          data: {
            "title": "Edición de Formatos",
            "description": "Edición de formatos registrados anteriormente"
          }

      })

      .state('admin.equipos', {
          url: '/equipos',
          views: {
              "content@app": {
                  controller: 'EquiposCtrl',
                  templateUrl: 'templates/admin/views/equipos/lista.html'
              }
          },
          data: {
            "title": "Equipos",
            "description": "Gestión de equipos"
          }

      })

      .state('admin.nuevo-equipo', {
          url: '/equipo/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/equipos/nuevo.html',
                  controller: 'EquiposCtrl'
              }
          },
          data: {
            "title": "Registrar Equipos",
            "description": "Gestión de nuevos Equipos"
          }

      })

      .state('admin.editar-equipo', {
          url: '/equipo/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/equipos/editar.html',
                  controller: 'EquiposEditCtrl'
              }
          },
          data: {
            "title": "Edición de equipos",
            "description": "Edición de equipos registradas anteriormente"
          }

      })

      .state('admin.seguimiento-mantpre', {
          url: '/seguimiento-mantenimiento-preventivo',
          views: {
              "content@app": {
                  controller: 'MantenimientoPreventivoCtrl',
                  templateUrl: 'templates/admin/views/graficos/seguimientoMantPre.html'
              }
          },
          data: {
            "title": "Seguimiento de inspección",
            "description": "Gráfico seguimiento de inspecciónes mantenimiento preventivo."
          }
      })

      .state('admin.seguimiento-correctivo', {
          url: '/seguimiento-mantenimiento-correctivo',
          views: {
              "content@app": {
                  controller: 'MantenimientoCorrectivoCtrl',
                  templateUrl: 'templates/admin/views/graficos/seguimientoCorrectivo.html'
              }
          },
          data: {
            "title": "Seguimiento de inspección",
            "description": "Gráfico seguimiento de eventos."
          }
      })

      .state('admin.seguimiento-temperatura', {
          url: '/seguimiento-monitoreo-temperatura',
          views: {
              "content@app": {
                  controller: 'MonitoreoTemperaturaCtrl',
                  templateUrl: 'templates/admin/views/graficos/seguimientoTemperatura.html'
              }
          },
          data: {
            "title": "Seguimiento de inspección",
            "description": "Gráfico seguimiento de inspecciónes monitoreo de temperatura."
          }
      })

      .state('admin.consulta-linea', {
          url: '/consulta-linea',
          views: {
              "content@app": {
                  controller: 'ConsultaLineaCtrl',
                  templateUrl: 'templates/admin/views/consultalinea/lista.html'
              }
          },
          data: {
            "title": "Consultas en linea",
            "description": "Consulta de las inspecciones"
          }
      })

      .state('admin.editar-inspeccion', {
          url: '/inspeccion/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/consultalinea/editar.html',
                  controller: 'InspeccionEditCtrl'
              }
          },
          data: {
            "title": "Edición de inspecciones",
            "description": "Edición de inspecciones realizadas en campo"
          }

      })

      .state('admin.usuarios', {
          url: '/usuarios',
          views: {
              "content@app": {
                  controller: 'UsuariosCtrl',
                  templateUrl: 'templates/admin/views/usuarios/lista.html'
              }
          },
          data: {
            "title": "Usuarios",
            "description": "Gestión de usuarios"
          }

      })


      .state('admin.editar-usuario', {
          url: '/usuario/:id',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/usuarios/editar.html',
                  controller: 'UsuariosEditCtrl'
              }
          },
          data: {
            "title": "Edición de Usuario",
            "description": "Edición de usuarios registrados anteriormente"
          }

      })


      .state('admin.nuevo-usuario', {
          url: '/usuarios/nuevo',
          views: {
              "content@app": {
                  templateUrl: 'templates/admin/views/usuarios/nuevo.html',
                  controller: 'UsuariosCtrl'
              }
          },
          data: {
            "title": "Registrar Usuario",
            "description": "Gestión de nuevos usuarios"
          }

      })


      .state('admin', {
          abstract: true,
          views: {
              "root@app": {
                  controller: 'MasterCtrl',
                  templateUrl: 'templates/admin/views/layouts/base.html'
              }
          }
      })

      // .state('admin.principal', {
      //     url: '/',
      //     views: {
      //         "content@app": {
      //             controller: 'MasterCtrl',
      //             templateUrl: 'templates/admin/views/principal.html'
      //         }
      //     },
      //     data: {
      //       "title": "Panel",
      //       "description": "Resumen de actividades"
      //     }
      //
      // })

      .state('admin.principal', {
          url: '/',
          views: {
              "content@app": {
                  controller: 'PrincipalCtrl',
                  templateUrl: 'templates/admin/views/principal.html'
              }
          },
          data: {
            "title": "Panel",
            "description": "Resumen de actividades"
          }

      })

      function loginRequired($q, $location, $auth) {
          var deferred = $q.defer();
          if ($auth.isAuthenticated()) {
              deferred.resolve();
          } else {
              $location.path('/login');
          }
          return deferred.promise;
      }

      $urlRouterProvider.otherwise('/');

});
