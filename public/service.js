angular.module('BookApp.service', []).factory('Books', ['$http',
    function($http) {
        return {
            getAll: function(callback) {
                $http.get('/getPhone').success(function(data, status, headers, config) {
                    callback(data);
                }).
                error(function(data, status, headers, config) {
                    callback({
                        error: 1
                    });
                });
            },
            addPhone: function(inputName, inputSurname, inputNumber, callback) {
                var tmp = {
                    name: inputName,
                    surname: inputSurname,
                    number: inputNumber
                };
                $http.get('/addPhone', {
                    params: tmp
                }).success(function(data, status, headers, config) {
                    callback(data);
                }).
                error(function(data, status, headers, config) {
                    callback({
                        error: 1
                    });
                });
            },
            delete: function(index, callback) {
                $http.get('/removePhone/' + index).success(function(data, status, headers, config) {
                    callback(data);
                }).
                error(function(data, status, headers, config) {
                    callback({
                        error: 1
                    });
                });
            },
            edit: function(phone, callback) {
                $http.get('/updatePhone/' + phone._id, {
                    params: phone
                }).success(function(data, status, headers, config) {
                    callback(data);
                }).
                error(function(data, status, headers, config) {
                    callback({
                        error: 1
                    });
                });
            }
        };
    }
]);