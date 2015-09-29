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

    describe('in logged operations', function(){
        var userLogged;
        beforeEach(function(){
            userLogged = true;
            spyOn(TrelloService, 'isUserLogged').and.callFake(function(){return userLogged});
        });

        describe('in checkingAuthorization', function(){
            it('should check if the user is loggedIn', function(){
                userLogged = true;
                var f = TrelloService.checkAuthorization();
                expect(TrelloService.isUserLogged).toHaveBeenCalled();
            });

            it('should return the status of the isUserLogged', function(){
                userLogged = ((10 * randomFloat) >= 5);
                var f = TrelloService.checkAuthorization();
                expect(f).toBe(userLogged);
            });

            it('should call authorize if the user is not logged in', function(){
                userLogged = false;
                spyOn(TrelloService, 'authorize').and.returnValue(true);
                TrelloService.checkAuthorization();
                expect(TrelloService.authorize).toHaveBeenCalled();
            });
        });

    //GET BOARDS
    describe('in retrieving boards', function(){

        it('should call checkAuthorization', function(){
            spyOn(TrelloService, 'checkAuthorization').and.returnValue(false);
            var boards = TrelloService.getBoards(false);
            expect(TrelloService.checkAuthorization).toHaveBeenCalled();
            expect(boards).toBe(false);
        });

        it('should call trello get with rigth parameters', function(){
            spyOn(Trello, 'get');
            localStorage.setItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN, randomFloat);
            TrelloService.getBoards(false);
            expect(Trello.get).toHaveBeenCalled();
            var args = Trello.get.calls.argsFor(0);
            expect(args[0]).toEqual('/member/me/boards');
            expect(args[1].fields).toEqual('name,desc,closed');
            expect(args[1].token).toBeCloseTo(randomFloat);
        });

        it('should return a promise', function(){
            spyOn(Trello, 'get');
            var p = TrelloService.getBoards(false);
            var test = p instanceof Promise;
            expect(test).toBe(true);
        });

        it('should filter for non-closed boards', function(done){
            spyOn(TrelloService, 'getLocalToken').and.returnValue(randomFloat);
            spyOn(Trello, 'get').and.callFake(function(path,params,success){
                success([
                    {closed:true},
                    {closed:false, id:3},
                    {closed:true},
                    {closed:false, id:4},
                    {closed:false, id:5}
                ]);
            });
            var p = TrelloService.getBoards(false);
            p.then(function(boards){
                expect(boards).toEqual([
                    {closed:false, id:3},
                    {closed:false, id:4},
                    {closed:false, id:5}
                ]);
                done();
            });
        });
    });

    //GET LISTS
    describe('in retriving the lists from a specific board', function(){
        beforeEach(function(){});

        it('should call checkAuthorization', function(){
            spyOn(TrelloService, 'checkAuthorization').and.returnValue(false);
            var lists = TrelloService.getLists(randomFloat);
            expect(TrelloService.checkAuthorization).toHaveBeenCalled();
            expect(lists).toBe(false);
        });

        it('should call trello get with rigth parameters', function(){
            spyOn(Trello, 'get');
            localStorage.setItem(TrelloService.LOCAL_STORAGE_AUTH_TOKEN, randomFloat);
            var randomBoardID = Math.random();
            TrelloService.getLists(randomBoardID);
            expect(Trello.get).toHaveBeenCalled();
            var args = Trello.get.calls.argsFor(0);
            expect(args[0]).toEqual('/boards/' + randomBoardID);
            expect(args[1].fields).toEqual('name');
            expect(args[1].lists).toEqual('open');
            expect(args[1].lists_fields).toEqual('name');
            expect(args[1].token).toBeCloseTo(randomFloat);
        });

        it('should return a promise', function(){
            spyOn(Trello, 'get');
            var p = TrelloService.getLists(randomFloat);
            var test = p instanceof Promise;
            expect(test).toBe(true);
        });

        it('should return only the lists properties', function(done){
            var expectedLists = [1,2,3,4,5];
            spyOn(TrelloService, 'getLocalToken').and.returnValue(randomFloat);
            spyOn(Trello, 'get').and.callFake(function(path,params,success){
                success({
                    name: ''+randomFloat,
                    lists: expectedLists
                });
            });
            var p = TrelloService.getLists(randomFloat);
            p.then(function(lists){
                expect(lists).toEqual(expectedLists);
                done();
            });
        });
    });

    });
});
