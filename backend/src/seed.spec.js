import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import GraphData from './models/dataModel.js';

describe('Database connection and operations', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let connectStub;
  let onStub;
  let onceStub;
  let closeStub;
  let deleteManyStub;
  let insertManyStub;

  beforeEach(() => {
    connectStub = sinon.stub(mongoose, 'connect').resolves();
    onStub = sinon.stub(mongoose.connection, 'on');
    onceStub = sinon.stub(mongoose.connection, 'once');
    closeStub = sinon.stub(mongoose.connection, 'close').resolves();

    deleteManyStub = sinon.stub(GraphData, 'deleteMany').resolves();
    insertManyStub = sinon.stub(GraphData, 'insertMany').resolves();

    consoleLogSpy = sinon.spy(console, 'log');
    consoleErrorSpy = sinon.spy(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should connect to MongoDB and perform database operations', async () => {
    onceStub.withArgs('open').callsFake((event, callback) => callback());

    await import('./seed.js');

    expect(connectStub.calledWith(process.env.MONGODB_URI, { dbName: 'graph' }))
      .to.be.true;
    expect(deleteManyStub.calledWith({})).to.be.true;
    expect(
      insertManyStub.calledWith([
        { name: 'A', description: 'This is a description of A', parent: '' },
        { name: 'B', description: 'This is a description of B', parent: 'A' },
        { name: 'C', description: 'This is a description of C', parent: 'A' },
        { name: 'D', description: 'This is a description of D', parent: 'A' },
        {
          name: 'B-1',
          description: 'This is a description of B-1',
          parent: 'B',
        },
        {
          name: 'B-2',
          description: 'This is a description of B-2',
          parent: 'B',
        },
        {
          name: 'B-3',
          description: 'This is a description of B-3',
          parent: 'B',
        },
      ])
    ).to.be.true;

    expect(consoleLogSpy.calledWith('Connected to MongoDB')).to.be.true;
    expect(consoleLogSpy.calledWith('Sample data inserted')).to.be.true;
    expect(closeStub.called).to.be.true;
  });
});
