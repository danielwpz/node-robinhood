'use strict';

const Promise = require('bluebird');
const Rating = require('./rating_base');
const stat = require('../crawler/robinhood/stat');

class RobinhoodRating extends Rating {

  constructor() {
    super();
  }

  getRatings(symbols) {
    if (symbols) {
      return Promise.map(symbols, symbol => {
        return stat.getInstrumentBySymbol(symbol)
          .then(i => stat.getRatings(i.id))
          .then(rawRating => {
            return {
              symbol,
              rating: RobinhoodRating._calRating(rawRating)
            };
          });
      });
    } else {
      return Promise.resolve(stat.get100MostPopular())
        .map(stat.getInstrument)
        .map(instrument => {
          return stat.getRatings(instrument.id)
            .then(rawRating => {
              return {
                symbol: instrument.symbol,
                rating: RobinhoodRating._calRating(rawRating)
              };
            });
        });
    }
  }

  static _calRating(rawRating) {
    if (rawRating.summary) {
      const summary = rawRating.summary;
      const buyRatings = summary.num_buy_ratings;
      const allRatings = summary.num_buy_ratings + summary.num_hold_ratings + summary.num_sell_ratings;
      return buyRatings / allRatings * 100.0;
    }

    return undefined;
  }
}

module.exports = RobinhoodRating;
