require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const _ = require('lodash');
const plot = require('node-remote-plot');
const loadCSV = require('../data/load-csv');
const LogisticRegression = require('./logistic-regression');


const { features, labels, testFeatures, testLabels } = loadCSV('../data/cars.csv', {
  dataColumns: [
    'horsepower',
    'displacement',
    'weight',
  ],
  labelColumns: ['mpg'],
  shuffle: true,
  splitTest: 50,
  converters: {
    mpg: ((value) => {
      const mpg = parseFloat(value);

      if (mpg < 15) {
        return [1, 0, 0];
      } if (mpg < 30) {
        return [0, 1, 0];
      }
      return [0, 0, 1];
    }),
  },
});


const regression = new LogisticRegression(features, _.flatMap(labels), {
  learningRate: 0.5,
  iterations: 100,
  batchSize: 10,
});

regression.train();
regression.predict([
  [150, 200, 2.223],
]).print();
