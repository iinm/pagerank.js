var pagerank = require('./pagerank.js');

// weighted directed graph
// foo --1--> bar, foo --1--> hoge, hoge --1--> foo
var scores = pagerank(
  {
    'foo': { 'bar': { weight: 1 }, 'hoge': { weight: 1 } },
    'bar': {},
    'hoge': { 'foo': { weight: 1 } }
  }
);
console.log(scores);

var scores = pagerank(
  {
    1: { 2: { weight: 1 }, 3: { weight: 3 }, 4: { weight: 1 } },
    2: { 3: { weight: 1 } },
    3: { 4: { weight: 1 } },
    4: {}
  },
  { alpha: 0.9 }
);
console.log(scores);
