const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardOrder:{
      type:String
    },
    title:{
      type:String, 
      required:true,
    },
    column:{
      type:String, 
      ref:'cards',
    }
});

module.exports = mongoose.model('Cards', CardSchema);