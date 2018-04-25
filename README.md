# node-robinhood
This is a javascript lib helps you to grab public data from robinhood.      
Based on https://github.com/sanko/Robinhood

## Install
`npm install --save node-robinhood`

## Test
`npm test`

## Example
```
const robinhood = require('node-robinhood');

robinhood.getInstrumentBySymbol('FB')
  .then(console.log);
  
robinhood.getQuoteBySymbol('BAC')
  .then(console.log);
```

## API    

*NOTE: `id` means a single instrument ID (e.g. `ebab2398-028d-4939-9f1d-13bf38f81c50`), 
`symbol` means a single instrument symbol (e.g. `FB`)*

- `instrument`
  - `getInstrument(id)`           
      &nbsp;&nbsp;*return*: An instrument object
    
  - `getInstruments(id_list)`            
      &nbsp;&nbsp;*`id_list`* List of instrument ids          
      &nbsp;&nbsp;*return*: List of instrument objects

  - `getInstrumentBySymbol(symbol)`

- `midlands`
  - `getRatings(id)`           
      &nbsp;&nbsp;*return*: Ratings object about instrument with id

  - `get100MostPopular()`             
      &nbsp;&nbsp;*return*: A list of instrument ids under the 100 most popular tag

- `quote`
  - `getQuoteBySymbol(symbol)`
  - `getQuote(id)`

- `popularity`
  - `getPopularity(id)`
  - `getPopularities(id_list)`

- `historical`
  - `getHistoricalBySymbol(symbol_list, interval)`           
    &nbsp;&nbsp;*`interval`* time interval, could be `week`, `day`...
