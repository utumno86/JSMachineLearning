require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require('../data/load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

let { features, labels, testFeatures, testLabels } = loadCSV('../data/cars.csv', {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['horsepower', 'displacement', 'weight'],
  labelColumns: ['mpg'],
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 3,
  batchSize: 10,
});

regression.train();

const r2 = regression.test(testFeatures, testLabels);

plot({
  x: regression.mseHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Mean Squared Error',
});
console.log('R2: ', r2);

regression.predict([
  [120, 380, 2],
]).print();
