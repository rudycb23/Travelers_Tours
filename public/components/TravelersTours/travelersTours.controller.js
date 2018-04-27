(() => {
    'use strict';
    angular
      .module('travelersTours')
      .controller('controladorAcerca', controladorAcerca);
  
      controladorAcerca.$inject = ['$state', 'servicioUsuarios', 'servicioLogin'];
  
    function controladorAcerca($state, servicioUsuarios, servicioLogin) {
      const vm = this;
  
      vm.modificarCliente = () => {
  
        $state.go('main.modificarCliente');
      }
  
  
      vm.regresar = () => {
        $state.go('main.inicio');
      }
  
      const userAuth = servicioLogin.getAuthUser();
  
      if (userAuth == undefined) {
        $state.go('main.inicio');
      }
  
      vm.usuarioActivo = userAuth;
      vm.rol = userAuth.getRol();
  
    };
  
  
  
  
  })();