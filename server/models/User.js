const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    crated: {type: Date, default: Date.now},
    accounts: [{type: Types.ObjectId, ref: 'Account'}],
    categories: [{
        type: Types.ObjectId, ref: 'Category',
        subcategories: [{
            type: Types.ObjectId, ref: 'Category'
        }]
    }]
})

module.exports = model('User', schema)