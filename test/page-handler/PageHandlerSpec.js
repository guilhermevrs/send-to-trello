//PageHandlerSpec.js
'use strict';

describe('PageHandler', function(){
    beforeEach(module('app.pagehandler'));

    var PageHandler;
    var randomFloat;
    beforeEach(inject(function (_PageHandler_) {
        PageHandler = _PageHandler_;
        randomFloat = Math.random();
    }));

    it('should load the module', function(){
        expect(!!PageHandler).toBe(true);
    });
});
