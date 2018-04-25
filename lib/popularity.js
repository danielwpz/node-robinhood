'use strict';

const urlJoin = require('url-join');
const Requester = require('./util/requester');
const request = new Requester();

async function getPopularity(instrument) {
  return request.get(urlJoin('instruments', instrument, 'popularity'));
}

async function getPopularities(instrumentList) {
  instrumentList = instrumentList.join(',');
  return request.get(urlJoin('instruments', 'popularity'), { ids: instrumentList })
    .then(res => res.results);
}

module.exports = {
  getPopularities,
  getPopularity
};