(() => {
  'use strict'

  angular
  .module('correosCR')
  .controller('controladorListaTodosRepartidores', controladorListaTodosRepartidores)

  controladorListaTodosRepartidores.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorListaTodosRepartidores($stateParams, $state, servicioUsuarios){
    let vm = this;

    vm.listarRepartidoresActDisponibles = servicioUsuarios.obtenerlistadeFiltrada(4);


  }
})();