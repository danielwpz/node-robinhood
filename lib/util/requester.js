'use strict';

const rp = require('request-promise');
const _ = require('lodash');
const urlJoin = require('url-join');

const BASE_URL = 'https://api.robinhood.com';

class Request {
  get(path, qs) {
    let uri = urlJoin(BASE_URL, path);
    uri = _.last(uri) === '/' ? uri : `${uri}/`;

    const options = {
      uri: uri,
      qs: qs,
      json: true
    };

    return rp(options);
  }
}

module.exports = Request;
