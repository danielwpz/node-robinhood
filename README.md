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

- `get100MostPopular()`      
    *return*: A list of instrument ids under the 100 most popular tag      
    
- `getInstrument(id)`      
    *return*: An instrument object      
    
- `getInstruments(id_list)`      
    *`id_list`* List of instrument ids      
    *return*: List of instrument objects      
    
- `getRatings(id)`    
    *return*: Ratings object about instrument with id      
    
- `getQuoteBySymbol(symbol)`
- `getQuote(id)`
- `getPopularity(id)`
- `getPopularities(id_list)`
- `getInstrumentBySymbol(symbol)`
- `getHistoricalBySymbol(symbol_list, interval)`      
  *`interval` time interval, could be `week`, `day`...
