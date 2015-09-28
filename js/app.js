'use strict'

var app = angular.module('app', [
    'app.trello'
]);

app.controller('mainController', function($scope, TrelloService){
    TrelloService.getBoards(false).then(function(boards){
        console.log(JSON.stringify(boards));
    });

    $scope.trelloInfo = {
        currentBoard: 'hue'
    };
});
