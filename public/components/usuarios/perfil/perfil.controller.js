(() => {
  'use strict';
  angular
    .module('travelersTours')
    .controller('perfilController', perfilController);

  perfilController.$inject = ['$state', 'servicioUsuarios', 'servicioLogin'];

  function perfilController($state, servicioUsuarios, servicioLogin) {
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