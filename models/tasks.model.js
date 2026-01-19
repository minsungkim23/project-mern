const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    title: {type: String, required: true, maxLength: 100},
    notes: {type: String},
    dates: {type: Date},
    tag: {type: String},
    completed: {type: Boolean},                      
    user: {type: String, required: true},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;