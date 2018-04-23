// (() => {
//     'use strict';
//     angular
//         .module('correosCR')
//         .controller('controladorEditarCliente', controladorEditarCliente)

//         controladorEditarCliente.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

//     function controladorEditarCliente($stateParams, $state, $http, servicioUsuarios) {
//         let vm = this;

//         //if (!$stateParams.objEntierro) {
//         //    $state.go('listarUsuarios');
//         //}

//         let objClienteSinFormato = JSON.parse($stateParams.objEntierro);

//         let objClienteFormato = new Cliente (objClienteSinFormato.primerNombre, objClienteSinFormato.segundoNombre, objClienteSinFormato.primerApellido, objClienteSinFormato.segundoApellido, objClienteSinFormato.cedula, objClienteSinFormato.fecha, objClienteSinFormato.genero, objClienteSinFormato.ubicacion, objClienteSinFormato.provincia, objClienteSinFormato.canton, objClienteSinFormato.distrito, objClienteSinFormato.direccion, objClienteSinFormato.correo, objClienteSinFormato.foto, objClienteSinFormato.contrasenna, objClienteSinFormato.rol, objClienteSinFormato.estado);

//         let datos = [objClienteFormato.getCorreo()];

//         vm.clienteEditado = {}
//         vm.clienteEditado.primerNombre = objClienteFormato.primerNombre;
//         vm.clienteEditado.segundoNombre = objClienteFormato.segundoNombre;
//         vm.clienteEditado.primerApellido = objClienteFormato.primerApellido;
//         vm.clienteEditado.segundoApellido = objClienteFormato.segundoApellido;
//         vm.clienteEditado.cedula = objClienteFormato.cedula;
//         vm.clienteEditado.fecha = objClienteFormato.fecha;
//         vm.clienteEditado.genero = objClienteFormato.genero;
//         vm.clienteEditado.ubicacion = objClienteFormato.ubicacion;
//         vm.clienteEditado.provincia = objClienteFormato.provincia;
//         vm.clienteEditado.canton = objClienteFormato.canton;
//         vm.clienteEditado.distrito = objClienteFormato.distrito;
//         vm.clienteEditado.direccion = objClienteFormato.direccion;
//         vm.clienteEditado.correo = objClienteFormato.correo;
//         vm.clienteEditado.foto = objClienteFormato.foto;
//         vm.clienteEditado.contrasenna = objClienteFormato.contrasenna;
//         vm.clienteEditado.rol = objClienteFormato.rol;
//         vm.clienteEditado.estado = objClienteFormato.estado;

//         vm.editarUsuario = (pusuario) => {

//             let clienteEditado = new usuario (pentierro.entierroID, pentierro.horaInicio, pentierro.horaFinal, pentierro.fecha, pentierro.lugar, pentierro.prioridad);

//             objEntierroEditado.setCedulaCliente(datos[0]);
//             objEntierroEditado.setIdDifunto(datos[1]);

//             let actualizarCorrecto = servicioUsuarios.actualizarEntierro(objEntierroEditado);

//             if (actualizarCorrecto == true) {
//                 swal({
//                     title: "Actualización exitosa",
//                     text: "Entierro actualizado correctamente",
//                     icon: "success",
//                     button: "Aceptar"
//                 });

//                 $state.go('listarDifuntos');
//             }
//         }

//         vm.regresar = () => {
//             $state.go('listarDifuntos');
//         }
//     }
// })();