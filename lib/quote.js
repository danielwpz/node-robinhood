'use strict';

const urlJoin = require('url-join');
const Requester = require('./util/requester');
const request = new Requester();
const ins = require('./instrument');

async function getQuoteBySymbol(symbol) {
  return request.get(urlJoin('quotes', symbol));
}

async function getQuote(instrument) {
  const instrumentInfo = await ins.getInstrument(instrument);
  return getQuoteBySymbol(instrumentInfo.symbol);
}

module.exports = {
  getQuote,
  getQuoteBySymbol
};