import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // must be specified
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  email: { type: 'String', required: true },

  // defaulted for game purposes
  gamesFinished: { type: 'Number', default: 0, required: true },
  isInGame: { type: 'Boolean', default: false, required: true },
  isPengingApproval: { type: 'Boolean', default: false, required: true },
  isRejected: { type: 'Boolean', default: false, required: true },
  currentGameHost: { type: 'String' },
  currentGameState: [{
    prompt: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      default: '',
      required: true,
    },
  }],

  // just as a record...
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('User', userSchema);
