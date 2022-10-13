const mongoose = require('mongoose');
const {Schema} = mongoose;
const CommentSchema = new Schema({
    nickname:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
},{timestamps:true});
CommentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
  });
  CommentSchema.set("toJSON", {
    virtuals: true,
  });

module.exports =mongoose.model("Comment",CommentSchema);