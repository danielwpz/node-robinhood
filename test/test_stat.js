'use strict';

const stat = require('../lib/crawler/robinhood/stat');
const _ = require('lodash');
require('should');

describe('Statistics Tests', function () {
  let most100;

  before(async () => {
    most100 = await stat.get100MostPopular();
  });


  describe('Get 100 Most Popular instruments', function () {
    it('should have at least 100 elements', async function () {
      (most100.length).should.be.aboveOrEqual(100);
    });
  });

  describe('Get one instrument', function () {
    let instrument;

    before(async () => {
      instrument = await stat.getInstrument(_.first(most100));
    });

    it('should resolve to an instrument', function () {
      assertInstrument(instrument);
    });
  });

  describe('Get many instruments', function () {
    let instruments;

    before(async () => {
      instruments = await stat.getInstruments(most100.slice(0, 10));
    });

    it('should resolve to a list of instrument', function () {
      instruments.forEach(assertInstrument);
    });
  });

  describe('Get ratings', function () {
    let rating;

    before(async () => {
      rating = await stat.getRatings(most100[2]);
    });

    it('should resolve to rating', function () {
      assertRating(rating);
    });
  });

  describe('Get Quote by instrument ID', function () {
    let quote;

    before(async () => {
      quote = await stat.getQuote(_.last(most100));
    });

    it('should resolve to quote', function () {
      assertQuote(quote);
    });
  });

  describe('Get Quote by symbol', function () {
    let quote;

    before(async () => {
      const instrument = await stat.getInstrument(most100[2]);
      quote = await stat.getQuoteBySymbol(instrument.symbol);
    });

    it('should also resolve to a quote', function () {
      assertQuote(quote);
    });
  });

  describe('Get one Popularity', function () {
    let popularity;

    before(async () => {
      popularity = await stat.getPopularity(most100[3]);
    });

    it('should resolve to popularity', function () {
      assertPopularity(popularity);
    });
  });

  describe('Get many Popularities', function () {
    let popularities;

    before(async () => {
      popularities = await stat.getPopularities(most100.slice(10, 15));
    });

    it('should resolve to a list of popularity', function () {
      popularities.forEach(assertPopularity);
    });
  });

  describe('Get instrument by its symbol', function () {
    let instrument;
    let symbol;

    before(async () => {
      symbol = (await stat.getInstrument(most100[3])).symbol;
      instrument = await stat.getInstrumentBySymbol(symbol);
    });

    it('should resolve to instrument', function () {
      assertInstrument(instrument);
      instrument.symbol.should.be.exactly(symbol);
    });
  });

  describe('Get historicals by symbols', function () {
    let symbols;
    let historical;

    before(async function() {
      this.timeout(20000);

      symbols = _.map((await stat.getInstruments(most100)), 'symbol');
      historical = await stat.getHistoricalBySymbol(symbols, 'week');
    });

    it('should resolve to historical', function () {
      historical.length.should.be.exactly(symbols.length);
      historical.forEach(assertHistorical);
    });
  });

  function assertInstrument(i) {
    i.should.have.property('name');
    i.should.have.property('id');
    i.should.have.property('symbol');
  }

  function assertRating(r) {
    r.should.have.property('summary');
    r.should.have.property('ratings');

    r.summary.should.have.property('num_buy_ratings');
    r.summary.should.have.property('num_hold_ratings');
    r.summary.should.have.property('num_sell_ratings');

    r.ratings.forEach(rating => {
      rating.should.have.property('type');
      rating.should.have.property('text');
    })
  }

  function assertQuote(q) {
    q.should.have.property('ask_price');
    q.should.have.property('bid_price');
    q.should.have.property('last_trade_price');
    q.should.have.property('symbol');
    q.should.have.property('previous_close');
  }

  function assertPopularity(p) {
    p.should.have.property('num_open_positions');
  }

  function assertHistorical(h) {
    h.should.have.property('symbol');
    h.should.have.property('interval');
    h.historicals.forEach(his => {
      his.should.have.property('open_price');
      his.should.have.property('close_price');
      his.should.have.property('volume');
    });
  }
});
