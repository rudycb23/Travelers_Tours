(() => {
    'use strict';
    angular
        .module('travelersTours')
        .controller('controladorListaHoteles', controladorListaHoteles);

    controladorListaHoteles.$inject = ['$stateParams', '$state', 'servicioHoteles', 'servicioLogin', 'NgMap'];

    function controladorListaHoteles($stateParams, $state, servicioHoteles, servicioLogin, NgMap) {

        let vm = this;
        const userAuth = servicioLogin.getAuthUser();



        vm.rol = userAuth.getRol();

        vm.listaHoteles = servicioHoteles.retornarHotelAct();

        vm.listaHotelesDes = servicioHoteles.retornarHotelDesact();

        vm.mapa = servicioHoteles.retornarMapa()


        vm.ordenNombre = () => {
            vm.listaHoteles = servicioHoteles.ordenarNombre();
        }

        let mayorMenor = true;

        vm.ordenRate = () => {

            vm.listaHoteles = servicioHoteles.ordenarRate(mayorMenor);
            if (mayorMenor == false) {
                mayorMenor = true;
            } else {
                if (mayorMenor == true) {
                    mayorMenor = false;
                }
            }

        }


        vm.desactivarHotel = (pHotel) => {
            let estadohotel = false;
            let objHotel = new Hotel(pHotel.idHotel, pHotel.nombreHotel, pHotel.provincia, pHotel.canton, pHotel.distrito, pHotel.direccion, pHotel.telefonoServicio, pHotel.correoServicio, pHotel.telefonoReservaciones, pHotel.correoReservaciones, pHotel.fotoHotel, pHotel.valoracion, estadohotel, pHotel.latitud, pHotel.longitud, pHotel.mapa, pHotel.cantRates, pHotel.totalValor);
            servicioHoteles.editarHotel(objHotel);
            $state.reload();
        }//

        vm.activarHotel = (pHotel) => {
            let estadohotel = true;
            let objHotel = new Hotel(pHotel.idHotel, pHotel.nombreHotel, pHotel.provincia, pHotel.canton, pHotel.distrito, pHotel.direccion, pHotel.telefonoServicio, pHotel.correoServicio, pHotel.telefonoReservaciones, pHotel.correoReservaciones, pHotel.fotoHotel, pHotel.valoracion, estadohotel, pHotel.latitud, pHotel.longitud, pHotel.mapa, pHotel.cantRates, pHotel.totalValor);
            servicioHoteles.editarHotel(objHotel);
            $state.reload();
        }//


        vm.consultar = (pidHotel) => {
            servicioHoteles.agregarDatosSession(pidHotel);
            $state.go('main.modificarHotel');
        }
        vm.regresar = () => {
            $state.go('main.inicio');
        }
    }
})();