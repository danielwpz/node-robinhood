'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const urlJoin = require('url-join');
const Requester = require('./util/requester');
const request = new Requester();

async function getInstrument(instrument) {
  return request.get(urlJoin('instruments', instrument));
}

async function getInstruments(instrumentList) {
  const chunk = _.chunk(instrumentList, 50);

  return Promise
    .map(chunk, insChunk => {
      return request.get('instruments', { ids: insChunk.join(',') })
    })
    .then(data => {
      let results = [];
      data.forEach(d => {
        results = results.concat(d.results);
      });

      return results;
    });
}

async function getInstrumentBySymbol(symbol) {
  return request.get('instruments', {
    active_instruments_only: false,
    symbol: symbol
  })
    .then(res => _.first(res.results));
}

module.exports = {
  getInstrument,
  getInstruments,
  getInstrumentBySymbol
};