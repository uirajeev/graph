import mongoose from 'mongoose';
import GraphData from './models/dataModel.js';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'graph',
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  const sampleData = [
    { name: 'A', description: 'This is a description of A', parent: '' },
    { name: 'B', description: 'This is a description of B', parent: 'A' },
    { name: 'C', description: 'This is a description of C', parent: 'A' },
    { name: 'D', description: 'This is a description of D', parent: 'A' },
    { name: 'B-1', description: 'This is a description of B-1', parent: 'B' },
    { name: 'B-2', description: 'This is a description of B-2', parent: 'B' },
    { name: 'B-3', description: 'This is a description of B-3', parent: 'B' },
  ];

  await GraphData.deleteMany({});
  await GraphData.insertMany(sampleData);

  console.log('Sample data inserted');
  mongoose.connection.close();
});
