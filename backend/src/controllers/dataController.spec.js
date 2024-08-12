import { expect } from 'chai';
import sinon from 'sinon';
import GraphData from '../models/dataModel.js';
import { getData } from './dataController.js'; // Adjust the path to where your controller is located

describe('getData Controller', () => {
  let req, res, findStub;

  beforeEach(() => {
    // Create a mock request and response
    req = {};
    res = {
      json: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
    };

    // Stub the GraphData.find method
    findStub = sinon.stub(GraphData, 'find');
  });

  afterEach(() => {
    // Restore the original method after each test
    findStub.restore();
  });

  it('should return data and respond with JSON', async () => {
    const mockData = [{ name: 'A' }, { name: 'B' }];

    // Set up the stub to return mock data
    findStub.resolves(mockData);

    // Call the controller function
    await getData(req, res);

    // Verify that find was called
    expect(findStub.calledOnce).to.be.true;

    // Verify that res.json was called with the correct data
    expect(res.json.calledWith(mockData)).to.be.true;
  });

  it('should handle errors and respond with a 500 status', async () => {
    const error = new Error('Database error');

    // Set up the stub to throw an error
    findStub.rejects(error);

    // Call the controller function
    await getData(req, res);

    // Verify that find was called
    expect(findStub.calledOnce).to.be.true;

    // Verify that res.status was called with 500
    expect(res.status.calledWith(500)).to.be.true;

    // Verify that res.send was called with the error message
    expect(res.send.calledWith(error.message)).to.be.true;
  });
});
