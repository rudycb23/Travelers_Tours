(() => {
  'use strict';
  angular
  .module('travelersTours')
  .directive('navegacionPrincipal', navegacionPrincipal);
  
  function navegacionPrincipal(){
    const navegacion = {
      templateUrl: '/components/directives/header/header.view.html',
      restrict: 'EA'
    };

    return navegacion;
  }
})();