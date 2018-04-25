(() => {
    'use strict';
    angular
        .module('travelersTours')
        .service('servicioHoteles', servicioHoteles);

    servicioHoteles.$inject = ['$q', '$log', '$http', 'dataStorageFactory', 'localStorageFactory'];

    function servicioHoteles($q, $log, $http, dataStorageFactory, localStorageFactory) {

        let publicAPI = {
            agregarHotel: _agregarHotel,
            retornarHotel: _retornarHotel,
            editarHotel: _editarHotel,
            retornarHotelDesact: _retornarHotelDesact,
            retornarHotelAct: _retornarHotelAct,
            consultarDatosSession: _consultarDatosSession

        }

        return publicAPI;


        function _retornarHotelAct() {
            let hotelLS = dataStorageFactory.getHotelData(),
                hotelAct = [],
                hotelActLS = [];

            if (hotelLS == null) {
                return hotelActLS;
            } else {
                for (let i = 0; i < hotelLS.length; i++) {
                    if (hotelLS[i].estadohotel == true) {
                        hotelAct.push(hotelLS[i]);
                    }
                }
                hotelAct.forEach(objTemp => {
                    let objhotelAct = new Hotel(objTemp.idHotel, objTemp.nombreHotel, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.direccion, objTemp.telefonoServicio, objTemp.correoServicio, objTemp.telefonoReservaciones, objTemp.correoReservaciones, objTemp.fotoHotel, objTemp.valoracion, objTemp.estadohotel);

                    hotelActLS.push(objhotelAct);
                });
                return hotelActLS;
            }
        }
        function _retornarHotelDesact() {
            let hotelLS = dataStorageFactory.getHotelData(),
                hotelDesact = [],
                hotelDesactLS = [];

            if (hotelLS == null) {
                return hotelDesactLS;
            } else {
                for (let i = 0; i < hotelLS.length; i++) {
                    if (hotelLS[i].estadohotel == false) {
                        hotelDesact.push(hotelLS[i]);
                    }
                }

                hotelDesact.forEach(objTemp => {
                    let objhotelDesact = new Hotel(objTemp.idHotel, objTemp.nombreHotel, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.direccion, objTemp.telefonoServicio, objTemp.correoServicio, objTemp.telefonoReservaciones, objTemp.correoReservaciones, objTemp.fotoHotel, objTemp.valoracion, objTemp.estadohotel);

                    hotelDesactLS.push(objhotelDesact);
                });
                return hotelDesactLS
            }
        }

        function _agregarHotel(pHotelNuevo) {

            let listahotel = _retornarHotel();
            let validarCodigo = true;
            let tamanno = listahotel.length;
            for (let i = 0; i < tamanno; i++) {
                if (pHotelNuevo.getIdHotel() == listahotel[i].getIdHotel()) {
                    validarCodigo = false;
                }
            }

            if (validarCodigo == true) {
  
                dataStorageFactory.setHotelData(pHotelNuevo);
            }
            return validarCodigo;
        }// fin función agregar

        function _retornarHotel() {

            let listaHotelLocal = dataStorageFactory.getHotelData(),
                hotelTemp = [];

            if (listaHotelLocal == null) {

                return hotelTemp;
            } else {
                listaHotelLocal.forEach(obj => {

                    let objHotelNuevo = new Hotel(obj.idHotel, obj.nombreHotel, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.telefonoServicio, obj.correoServicio, obj.telefonoReservaciones, obj.correoReservaciones, obj.fotoHotel, obj.valoracion, obj.estadohotel);

                    hotelTemp.push(objHotelNuevo);
                });
            }

            return hotelTemp;
        }// fin función retornar


        function _editarHotel(photelEditar) {
            dataStorageFactory.updateHotelData(photelEditar);
        }// fin función actualizar


        function actualizarLista(photelLS) {
            dataStorageFactory.updateHotelData(photelLS);
        }


        function _consultarDatosSession() {
            let datosHotel = dataStorageFactory.getData(),
              hotelActivo;
      
            if (!datosHotel) {
                hotelActivo = undefined;
            } else {
                hotelActivo = _buscarHotel(datosHotel);
            }
      
            return hotelActivo;
          };
      
          function _removerDatosSession() {
            dataStorageFactory.removeData();
          };

    }// fin servicio
})();