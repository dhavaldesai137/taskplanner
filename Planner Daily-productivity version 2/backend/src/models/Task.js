const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Low',
  },
  dueDate: {
    type: Date,
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Study', 'Other'],
    default: 'Other',
  },
  reminder: {
    type: Date,
  },
});

module.exports = mongoose.model('Task', taskSchema);
