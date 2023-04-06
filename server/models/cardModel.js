const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: {
      type: String, 
      required: true,
    },
    text: {
      type: String, 
      required: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'columns',
    },
    label: {
      type: String
    },
    labelColor: {
      type: String
    },
    description: {
      type: String
    },
    // comments: {
    //   type: Array
    // }
}, {timestamps: true});

module.exports = mongoose.model('Cards', CardSchema);