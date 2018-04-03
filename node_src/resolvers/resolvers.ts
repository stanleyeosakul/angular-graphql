import Course from '../models/Course';

export const resolvers = {

  // **************************************
  // GraphQL Queries
  // **************************************
  Query: {

    // Get all courses
    allCourses: (root, { searchTerm }) => {
      if (searchTerm !== '') {
        return Course.find({ $text: { $search: searchTerm } }).sort({ voteCount: 'desc' });
      } else {
        return Course.find().sort({ voteCount: 'desc' });
      }
    },

    // Get one course
    course: (root, { id }) => Course.findOne({ id })
  },

  // **************************************
  // GraphQL Mutations
  // **************************************
  Mutation: {

    // Create course
    addCourse: (root, { title, author, description, topic, url }) => {
      const course = new Course({ title, author, description, topic, url });
      return course.save();
    },

    // Update vote counts on a course
    upvote: (root, { id }) => {
      return Course.findOneAndUpdate({ id }, { $inc: { 'voteCount': 1 }}, { new: true });
    },
    downvote: (root, { id }) => {
      return Course.findOneAndUpdate({ id }, { $inc: { 'voteCount': -1 }}, { new: true });
    },

    // Remove course
    removeCourse: (root, { id }) => {
      return Course.findOneAndRemove({ id });
    },

  }
};
