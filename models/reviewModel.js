// review /rating /createdAt /ref to tour / ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      maxlength: [250, 'A rating must be below less or equal to 5'],
      minLength: [1, 'A rating must be greater or equal to 1'],
      required: [true, 'Review can not empty!']
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: [true, 'A review must be a rating']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: '-email -role'
  });
  next();
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// THIS point to current model
reviewSchema.statics.calcAverageRatings = async function(tourId) {
  let [stats] = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (!stats) {
    stats = {};
    stats.avgRating = 4.5;
    stats.nRatings = 0;
  }

  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: stats.avgRating,
    ratingsQuantity: stats.nRatings
  });
};

reviewSchema.post('save', async function() {
  // THIS point to current review
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does Not work here, query has alredy executed
  if (!this.r) return;
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
