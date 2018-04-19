'use strict';

require('should');
const RobinhoodRating = require('../lib/rating/rating_robinhood');
const rating = new RobinhoodRating();

describe('Robinhood Rating Test', function () {

  describe('Get Ratings without symbol', function () {
    let ratings;

    before(async function() {
      this.timeout(10000);
      ratings = await rating.getRatings();
    });

    it('should get more than 100 ratings', function () {
      (ratings.length).should.be.aboveOrEqual(100);
      ratings.forEach(assertRating);
    });
  });

  describe('Get Ratings with symbols', function () {
    const symbols = ['AMZN', 'AAPL', 'FB'];
    let ratings;

    before(async () => {
      this.timeout(10000);
      ratings = await rating.getRatings(symbols);
    });

    it('should get ratings we asked', function () {
      (ratings.length).should.be.exactly(symbols.length);
      ratings.forEach(assertRating);
    });
  });

  function assertRating(r) {
    r.should.have.property('symbol');
    if (r.rating) {
      r.rating.should.be.aboveOrEqual(0);
      r.rating.should.be.belowOrEqual(100);
    }
  }

});
