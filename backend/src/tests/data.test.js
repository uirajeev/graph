import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

const server = use(chaiHttp);

describe('Data API', () => {
  it('should GET data', (done) => {
    server.request
      .execute(app)
      .get('/api/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
