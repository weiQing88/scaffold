const assert = require('assert');
const { expect } = require('chai');
const sinon = require('sinon');

 const util =  { add : function(){} }; //  require('../src/utils/index.js');


describe('#util.js', function(){
        var sandbox;
        beforeEach(function() {
            // create a sandbox
            sandbox = sinon.sandbox.create();

            // stub some console methods
            sandbox.stub(window.console, "log");
            sandbox.stub(window.console, "error");
        });

        afterEach(function() {
            // restore the environment as it was before
            sandbox.restore();
        });

      describe('#add()', function(){
                before(function () {
                    console.log('before:');
                });

                after(function () {
                    console.log('after.');
                });

                beforeEach(function () {
                    console.log('  beforeEach:');
                });

                afterEach(function () {
                    console.log('  afterEach.');
                });
            it('add() should return number', function(){
                  assert.strictEqual( util.add( 1, 3 ), 4 )
            });
            it('add() equal 4', function(){
                expect( util.add(1,3) ).to.equal( 4 )
            })
      })
})