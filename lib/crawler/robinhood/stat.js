'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const urlJoin = require('url-join');
const Requester = require('./requester');
const request = new Requester();

/**
 * Get the list of instrument IDs with 100 Most Popular tag
 * @return {Promise<void>}
 */
async function get100MostPopular() {
  return Promise.resolve(request.get('midlands/tags/tag/100-most-popular/'))
    .then(res => res.instruments)
    .map(uri => _.last(uri.split('/').filter(x => !!x)));
}

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

async function getRatings(instrument) {
  return request.get(urlJoin('midlands/ratings', instrument));
}

async function getQuoteBySymbol(symbol) {
  return request.get(urlJoin('quotes', symbol));
}

async function getQuote(instrument) {
  const instrumentInfo = await getInstrument(instrument);
  return getQuoteBySymbol(instrumentInfo.symbol);
}

async function getPopularity(instrument) {
  return request.get(urlJoin('instruments', instrument, 'popularity'));
}

async function getPopularities(instrumentList) {
  instrumentList = instrumentList.join(',');
  return request.get(urlJoin('instruments', 'popularity'), { ids: instrumentList })
    .then(res => res.results);
}

async function getInstrumentBySymbol(symbol) {
  return request.get('instruments', {
    active_instruments_only: false,
    symbol: symbol
  })
    .then(res => _.first(res.results));
}

async function getHistoricals(symbols, interval) {
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
  get100MostPopular,
  getInstrument,
  getInstruments,
  getRatings,
  getQuoteBySymbol,
  getQuote,
  getPopularity,
  getPopularities,
  getInstrumentBySymbol,
  getHistoricals
};
