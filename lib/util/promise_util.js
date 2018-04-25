'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

function mapChunk(list, mapFunc, chunkSize) {
  chunkSize = chunkSize || 1;
  const chunk = _.chunk(list, chunkSize);

  return Promise.map(chunk, mapFunc)
    .then(data => {
      let results = [];
      data.forEach(d => {
        results = results.concat(d);
      });

      return results;
    });
}

module.exports = {
  mapChunk
};