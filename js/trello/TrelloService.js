//TrelloService.js

'use strict';

angular.module('app.trello', [])
.factory('TrelloService', function TrelloService($q){
    var TrelloService = {
        //localStorage authtoken position
        LOCAL_STORAGE_AUTH_TOKEN: 'trello_token',

        //Gets the local auth token
        getLocalToken: function(){
            return localStorage[this.LOCAL_STORAGE_AUTH_TOKEN];
        },

        //Sets the local auth token
        //@param {string} token - Token to be saved
        setLocalToken: function(token){
            localStorage.setItem(this.LOCAL_STORAGE_AUTH_TOKEN, token);
        },

        //Deletes the token
        deleteLocalToken: function(){
            localStorage.removeItem(this.LOCAL_STORAGE_AUTH_TOKEN);
        },

        //Indicates if the user is logged
        isUserLogged: function(){
            var localAuthToken = this.getLocalToken();
            return localAuthToken !== null && localAuthToken !== undefined;
        },

        authorize: function(){
            var defered = $q.defer();
	    var me = this;
	    Trello.authorize({
		type : 'popup',
		name : 'Send to Trello',
		scope: { read: true, write: true, account: false },
		success : function(){
		    defered.resolve(me.getLocalToken());
		},
		error: function(error){
		    console.error('[SendToTrello]', 'error on authorize', error);
		}
	    });
	    return defered.promise;
        }
    };

    return TrelloService;
});
