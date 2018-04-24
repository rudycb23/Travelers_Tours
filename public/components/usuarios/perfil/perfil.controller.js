(() => {
  'use strict';
  angular
  .module('travelersTours')
  .controller('perfilController', perfilController);

  perfilController.$inject = ['servicioUsuarios', 'servicioLogin']

  function perfilController(servicioUsuarios, servicioLogin){
    const vm = this;

    const userAuth = servicioLogin.getAuthUser();

    if(userAuth == undefined){
      $state.go('main');
    }

    vm.usuarioActivo = userAuth;
    vm.rol = userAuth.getRol();

  };
})();