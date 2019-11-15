const mongoose = require('mongoose')

const Schema = mongoose.Schema
const newsMembersSchemat = new Schema({
    userId: String,
    userName: String,
    totalTime: Number
})

module.exports = mongoose.model('users_data', newsMembersSchemat, 'usersData')