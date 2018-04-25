'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const promiseUtil = require('./util/promise_util');
const Requester = require('./util/requester');
const request = new Requester();

async function getHistoricalBySymbol(symbols, interval) {
  return promiseUtil.mapChunk(symbols, symChunk => {
    return request
      .get('/quotes/historicals', {
        symbols: symChunk.join(','),
        interval
      })
      .then(res => res.results);
  }, 50);
}

module.exports = {
  getHistoricalBySymbol
};
