(() =>{
  'use strict';
  angular
  .module('travelersTours')
  .controller('mainController', mainController);

  mainController.$inject = ['$state', 'servicioInicioSesion'];

  function mainController($state, servicioInicioSesion){

    const userAuth = servicioInicioSesion.getAuthUser();

    if(userAuth == undefined){
      $state.go('paginaInicio');
    }

    const vm = this;
    vm.rolUsuario = userAuth.getRol();

  };
})();