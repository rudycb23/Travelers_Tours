(() => {
    'use strict';
    angular
        .module('travelersTours')
        .controller('controladorRegistroHotel', controladorRegistroHotel);

    controladorRegistroHotel.$inject = ['$http', '$stateParams', '$state', 'servicioHoteles', 'imageUploadService', 'Upload', 'NgMap'];

    function controladorRegistroHotel($http, $stateParams, $state, servicioHoteles, imageUploadService, Upload, NgMap) {

        const vm = this;

        vm.provincias = $http({
            method: 'GET',
            url: './sources/data/provincias.json'
        }).then((success) => {
            vm.provincias = success.data;
        }, (error) => {
        });

        // Funcion que rellena los los cantones
        vm.rellenarCantones = (pidProvincia) => {
            vm.cantones = $http({
                method: 'GET',
                url: './sources/data/cantones.json'
            }).then((success) => {
                let cantones = [];
                for (let i = 0; i < success.data.length; i++) {
                    if (pidProvincia == success.data[i].idProvincia) {
                        cantones.push(success.data[i]);
                    }
                }
                vm.cantones = cantones;
            }, (error) => {
            });
        }

        vm.rellenarDistrito = (pidCanton) => {
            vm.distritos = $http({
                method: 'GET',
                url: './sources/data/distritos.json'
            }).then((success) => {
                let distritos = [];
                for (let i = 0; i < success.data.length; i++) {
                    if (pidCanton == success.data[i].idCanton) {
                        distritos.push(success.data[i]);
                    }
                }
                vm.distritos = distritos;
            }, (error) => {
            });
        }


        vm.onDragEnd = ($event) => {
            let postion = [$event.latLng.lat(), $event.latLng.lng()];
            // console.log(coords);

            vm.coords = postion;
        }

        /**
         * llama las  ccoordenadas capturadas en la funcion previa y las asigna a un mapa distinto
         */



        vm.hotelNuevo = {};

        vm.cloudObj = imageUploadService.getConfiguration();

        vm.preRegistrarHotel = (photelNuevo) => {

            vm.cloudObj.data.file = photelNuevo.photo[0];
            Upload.upload(vm.cloudObj).success((data) => {
                vm.registrarHotel(photelNuevo, data.url);
            });
        }

        vm.registrarHotel = (photelNuevo, urlImagen) => {

            let valoracion = 0;
            let estadohotel = true;
            let latitud = vm.coords[0],
            longitud = vm.coords[1];
            let mapa = [];
                    mapa.push(latitud);
                    mapa.push(longitud);
            
            let ubicacion = vm.coords;
            let cantRates = 0;
            let totalValor = 0;

            let objNuevoHotel = new Hotel(photelNuevo.idHotel, photelNuevo.nombreHotel, photelNuevo.provincia.name,
                photelNuevo.canton.name, photelNuevo.distrito.name, photelNuevo.direccion, photelNuevo.telefonoServicio,
                photelNuevo.correoServicio, photelNuevo.telefonoReservaciones, photelNuevo.correoReservaciones, urlImagen,
                valoracion, estadohotel, latitud,longitud,mapa, cantRates, totalValor);

            let registro = servicioHoteles.agregarHotel(objNuevoHotel);


            if (registro == true) {
                swal({
                    title: "Registro exitoso",
                    text: "Hotel registrado correctamente",
                    icon: "success",
                    button: "Aceptar"
                });
                vm.hotelNuevo = null;
            } else {
                swal({
                    title: "Ha ocurrido un Error",
                    text: "El hotel ha sido anteriormnete registrado.",
                    icon: "error",
                    button: "Aceptar"
                });
            }
        }// fin registrar nuevo hotel
        vm.regresar = () => {
            $state.go('main.inicio');
        }
    }// fin controlador
})();