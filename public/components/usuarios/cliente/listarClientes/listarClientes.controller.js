(() => {
  'use strict';
  angular
    .module('travelersTours')
    .controller('controladorListarClientes', controladorListarClientes);

  controladorListarClientes.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'servicioLogin'];

  function controladorListarClientes($stateParams, $state, servicioUsuarios, servicioLogin) {

    const userAuth = servicioLogin.getAuthUser();

    let vm = this;

    vm.listaDeUsuarios = servicioUsuarios.obtenerListaFiltrada();

  }
})();