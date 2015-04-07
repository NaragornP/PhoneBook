angular.module('BookApp', ['BookApp.service']).controller('bookCtrl', ['$scope', 'Books',
    function($scope, Books) {
        $scope.books = [];
        Books.getAll(function(data) {
            $scope.books = data;
        });
        $scope.edit = function(book) {
            Books.edit(book, function(data) {});
        };
        $scope.delete = function(_id) {
            Books.delete(_id, function(data) {
                Books.getAll(function(data) {
                    $scope.books = data;
                });
            });
        };
        $scope.addPhone = function(inputName, inputSurname, inputNumber) {
            Books.addPhone(inputName, inputSurname, inputNumber, function(data) {
                Books.getAll(function(data) {
                    $scope.books = data;
                });
            });
            $scope.inputName = "";
            $scope.inputSurname = "";
            $scope.inputNumber = "";
        };
    }
]);