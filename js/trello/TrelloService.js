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

        //Starts authorization process
        authorize: function(){
	    var me = this;
            var interactive = !this.isUserLogged();
	    Trello.authorize({
		type : 'redirect',
		name : 'Send to Trello',
                expiration: 'never',
                interactive: interactive,
		scope: { read: true, write: true, account: false },
		success : function(){
                    //Can't do nothing
		},
		error: function(error){
		    console.error('[SendToTrello]', 'error on authorize', error);
		}
	    });
        },

        //Checks if the user is authorized
        checkAuthorization: function(){
            var isUserLogged = this.isUserLogged();
            if(!isUserLogged){
               this.authorize();
            }
            return isUserLogged;
        },

        //Get boards for logged user
        getBoards: function(includeClosed){
            if(!this.checkAuthorization()){
               return false;
            }

            var me = this;
            var promise = new Promise(function(resolve, fail){
                Trello.get(
                    '/member/me/boards',
                    {
                        fields: 'name,desc,closed',
                        token: me.getLocalToken()
                    },
		    function(data){
                        var boards = data;
                        if(!includeClosed){
                            boards = boards.filter(function(b){return !b.closed});
                        }
                        resolve(boards);
		    },
		    function(error){
		        console.error('[SendToTrello]', 'error on getBoards', error);
                        fail(error);
		    }
	        )});

            return promise;
        },

        //Get lists for a board
        getLists: function(boardID){
            if(!this.checkAuthorization()){
               return false;
            }

            var me = this;
            var promise = new Promise(function(resolve, fail){
                Trello.get(
                    '/boards/' + boardID,
                    {
                        fields: 'name',
                        token: me.getLocalToken(),
                        lists: 'open',
                        lists_fields: 'name'
                    },
		    function(board){
                        resolve(board.lists);
		    },
		    function(error){
		        console.error('[SendToTrello]', 'error on getLists', error);
                        fail(error);
		    }
	        )});

            return promise;
        }
    };

    return TrelloService;
});
