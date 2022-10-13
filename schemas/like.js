const mongoose = require('mongoose');
const {Schema} = mongoose;
const LikeSchema = new Schema({
    nickname:{
        type:String,
        required:true,
    },

    title:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        required:true,
    },
});
LikeSchema.virtual("likeId").get(function () {
    return this._id.toHexString();
  });
  LikeSchema.set("toJSON", {
    virtuals: true,
  });
module.exports =mongoose.model("Like",LikeSchema);