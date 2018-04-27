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
            buscarHotel: _buscarHotel,
            agregarDatosSession: _agregarDatosSession,
            consultarDatosSession: _consultarDatosSession,
            removerDatosSession: _removerDatosSession,

            ordenarNombre: _ordenarNombre,
            ordenarRate: _ordenarRate

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
                    let mapa = [];
                    mapa.push(objTemp.latitud);
                    mapa.push(objTemp.longitud);

                    let objhotelAct = new Hotel(objTemp.idHotel, objTemp.nombreHotel, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.direccion, objTemp.telefonoServicio, objTemp.correoServicio, objTemp.telefonoReservaciones, objTemp.correoReservaciones, objTemp.fotoHotel, objTemp.valoracion, objTemp.estadohotel, objTemp.latitud, objTemp.longitud, mapa, objTemp.cantRates, objTemp.totalValor);

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
                    let objhotelDesact = new Hotel(objTemp.idHotel, objTemp.nombreHotel, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.direccion, objTemp.telefonoServicio, objTemp.correoServicio, objTemp.telefonoReservaciones, objTemp.correoReservaciones, objTemp.fotoHotel, objTemp.valoracion, objTemp.estadohotel, objTemp.latitud, objTemp.longitud, objTemp.mapa, objTemp.cantRates, objTemp.totalValor);

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

                    let objHotelNuevo = new Hotel(obj.idHotel, obj.nombreHotel, obj.provincia, obj.canton, obj.distrito, obj.direccion,
                        obj.telefonoServicio, obj.correoServicio, obj.telefonoReservaciones, obj.correoReservaciones, obj.fotoHotel,
                        obj.valoracion, obj.estadohotel, obj.latitud, obj.longitud, obj.mapa, obj.cantRates, obj.totalValor);

                    hotelTemp.push(objHotelNuevo);
                });
            }

            return hotelTemp;
        }// fin función retornar


        function _editarHotel(photelEditar) {
            dataStorageFactory.updateHotelData(photelEditar);
            let valido = true;
            return valido;
        }// fin función actualizar


        function actualizarLista(photelLS) {
            dataStorageFactory.updateHotelData(photelLS);
        }

        function _buscarHotel(pidHotel) {
            let listaHoteles = _retornarHotel(),
                hotel;

            for (let i = 0; i < listaHoteles.length; i++) {
                if (listaHoteles[i].getIdHotel() == pidHotel) {
                    hotel = listaHoteles[i];
                }
            };

            return hotel;
        };

        function _agregarDatosSession(pidHotel) {
            dataStorageFactory.setData(pidHotel);
        };

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

        function _ordenarRate(pmayorMenor) {
            let hotelesActivos = _retornarHotelAct();
            let Hotel5 = [];

            for (let i = 0; i < hotelesActivos.length; i++) {
                if (hotelesActivos[i].valoracion == 5) {
                    Hotel5.push(hotelesActivos[i]);
                }
            }
            for (let i = 0; i < hotelesActivos.length; i++) {
                if (hotelesActivos[i].valoracion == 4) {
                    Hotel5.push(hotelesActivos[i]);
                }
            }
            for (let i = 0; i < hotelesActivos.length; i++) {
                if (hotelesActivos[i].valoracion == 3) {
                    Hotel5.push(hotelesActivos[i]);
                }
            }
            for (let i = 0; i < hotelesActivos.length; i++) {
                if (hotelesActivos[i].valoracion == 2) {
                    Hotel5.push(hotelesActivos[i]);
                }
            }
            for (let i = 0; i < hotelesActivos.length; i++) {
                if (hotelesActivos[i].valoracion == 1) {
                    Hotel5.push(hotelesActivos[i]);
                }
            }
            if (pmayorMenor == false) {
                Hotel5.reverse();
            }
            return Hotel5;
        }

        function _ordenarNombre(reverse) {

            let hotelesActivos = _retornarHotelAct();
            let ordenando = [];
            let ordenado = [];

            for (let i = 0; i < hotelesActivos.length; i++) {
                ordenando.push(hotelesActivos[i].nombreHotel);
            }
            ordenando.sort();

            for (let i = 0; i < ordenando.length; i++) {
                for (let j = 0; j < hotelesActivos.length; j++) {
                    if (ordenando[i] == hotelesActivos[j].nombreHotel) {
                        ordenado.push(hotelesActivos[j]);
                    }
                }
            }
            if (reverse == true) {
                ordenado.reverse();
            }
            return ordenado;
        }
    }// fin servicio
})();