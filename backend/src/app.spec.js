import { expect } from 'chai';
import request from 'supertest';
import app from './app.js';

describe('App', () => {
  it('should use CORS', () => {
    expect(app._router.stack.some((layer) => layer.name === 'corsMiddleware'))
      .to.be.true;
  });

  it('should parse urlencoded requests', () => {
    expect(app._router.stack.some((layer) => layer.name === 'urlencodedParser'))
      .to.be.true;
  });

  it('should parse JSON requests', () => {
    expect(app._router.stack.some((layer) => layer.name === 'jsonParser')).to.be
      .true;
  });

  it('should handle /api route', (done) => {
    request(app).get('/api/data').expect(200, done);
  });
});
