const fs = require('fs');
const _ = require('lodash');
const shuffleSeed = require('shuffle-seed');

function extractColumns(data, columnNames) {
  const headers = _.first(data);

  const indexes = _.map(columnNames, column => headers.indexOf(column));
  const extracted = _.map(data, row => _.pullAt(row, indexes));

  return extracted;
}

function loadCSV(fileName, {
  converters = {},
  dataColumns = [],
  labelColumns = [],
  shuffle = false,
}) {
  let data = fs.readFileSync(fileName, { encoding: 'utf-8' });
  data = data.split('\n').map(row => row.split(','));
  data = data.map(row => _.dropRightWhile(row, val => val === ''));
  const headers = _.first(data);

  data = data.map((row, index) => {
    if (index === 0) {
      return row;
    }

    return row.map((element, index) => {
      if (converters[headers[index]]) {
        const converted = converters[headers[index]](element);
        return _.isNaN(converted) ? element : converted;
      }
      const result = parseFloat(element);
      return _.isNaN(result) ? element : result;
    });
  });

  let labels = extractColumns(data, labelColumns);
  data = extractColumns(data, dataColumns);

  data.shift();
  labels.shift();

  if (shuffle) {
    data = shuffleSeed.shuffle(data, 'phrase');
    labels = shuffleSeed.shuffle(labels, 'phrase');
  }

  console.log(data);
  console.log(labels);
}

loadCSV('data.csv', {
  dataColumns: ['height', 'value'],
  labelColumns: ['passed'],
  shuffle: true,
  converters: {
    passed: val => val === 'TRUE',
  },
});
