//TrelloService.js

'use strict';

angular.module('app.trello', [])
.factory('TrelloService', function TrelloService(){
    var TrelloService = {
        //localStorage authtoken position
        LOCAL_STORAGE_AUTH_TOKEN: 'send-to-trello-auth-token',

        //Gets the local auth token
        getLocalToken: function(){
            return localStorage[this.LOCAL_STORAGE_AUTH_TOKEN];
        },

        //Sets the local auth token
        //@param {string} token - Token to be saved
        setLocalToken: function(token){
            localStorage.setItem(this.LOCAL_STORAGE_AUTH_TOKEN, token);
        },

        //Indicates if the user is logged
        isUserLogged: function(){
            var localAuthToken = this.getLocalToken();
            return localAuthToken !== null && localAuthToken !== undefined;
        }
    };

    return TrelloService;
});
