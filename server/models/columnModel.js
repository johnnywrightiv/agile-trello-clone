const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
    boardId:{
      type:Schema.Types.ObjectId, 
      ref:'boards',
    },
    title:{
      type:String, 
      required:true,
    },
    cardOrder:[
      {
      type:String, 
      ref:'cards',
      }
    ]
});

module.exports = mongoose.model('Columns', ColumnSchema);