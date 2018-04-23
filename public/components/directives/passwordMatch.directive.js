(() => {
    'use strict'
    angular
        .module("travelersTours")
        .directive('pwCheck', pwCheck);

    function pwCheck() {
        let pwCheck = {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }

        return pwCheck;
    }
})();