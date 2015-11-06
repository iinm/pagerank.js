# pagerank.js

PageRank in JavaScript

The code is based on [networkx.pagerank](https://github.com/networkx/networkx/blob/master/networkx/algorithms/link_analysis/pagerank_alg.py) (Python).

## Usage

```javascript
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

{ foo: 0.39361741945785234,
  bar: 0.3031912902710737,
  hoge: 0.3031912902710737 }

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

{ '1': 0.12042665444173714,
  '2': 0.14210354170711398,
  '3': 0.3133508601602357,
  '4': 0.4241189436909133 }
```

## Default parameters

```javascript
var scores = pagerank(
  graph,  // required
  {
    // optional parameters
    alpha: .85,  // damping factor
    personalization: null,
    max_iter: 100,
    tol: 1.0e-6  // error tolerance
  }
);
```

## Application example

- [lexrank.js](https://github.com/iinm/lexrank.js) - a building block for text summarization.
