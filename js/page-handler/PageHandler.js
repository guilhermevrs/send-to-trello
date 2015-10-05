//PageHandler.js
'use strict';

angular.module('app.pagehandler', []).
    factory('PageHandler', function PageHandler(){
        var PageHandler = {
            getPageInfo: function(){
                return {
                    title: document.title,
                    url: document.location.href
                }
            }
        };
        return PageHandler;
    });
