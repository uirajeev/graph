import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  parent: {
    type: String,
    default: '',
  },
});

const GraphData = mongoose.model('GraphData', dataSchema);

export default GraphData;
