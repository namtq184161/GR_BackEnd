const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['profilePicture', 'cover', null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        commentAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
