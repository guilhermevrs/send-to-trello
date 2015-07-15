'use strict';

var settings = angular.module('app.settings',[
    'app.trello'
]);

settings.controller('SettingsController', function($scope,TrelloService){
    $scope.message = 'Settings';
    TrelloService.authorize();
    if (localStorage.gschrome.browserAction.setPopup({popup:'app.html'});
    }
});
