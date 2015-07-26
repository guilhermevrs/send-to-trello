'use strict'

var app = angular.module('app', [
    'app.trello'
]);

app.controller('mainController', function($scope, TrelloService){
    $scope.message = 'teste'
});
