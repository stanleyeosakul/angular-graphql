import { Schema, model } from 'mongoose';
import { v1 } from 'uuid';

const CourseSchema: Schema = new Schema({
  id: { type: String, default: v1 },
  title: String,
  author: String,
  description: String,
  topic: String,
  url: String,
  voteCount: { type: Number, default: 0 }
});

CourseSchema.index({'$**': 'text'});

export default model('Course', CourseSchema);
