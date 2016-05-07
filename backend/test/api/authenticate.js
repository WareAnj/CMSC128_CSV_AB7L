'use strict';

const config    = require(__dirname + '/../../config/config');
const should    = require('chai').should();
const expect    = require('chai').expect();
const request   = require('supertest');

let api         = request(config.APP_URL);


function todo() {
    assert(false, 'method not yet implemented');
}

// one "describe" corresponds to one function in a controller
describe('Authenticate (login)', () => {
    // the "it" are ALL THE POSSIBLE CASES

    // you should check the controller for the their attributes of the returned object then use them for the test

    // base all your test with this example
    it('should not login with incorrect username', (done) => {
        api.post('/authenticate/login')
            .send('username=asdfg&password=asdfg')
            .expect(404)
            .end((err, res) => {
                should.not.exist(err);          // these two
                should.exist(res);              // are always existing at the call of the end function
                res.body.should.have.property('code', 'INV_USERNAME');
                res.body.should.have.property('context', 'Invalid username');
                done();                         // DO NOT FORGET TO CALL THE DONE CALLBACK WHEN THE MODULE TEST IS DONE
            });
    });
});
