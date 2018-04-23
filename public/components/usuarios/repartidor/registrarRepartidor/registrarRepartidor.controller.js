(() => {
    'use strcit'
    angular
        .module('correosCR')
        .controller('controladorRegistrarRepartidor', controladorRegistrarRepartidor);

    controladorRegistrarRepartidor.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'imageUploadService', 'Upload'];

    function controladorRegistrarRepartidor($http, $stateParams, $state, servicioUsuarios, imageUploadService, Upload) {
        let vm = this;

       // Funcion que optiene las provincias
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


        vm.repartidorNuevo = {};

        vm.cloudObj = imageUploadService.getConfiguration();

        vm.preRegistrarRepartidor = (prepartidorNuevo) => {
            vm.cloudObj.data.file = prepartidorNuevo.photo[0];
            Upload.upload(vm.cloudObj).success((data) => {
                vm.registrarRepartidor(prepartidorNuevo, data.url);
            });
        }


        vm.registrarRepartidor = (prepartidorNuevo, urlImagen) => {

            let rol = 4;
            let estado = true;

            let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-+<>ABCDEFGHIJKLMNOP1234567890";
            let contrasenna = "";
            for (let i = 0; i < 10; i++) {
                let x = Math.floor(Math.random() * chars.length);
                contrasenna += chars.charAt(x);
            }

            let nuevoRepartidor = new Repartidor(prepartidorNuevo.nombre, prepartidorNuevo.segundoNombre, prepartidorNuevo.primerApellido, prepartidorNuevo.segundoApellido, urlImagen, prepartidorNuevo.cedula, prepartidorNuevo.fechaNacimiento, prepartidorNuevo.sexo, prepartidorNuevo.provincia.name, prepartidorNuevo.canton.name, prepartidorNuevo.distrito.name, prepartidorNuevo.direccion, prepartidorNuevo.correo, contrasenna, rol, estado, prepartidorNuevo.telefono, prepartidorNuevo.segundotelefono, '',prepartidorNuevo.sucursal);


            console.log(nuevoRepartidor);

            let registro = servicioUsuarios.agregarUsuario(nuevoRepartidor);

            if (registro == true) {
                swal({
                    title: "Registro exitoso",
                    text: "Repartidor registrado correctamente, se ha enviado un correo electrónico con una contraseña provisional",
                    icon: "success",
                    button: "Aceptar"
                });
                vm.clienteNuevo = null;
                $state.go('main.listarTodosLosRepartidores');
            } else {
                swal({
                    title: "Ha ocurrido un Error",
                    text: "El usuario ha sido anteriormnete registrado.",
                    icon: "error",
                    button: "Aceptar"
                });
            }
        }

    }
})();