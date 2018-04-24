(() => {
  'use strict';
  angular
    .module('travelersTours')
    .controller('mainController', mainController);

  mainController.$inject = ['$state', 'servicioLogin'];

  function mainController($state, servicioLogin) {

    const userAuth = servicioLogin.getAuthUser();

    if (userAuth == undefined) {
      $state.go('paginaInicio');
    }

    const vm = this;
    vm.rolUsuario = userAuth.getRol();


    vm.cerrarSesion = () => {
      swal("¿Desea cerrar la sesión?", {
        buttons: {
          cancel: "Cancelar",
          cerrarSesion: {
            text: "Cerrar sesión",
            value: "cerrarSesion",
          },
        },
      })
        .then((value) => {
          switch (value) {
            case "cerrarSesion":
              servicioLogin.logOut();
              $state.go('paginaLogin');
              break;

            default:
              break;
          }
        });
    };
  };
})();


