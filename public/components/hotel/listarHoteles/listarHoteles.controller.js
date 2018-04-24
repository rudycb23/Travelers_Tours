(() => {
    'use strict';
    angular
        .module('travelersTours')
        .controller('controladorListaHoteles', controladorListaHoteles);

    controladorListaHoteles.$inject = ['$stateParams', '$state', 'servicioHoteles', 'servicioLogin'];

    function controladorListaHoteles($stateParams, $state, servicioHoteles, servicioLogin) {

        const userAuth = servicioLogin.getAuthUser();

        let vm = this;

        vm.listaHoteles = servicioHoteles.retornarHotelAct();

        vm.listaHotelesDes = servicioHoteles.retornarHotelDesact();

    }
})();