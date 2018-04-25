(() => {
    'use strict';
    angular
        .module('travelersTours')
        .controller('controladorRegistroHotel', controladorRegistroHotel);

    controladorRegistroHotel.$inject = ['$http', '$stateParams', '$state', 'servicioHoteles', 'imageUploadService', 'Upload'];

    function controladorRegistroHotel($http, $stateParams, $state, servicioHoteles, imageUploadService, Upload) {

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

        vm.hotelNuevo = {};

        vm.cloudObj = imageUploadService.getConfiguration();

        vm.preRegistrarHotel = (photelNuevo) => {




            vm.cloudObj.data.file = photelNuevo.foto[0];
            Upload.upload(vm.cloudObj).success((data) => {
                vm.registrarHotel(photelNuevo, data.url);
            });
        }

        vm.registrarHotel = (photelNuevo, urlImagen) => {


            let estadohotel = true;
            let valoracion = 0;

            let objNuevoHotel = new Hotel(photelNuevo.idHotel, photelNuevo.nombreHotel, photelNuevo.provincia.name, photelNuevo.canton.name, photelNuevo.distrito.name, photelNuevo.direccion, photelNuevo.telefonoServicio, photelNuevo.correoServicio, photelNuevo.telefonoReservaciones, photelNuevo.correoReservaciones, urlImagen, estadohotel, valoracion);

            console.log(objNuevoHotel);

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
    }// fin controlador
})();