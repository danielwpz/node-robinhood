'use strict';

const promiseUtil = require('../lib/util/promise_util');
const should = require('should');

describe('Util Test', function () {

  describe('Promise util', function () {

    describe('mapChunk', function () {
      const list = [1, 2, 3, 4, 5, 6, 7];
      let results;

      before(async () => {
        results = await promiseUtil.mapChunk(list, xs => xs.map(x => x * 2), 3);
      });

      it('should do map chunk by chunk', function () {
        should(results.sort()).be.eql(list.map(x => x * 2).sort());
      });
    });

  });

});