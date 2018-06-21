process.env.NODE_ENV = 'dev';


let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/index');
let should = chai.should();

chai.use(chaiHttp);

describe('LastTenBlocks', () => {

    describe('/GET /api/v1/blocks', () => {
        it('Test should get last 10 blocks', (done) => {
            chai.request(app)
                .get('/api/v1/blocks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                    done();
                });
        });
    });
});
