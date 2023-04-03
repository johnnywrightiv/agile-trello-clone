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
    }
});

module.exports = mongoose.model('Cards', CardSchema);