require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const _ = require('lodash');
const plot = require('node-remote-plot');
const LogisticRegression = require('./logistic-regression');
const mnist = require('mnist-data');

const mnistData = mnist.training(0, 1);

const features = mnistData.images.values.map(image => _.flatMap(image));
console.log(mnistData.labels.values);

