const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');

dotenv.config({ path: './../../config.env' });

const collectionsNames = ['tours', 'reviews', 'users'];
const collectionsModel = [Tour, Review, User];

// MODIFY PASSWORD IN THE CONNECTION STRING
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// CONECTION WITH THE DATABASE
(async () => {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log('DB connection successful!');
})();

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync('tours.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('reviews.json', 'utf-8'));

const JSONFiles = [tours, reviews, users];

// IMPORT DATA INTO DB
const importData = async (JSONFile, ...models) => {
  try {
    let promiseModels;

    !models[0]
      ? (promiseModels = collectionsModel.map(model =>
          model.create(JSONFile, { validateBeforeSave: false })
        ))
      : (promiseModels = models.map(model => model.create(JSONFile)));

    await Promise.all(promiseModels);
    console.log('data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM BD
const removeAllData = async (...models) => {
  try {
    let promiseModels;

    !models[0]
      ? (promiseModels = collectionsModel.map(model => model.deleteMany()))
      : (promiseModels = models.map(model => model.deleteMany()));

    await Promise.all(promiseModels);
    console.log('data successfully removed!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// CHECK THE USER INPUT AND VALIDATE
(async () => {
  if (process.argv[2] !== '--import' && process.argv[2] !== '--remove') {
    process.exit();
  }

  let JSONFile;
  let collection;

  if (process.argv[3]) {
    if (!collectionsNames.includes(process.argv[3])) process.exit();

    const indexName = collectionsNames.findIndex(el => el === process.argv[3]);
    collection = collectionsModel[indexName];
    JSONFile = JSONFiles[indexName];
  }

  switch (process.argv[2]) {
    case '--import':
      await importData(JSONFile, collection);
    case '--remove':
      await removeAllData(collection);
  }
})();
