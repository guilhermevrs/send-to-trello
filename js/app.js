'use strict'

var app = angular.module('app', [
    'app.trello'
]);

app.controller('mainController', function($scope, TrelloService){
    TrelloService.getBoards(false).then(function(boards){
        if(boards.length > 0){
            $scope.trelloInfo.currentBoard = boards[0].name;
            $scope.trelloInfo.currentBoardId = boards[0].id;
            $scope.$apply();
        }
    });

    $scope.trelloInfo = {};
});
