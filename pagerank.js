// pagerank.js
//
// based on networkx.pagerank (Python)
// https://github.com/networkx/networkx/blob/master/networkx/algorithms/link_analysis/pagerank_alg.py

function pagerank(G, params) {

  // set default parameter
  if (params.alpha == null) params.alpha = 0.85;
  if (params.tol == null) params.tol = 1.0e-6;
  if (params.max_iter == null) params.max_iter = 100;

  var N = Object.keys(G).length
  if (N == 0) return {};

  // Create a copy in (right) stochastic form
  var W = {}
  for (var node in G) {
    var nodes = G[node];
    var num_nodes = nodes.length;
    var new_nodes = {};
    //for (var node_ in nodes) {
    nodes.forEach(function(node_) {
      new_nodes[node_] = {'weight': 1.0 / num_nodes};
    });
    W[node] = new_nodes;
  }
  //console.log(W);

  // Choose fixed starting vector if not given
  var x = {};
  if (params.nstart == null) {
    for (var node in W) x[node] = 1.0 / N;
  }
  else {
    // Normalized nstart vector
    var sum = 0.0;
    Object.values(params.nstart).forEach(function(x) {
      sum += x;
    });
    for (var node in params.nstart)
      x[node] = params.nstart[node] / sum;
  }
  //console.log(x);

  p = {};
  if (params.personalization == null) {
    // Assign uniform personalization vector if not given
    for (var node in W) p[node] = 1.0 / N;
  }
  else {
    // TODO: check missing nodes
    var sum = 0.0;
    Object.values(params.personalization).forEach(function(x) {
      sum += x;
    });
    for (var node in params.personalization)
      p[node] = params.personalization[node] / sum;
  }

  var dangling_weights = {};
  if (params.dangling == null) {
    // Use personalization vector if dangling vector not specified
    dangling_weights = p;
  }
  else {
    // TODO: check missing nodes
    var sum = 0.0;
    Object.values(params.dangling).forEach(function(x) {
      sum += x;
    });
    for (var node in params.dangling)
      dangling_weights[node] = params.dangling[node] / sum;
  }
  var dangling_nodes = [];
  for (var node in W) {
    if (Object.keys(W[node]).length == 0) // need review
      dangling_nodes.push(node);
  }
  //console.log(dangling_nodes);

  // power iteration: make up to max_iter iterations
  for (var iter_count = 0; iter_count < params.max_iter; iter_count++) {
    var xlast = x;
    x = {};
    for (var node in xlast) x[node] = 0.0;
    var sum = 0.0;
    dangling_nodes.forEach(function(node) {
      sum += xlast[node]
    });
    var danglesum = params.alpha * sum;

    for (var node in x) {
      // this matrix multiply looks odd because it is
      // doing a left multiply x^T=xlast^T*W
      for (var nbr in W[node]) {
        x[nbr] += params.alpha * xlast[node] * W[node][nbr]['weight'];
      }
      x[node] += danglesum * dangling_weights[node] + (1.0 - params.alpha) * p[node];
    }

    // check convergence, l1 norm
    var err = 0.0;
    Object.keys(x).forEach(function(node) {
      err += Math.abs(x[node] - xlast[node])
    });
    if (err < N*params.tol)
      return x;
  }

  console.warn('pagerank: power iteration failed to converge in ' +
               params.iter_max + ' iterations.');
  return x;
}

// test
//var xs = pagerank({1: [2, 3, 4], 2: [3], 3: [4], 4: []}, {alpha: 0.9});
//console.log(xs);