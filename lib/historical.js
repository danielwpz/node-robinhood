'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Requester = require('./util/requester');
const request = new Requester();

async function getHistoricalBySymbol(symbols, interval) {
  const chunk = _.chunk(symbols, 50);

  return Promise
    .map(chunk, symChunk => {
      return request.get('/quotes/historicals', {
        symbols: symChunk.join(','),
        interval
      });
    })
    .then(data => {
      let results = [];
      data.forEach(d => {
        results = results.concat(d.results);
      });

      return results;
    });

}

module.exports = {
  getHistoricalBySymbol
};
