(() => {
  'use strict';
  angular
  .module('correosCR')
  .controller('perfilController', perfilController);

  perfilController.$inject = ['servicioUsuarios', 'servicioInicioSesion']

  function perfilController(servicioUsuarios, servicioInicioSesion){
    const vm = this;

    const userAuth = servicioInicioSesion.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }

    vm.usuarioActivo = userAuth;
    vm.rol = userAuth.getRol();

  };
})();