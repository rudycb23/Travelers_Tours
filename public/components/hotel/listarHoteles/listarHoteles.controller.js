(() => {
    'use strict';
    angular
        .module('travelersTours')
        .controller('controladorListaHoteles', controladorListaHoteles);

    controladorListaHoteles.$inject = ['$stateParams', '$state', 'servicioHoteles', 'servicioLogin'];

    function controladorListaHoteles($stateParams, $state, servicioHoteles, servicioLogin) {

        const userAuth = servicioLogin.getAuthUser();

        let vm = this;
        vm.rol = userAuth.getRol();

        vm.listaHoteles = servicioHoteles.retornarHotelAct();

        vm.listaHotelesDes = servicioHoteles.retornarHotelDesact();


        vm.desactivarHotel = (pHotel) => {
            let estadohotel = false;
            let objHotel = new Hotel (pHotel.idHotel, pHotel.nombreHotel, pHotel.provincia, pHotel.canton, pHotel.distrito, pHotel.direccion, pHotel.telefonoServicio, pHotel.correoServicio, pHotel.telefonoReservaciones, pHotel.correoReservaciones, pHotel.fotoHotel, pHotel.valoracion, estadohotel);
            servicioHoteles.editarHotel(objHotel);
            $state.reload();
        }//

        vm.activarHotel = (pHotel) => {
            let estadohotel = true;
            let objHotel = new Hotel (pHotel.idHotel, pHotel.nombreHotel, pHotel.provincia, pHotel.canton, pHotel.distrito, pHotel.direccion, pHotel.telefonoServicio, pHotel.correoServicio, pHotel.telefonoReservaciones, pHotel.correoReservaciones, pHotel.fotoHotel, pHotel.valoracion, estadohotel);
            servicioHoteles.editarHotel(objHotel);
            $state.reload();
        }//


        vm.consultar = (pHotel) => {
            $state.go('main.modificarHotel', { objHotelMod: JSON.stringify(pHotel) });
        }
    }
})();