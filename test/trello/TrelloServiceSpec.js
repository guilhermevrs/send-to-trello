//TrelloServiceSpec.js
'use strict';

describe('TrelloService', function(){
    beforeEach(module('app.trello'));

    var TrelloService;
    var randomFloat;
    beforeEach(inject(function (_TrelloService_) {
        TrelloService = _TrelloService_;
        randomFloat = Math.random();
    }));

    //GENERAL
    describe('in general service object', function(){
        it('should exist a TrelloService module', function(){
            expect(!!TrelloService).toBe(true);
        });
    });

    //AUTHENTICATION
    describe('in the authentication', function(){
        beforeEach(function(){
            //localStorage.clear();
            localStorage.removeItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN);
        });

        it('should get the authtoken from the right localStorage position', function(){
            var testValue = 'test_value' + randomFloat;
            localStorage.setItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN, testValue);
            expect(TrelloService.getLocalToken()).toEqual(testValue);
        });

        it('should set the authtoken in the right localStorage position', function(){
            var testValue = 'test_value' + randomFloat;
            TrelloService.setLocalToken(testValue);
            expect(localStorage[TrelloService.LOCAL_STORAGE_AUTH_TOKEN]).toEqual(testValue);
        });

        it('should tell when the user is not logged in', function(){
            expect(TrelloService.isUserLogged()).toBe(false);
        });
    });
});
