# pagerank.js

PageRank in JavaScript

The code is based on [networkx.pagerank](https://github.com/networkx/networkx/blob/master/networkx/algorithms/link_analysis/pagerank_alg.py).

## Usage

```
// foo -> bar, foo -> hoge, hoge -> foo
var scores = pagerank({'foo': ['bar', 'hoge'], 'bar': [], 'hoge': ['foo']}, {});
console.log(scores);

{ foo: 0.39361741945785234,
  bar: 0.3031912902710737,
  hoge: 0.3031912902710737 }

var scores = pagerank({1: [2, 3, 4], 2: [3], 3: [4], 4: []}, {alpha: 0.9});
console.log(scores);

{ '1': 0.12058369103563131,
  '2': 0.15675865707072126,
  '3': 0.2978412511529958,
  '4': 0.42481640074065163 }

```
