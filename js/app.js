'use strict'

var app = angular.module('app', [
    'app.trello',
    'app.pagehandler'
]);

app.controller('mainController', function($scope, TrelloService){
    TrelloService.getBoards(false).then(function(boards){
        if(boards.length > 0){
            $scope.$apply(function(){
                $scope.trelloInfo.currentBoard = boards[0].name;
                $scope.trelloInfo.currentBoardId = boards[0].id;
            });
            TrelloService.getLists(boards[0].id).then(function(lists){
                $scope.$apply(function(){
                    if(lists.length > 0){
                        $scope.trelloInfo.currentList = lists[0].name;
                        $scope.trelloInfo.currentListId = lists[0].id;
                    } else {
                        $scope.trelloInfo.currentList = 'No lists for this board';
                        $scope.trelloInfo.currentListId = undefined;
                    }
                });
            });
        }
    });

    $scope.trelloInfo = {};
});
