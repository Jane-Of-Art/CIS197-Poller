import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  // required
  name: { type: 'String', required: true },
  host: { type: 'String', required: true },
  options: [{
    type: String,
    required: true,
  }],
  // defaulted
  activeParticipants: [{
    name: {
      type: String,
      required: true,
    },
  }],
  finishedParticipants: [{
    name: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    dateFinished: {
      type: Date,
    },
  }],
  dateAdded: { type: 'Date', default: Date.now, required: true },
  isEnded: { type: 'Boolean', default: false, required: true },
});

export default mongoose.model('Game', gameSchema);
