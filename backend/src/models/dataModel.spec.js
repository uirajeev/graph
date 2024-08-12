import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import GraphData from './dataModel.js';

describe('GraphData Model Test with mongodb-memory-server', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await GraphData.deleteMany({});
  });

  it('should create a new GraphData document', async () => {
    const graphData = new GraphData({
      name: 'A',
      description: 'This is a description of A',
      parent: '',
    });

    const savedGraphData = await graphData.save();

    expect(savedGraphData.name).to.equal('A');
    expect(savedGraphData.description).to.equal('This is a description of A');
    expect(savedGraphData.parent).to.equal('');
  });

  it('should require the name field', async () => {
    const graphData = new GraphData({
      description: 'This is a description without a name',
      parent: '',
    });

    let err;
    try {
      await graphData.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.exist;
    expect(err.errors.name).to.exist;
  });

  it('should update a GraphData document', async () => {
    const graphData = new GraphData({
      name: 'A',
      description: 'Initial description',
      parent: '',
    });

    const savedGraphData = await graphData.save();

    savedGraphData.description = 'Updated description';
    const updatedGraphData = await savedGraphData.save();

    expect(updatedGraphData.description).to.equal('Updated description');
  });

  it('should delete a GraphData document', async () => {
    const graphData = new GraphData({
      name: 'A',
      description: 'This is a description',
      parent: '',
    });

    const savedGraphData = await graphData.save();
    await GraphData.deleteOne({ _id: savedGraphData._id });

    const foundGraphData = await GraphData.findById(savedGraphData._id);
    expect(foundGraphData).to.be.null;
  });
});
