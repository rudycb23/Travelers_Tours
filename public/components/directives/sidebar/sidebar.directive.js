(() => {
  'use strict';
  angular
  .module('travelersTours')
  .directive('menuLateral', menuLateral);
  
  menuLateral.$inject = ['$state', 'servicioInicioSesion'];
  
  function menuLateral($state, servicioInicioSesion){

    let sidebarController = function () {  
      const userAuth = servicioInicioSesion.getAuthUser();
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
                servicioInicioSesion.logOut();
                $state.go('paginaInicio');
                swal({
                  title: "Sesión cerrada correctamente",
                  text: "Se ha finalizado su sesión correctamente",
                  icon: "success",
                  button: "Aceptar",
                });
              break;

              default:
                break;
            }
          });
      };
    };

    let sidebar = {
      templateUrl: '/components/directives/sidebar/sidebar.view.html',
      restrict: 'EA',
      controller: sidebarController,
      require: "ngClick",
      controllerAs: 'vm',
    };

    return sidebar;
  }
})();