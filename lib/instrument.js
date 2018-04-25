'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const urlJoin = require('url-join');
const promiseUtil = require('./util/promise_util');
const Requester = require('./util/requester');
const request = new Requester();

async function getInstrument(instrument) {
  return request.get(urlJoin('instruments', instrument));
}

async function getInstruments(instrumentList) {
  return promiseUtil.mapChunk(instrumentList, insChunk => {
    return request
      .get('instruments', { ids: insChunk.join(',') })
      .then(res => res.results);
  }, 50);
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