'use strict';

var settings = angular.module('app.settings',[
    'app.trello'
]);

settings.controller('SettingsController', function($scope,TrelloService){
    $scope.message = '';
    TrelloService.authorize();
    if (localStorage.getItem('trello_token')){
        chrome.browserAction.setPopup({popup:'app.html'});
        $scope.message = 'Trello account successfully linked';
    }
});
