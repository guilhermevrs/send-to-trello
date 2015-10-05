//PageHandler.js
'use strict';

angular.module('app.pagehandler', []).
    factory('PageHandler', function PageHandler(){
        var PageHandler = {
            getPageInfo: function(){
                var promise = new Promise(function(resolve, fail){
                    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                        if(tabs.length > 0){
                            resolve({
                                title: tabs[0].title,
                                url: tabs[0].url
                            });
                        } else {
                            fail('No tabs');
                        }
                    });
                });
                return promise;
            }
        };
        return PageHandler;
    });
