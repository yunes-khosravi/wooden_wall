const mongoose = require('mongoose');


const CommentsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true  
  },
  comment: {
    type: String,
    required: true
  },
  score: { 
    type: Number,
    min : 1,
    max : 100,
    required: true
  }
})

const Comments = mongoose.model('comments', CommentsSchema);

module.exports = Comments;
