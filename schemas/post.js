const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);
PostSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});
PostSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model(`Post`, PostSchema);
