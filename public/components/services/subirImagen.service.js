(() => {
    'use strict';
    angular
        .module('travelersTours')
        .service('imageUploadService', imageUploadService);

    imageUploadService.$inject = ['$http'];

    function imageUploadService($http) {

        const cloudObj = {
            url: 'https://api.cloudinary.com/v1_1/dmocxplcb/image/upload',
            data: {
                upload_preset: 'travelerstours',
                tags: 'Any',
                context: 'photo=test'
            }
        };

        const uploadAPI = {
            getConfiguration: _getConfiguration
        };
        return uploadAPI;

        function _getConfiguration() {
            return cloudObj;
        }
    };
})();