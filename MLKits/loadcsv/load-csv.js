const fs = require('fs');
const _ = require('lodash')

function loadCSV(fileName, options) {
  let data = fs.readFileSync(fileName, { encoding: 'utf-8' });
  data = data.split('\n').map(row => row.split(','));
  data = data.map(row => _.dropRightWhile(row, val => val === ''));
  console.log(data);
}

loadCSV('data.csv');
