import * as mongoose from 'mongoose';
import { keys } from './keys';

export class Database {

  constructor() { }

  // MongoDB Setup using Mongoose
  connectDatabase() {
    mongoose.connect(process.env.MONGOURI || keys.mongoURI)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(`Error connecting to database:  ${err}`));
  }

}
