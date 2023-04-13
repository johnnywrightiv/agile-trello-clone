const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const ColumnSchema = new Schema ({
    boardId: {
      type: Schema.Types.ObjectId, 
      ref: 'Boards',
    },
    title: {
      type: String, 
      required: true,
    },
    cardOrder:[
      {
      type: String, 
      ref: 'Cards',
      }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Columns', ColumnSchema);