describe('shellCtrl',function(){
    beforeEach(module('spellbookClient'));

    var $controller;
    var vm;
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        vm = $controller('ShellCtrl');
    }));

    it('should exist',function(){
        expect(vm).toBeDefined();
    });

    it('should be called ShellCtrl after init',function(){
        expect(vm.title).toEqual('ShellCtrl');
    });

    describe('function navigate',function(){
        //TODO: Write a test for this function.  Ideally I want to check that it is called with a parameter.
    });
});