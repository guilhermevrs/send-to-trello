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
        it('should exist a TrelloService object', function(){
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

        it('should remove the authtoken', function(){
            var testValue = 'test_value' + randomFloat;
            localStorage.setItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN, testValue);
            TrelloService.deleteLocalToken();
            expect(localStorage[TrelloService.LOCAL_STORAGE_AUTH_TOKEN]).toEqual(undefined);
        });

        it('should tell when the user is not logged in', function(){
            expect(TrelloService.isUserLogged()).toBe(false);
        });

        it('should tell when the user is logged in', function(){
            var testValue = 'test_value' + randomFloat;
            localStorage.setItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN, testValue);
            expect(TrelloService.isUserLogged()).toBe(true);
        });

        it('should call correctly the Trello authorize function', function(){
            spyOn(Trello, 'authorize');
            TrelloService.authorize();
            expect(Trello.authorize.calls.count()).toEqual(1);
            var args = Trello.authorize.calls.argsFor(0)[0];
            expect(args.type).toEqual('redirect');
            expect(args.interactive).toEqual(true);
            expect(args.name).toEqual('Send to Trello');
            expect(args.scope).toEqual({read:true, write:true, account:false});
        });

        it('should call correctly the Trello authorize function', function(){
            spyOn(Trello, 'authorize');

            localStorage.setItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN, randomFloat);

            TrelloService.authorize();
            var args = Trello.authorize.calls.argsFor(0)[0];
            expect(args.interactive).toEqual(false);
        });
    });

    //GET BOARDS
    describe('in retrieving boards', function(){
        beforeEach(function(){

        });

        it('should check if the account is connected first', function(){
            spyOn(TrelloService, 'isUserLogged');
            TrelloService.getBoards(false);
            expect(TrelloService.isUserLogged).toHaveBeenCalled();
        });

        it('should redirect to authentication if user not logged', function(){
            spyOn(TrelloService, 'authorize');
            spyOn(TrelloService, 'isUserLogged').and.returnValue(false);
            TrelloService.getBoards(false);
            expect(TrelloService.authorize).toHaveBeenCalled();
        });

    });
});
