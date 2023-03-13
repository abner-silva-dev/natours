const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures.js');

exports.deleteOne = Model => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: 'null'
    });
  });
};

exports.createOne = Model => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc
      }
    });
  });
};

exports.updateOne = Model => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
};

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
};

exports.getAll = Model => {
  return catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on Tour (Hack)
    // let filter = req.params.id ? { tour: req.params.id } : {};

    let filter = req.params.type || {};

    // EXECUTE QUERY
    const feature = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    // const doc = await feature.query.explain();
    const doc = await feature.query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      result: doc.length,
      data: {
        data: doc
      }
    });
  });
};

exports.setNestedRouteParam = type =>
  catchAsync(async (req, res, next) => {
    switch (type) {
      case 'user':
        req.type = { user: req.params.id };
        break;
      case 'review':
        req.type = { review: req.params.id };
        break;
      case 'tour':
        req.type = { tour: req.params.id };
      default:
        req.type = undefined;
    }
    next();
  });
