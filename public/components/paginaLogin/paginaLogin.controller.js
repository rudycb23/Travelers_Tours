(() => {
  'use strict';
  angular
    .module('travelersTours')
    .controller('controladorLogin', controladorLogin);

    controladorLogin.$inject = ['$stateParams', '$state', '$window', 'servicioUsuarios', 'servicioLogin'];

  function controladorLogin($stateParams, $state, $window, servicioUsuarios, servicioLogin) {
    let vm = this;

    vm.usuario = {};

    vm.iniciarSesion = (pusuario) => {

      let inicioCorrecto = servicioLogin.logIn(pusuario);

      if (inicioCorrecto == true){
        $state.go('main.inicio');
      }else{
        swal({
          title: "Por favor verifique sus datos",
          text: "El correo o la contraseña no son corretos",
          icon: "error",
          button: "Aceptar"
        });
      }
    }

    vm.registrar = () => {
      $state.go('registrarCliente');
    }
    
  }
})();