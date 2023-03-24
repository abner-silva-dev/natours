const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Bookings = require('./../models/bookingModel');

const catchAsync = require('./../utils/catchAsync');
const Booking = require('./../models/bookingModel');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;

  if (alert === 'booking')
    res.locals.alert =
      "your booking was successful! Please check your email for confirmation. If your booking doesn't show up here inmmediatly, please come back later";

  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get tour data, for the requested tour (including reviews and guides)

  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) return next(new AppError(`There is not tour with that name`, 404));

  // 2) Build template

  // 3) Render template using data from 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', { title: 'Create your account' });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPassword', { title: 'recover your account' });
});

exports.recoverAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('recoverAccount', {
    title: 'Create new password',
    token: req.params.token
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', { title: 'Your account' });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  //  1) find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  //  2) find tours with the returned IDs
  const toursIds = bookings.map(el => el.tour.id);
  console.log('Tours ids', toursIds);
  const tours = await Tour.find({ _id: { $in: toursIds } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    { new: true, runValidators: true }
  );

  res
    .status(200)
    .render('account', { title: 'Your account', user: updateUser });
});
