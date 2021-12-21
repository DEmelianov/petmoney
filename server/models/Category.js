const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true, trim: true, maxLength: [50, 'You can use less then 50 symbols']},
    countUsage: {Type: Number, default: 0},
})

module.exports = model('Category', schema)