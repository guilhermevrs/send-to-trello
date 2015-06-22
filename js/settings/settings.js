'use strict';

var settings = angular.module('app.settings',[
    'app.trello'
]);

settings.controller('SettingsController', function(TrelloService){
    TrelloService.authorize();
});
