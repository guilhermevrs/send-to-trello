//TrelloServiceSpec.js
'use strict';

describe('TrelloService', function(){
    beforeEach(module('app.trello'));

    var TrelloService;
    beforeEach(inject(function (_TrelloService_) {
        TrelloService = _TrelloService_;
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

        });

        it('should try to connect over trello', function(){

        });
    });
});
