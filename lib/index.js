'use strict';

const instrument = require('./instrument');
const midlands = require('./midlands');
const popularity = require('./popularity');
const quote = require('./quote');
const historical = require('./historical');

module.exports = {
  instrument,
  midlands,
  popularity,
  quote,
  historical
};