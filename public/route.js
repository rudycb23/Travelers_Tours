(() => {
  'use strict';
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {

    $stateProvider
      .state('paginaLogin', {
        url: '/',
        templateUrl: './components//paginaLogin/paginaLogin.view.html',
        data: {
          pageTitle: 'Travelers Tours'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paginaLogin/paginaLogin.controller.js')
          }]
        },
        controller: 'controladorLogin',
        controllerAs: 'vm'
      })


      .state('404', {
        url: '/404',
        templateUrl: './404.html',
        data: {
          pageTitle: 'Error 404'
        }
      })

      .state('main', {
        url: '/main',
        templateUrl: './components/main/main.view.html',
        data: {
          pageTitle: 'menu'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/main.controller.js')
          }]
        },
        controller: 'mainController',
        controllerAs: 'vm'
      })

      .state('main.inicio', {
        url: '/inicio',
        templateUrl: './components/main/inicio/inicio.view.html',
        data: {
          pageTitle: 'Inicio'
        }
      })

      .state('main.perfil', {
        url: '/miPerfil',
        templateUrl: './components/usuarios/perfil/perfil.view.html',
        data: {
          pageTitle: 'Mi perfil'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/perfil/perfil.controller.js')
          }]
        },
        controller: 'perfilController',
        controllerAs: 'vm'
      })

      .state('main.modificarCliente', {
        url: '/modificarCliente',
        templateUrl: './components/usuarios/cliente/modificar cliente/modificarCliente.view.html',
        data: {
          pageTitle: 'Modificar cliente'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/cliente/modificar cliente/modificarCliente.controller.js')
          }]
        },
        controller: 'controladorModificarCliente',
        controllerAs: 'vm'
      })


      .state('registrarCliente', {
        url: '/registrarCliente',
        templateUrl: './components/usuarios/cliente/registrarCliente/registrarCliente.view.html',
        data: {
          pageTitle: 'Registrar cliente'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/cliente/registrarCliente/registrarCliente.controller.js')
          }]
        },
        controller: 'controladorRegistrarCliente',
        controllerAs: 'vm'
      })

      .state('main.registrarNuevoCliente', {
        url: '/registrarNuevoCliente',
        templateUrl: './components/usuarios/cliente/AdminRegistraCliente/registrarCliente.view.html',
        data: {
          pageTitle: 'Registrar cliente'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/cliente/AdminRegistraCliente/registrarCliente.controller.js')
          }]
        },
        controller: 'controladorRegistrarCliente',
        controllerAs: 'vm'
      })

      
      .state('main.listarClientes', {
        url: '/listarClientes',
        templateUrl: './components/usuarios/cliente/listarClientes/listarClientes.view.html',
        data: {
          pageTitle: 'Lista de clientes'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/cliente/listarClientes/listarClientes.controller.js')
          }]
        },
        controller: 'controladorListarClientes',
        controllerAs: 'vm'
      })

      .state('main.registrarHotel', {
        url: '/registrarHotel',
        templateUrl: './components/hotel/registrarHotel/registrarHotel.view.html',
        data: {
          pageTitle: 'Registro hotel'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/hotel/registrarHotel/registrarHotel.controller.js')
          }]
        },
        controller: 'controladorRegistroHotel',
        controllerAs: 'vm'
      })

      .state('main.listarHoteles', {
        url: '/listarHoteles',
        templateUrl: './components/hotel/listarHoteles/listarHoteles.view.html',
        data: {
          pageTitle: 'Lista de hoteles'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/hotel/listarHoteles/listarHoteles.controller.js')
          }]
        },
        controller: 'controladorListaHoteles',
        controllerAs: 'vm'
      })

      .state('main.modificarHotel', {
        url: '/modificarHotel',
        templateUrl: './components/hotel/modificarHotel/modificarHotel.view.html',
        data: {
          pageTitle: 'Consultar hotel'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/hotel/modificarHotel/modificarHotel.controller.js')
          }]
        },
        controller: 'controladorModificarHotel',
        controllerAs: 'vm'
      })

      .state('main.acerca', {
        url: '/acerca',
        templateUrl: './components/TravelersTours/travelersTours.view.html',
        data: {
          pageTitle: 'Acerca de esta paágina'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components//TravelersTours/travelersTours.controller.js')
          }]
        },
        controller: 'controladorAcerca',
        controllerAs: 'vm'
      })

      ;

    $urlRouterProvider.otherwise('/');
  }


})();