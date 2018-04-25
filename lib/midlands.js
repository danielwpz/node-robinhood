'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const urlJoin = require('url-join');
const Requester = require('./util/requester');
const request = new Requester();

async function get100MostPopular() {
  return Promise.resolve(request.get('midlands/tags/tag/100-most-popular/'))
    .then(res => res.instruments)
    .map(uri => _.last(uri.split('/').filter(x => !!x)));
}

async function getRatings(instrument) {
  return request.get(urlJoin('midlands/ratings', instrument));
}

module.exports = {
  get100MostPopular,
  getRatings
};