
module.exports = sample;

var slice = [].slice;

function sample(s){
  // sample(s,x...)
  // hottest path
  if( arguments.length > 1 ){
    return addMany(s,slice.call(arguments,1))
  }

  // new sample
  else if( this instanceof sample ){
    return new Sample;
  }

  // sample()
  else if( arguments.length == 0 ){
    return new Sample;
  }

  // sample(old)
  else if( typeof s == 'object' && arguments.length == 1 ){
    var n = new Sample;
    copy(s,n)
    return n;
  }
}

sample['σ'] =
sample.stddev =
sample.stdev = function(s,type){
  if( s.n == 0 ){
    return NaN;
  }

  // geometric
  if( type && type[0] == 'g' ){
    return Math.exp(Math.sqrt((s.n * s.sql - s.sl*s.sl)/(s.n*s.n)));

  // arithmetic (default)
  } else {
    return Math.sqrt(sample.variance(s));
  }
}

sample['μ'] =
sample.mean = function(s,type){
  if( s.n == 0 ){
    return 0;
  }

  switch(type && type[0]){
    case 'g': // geometric
      // alt. return Math.pow(Math.abs(sample.product(s)),1/s.n);
      return Math.exp(s.sl/s.n);
    case 'h': // harmonic
      // src: https://github.com/stackd/gauss/blob/master/lib/vector.js#L117
      return NaN; // TODO
    case 'q': // quadric
      // src: https://github.com/stackd/gauss/blob/master/lib/vector.js#L134
      return Math.sqrt(s.sq/s.n);
    case 'a': // arithmetic (default)
    default:
      return s.s/s.n;
  }
}

sample.variance = function(s){
  if( s.n == 0 ){
    return NaN;
  }
  // TODO type? geometric as in stddev?
  return (s.n * s.sq - s.s*s.s)/(s.n*s.n);
}

sample['Σ'] =
sample.sum = function(s){
  return s.s;
}


// http://en.wikipedia.org/wiki/Standard_error_%28statistics%29
sample.moe = function(s){
  return 1.96*sample.stddev(s)/Math.sqrt(s.n);
}


sample.range = function(s){
  if( s.n == 0 ){
    return NaN;
  }
  return sample.max(s) - sample.min(s);
}


sample.min = function(s){
  if( s.n == 0 ){
    return NaN;
  }
  return s.mn;
}


sample.max = function(s){
  if( s.n == 0 ){
    return NaN;
  }
  return s.mx;
}


sample['π'] =
sample.product = function(s){
  return Math.exp(s.sl);
}


sample.n =
sample.length =
sample.count = function(s){
  return s.n;
}



function addMany(s,x){
  for(var i=0; i<x.length; i++){
    if( Array.isArray(x[i]) ){
      addMany(s,x[i]);
    } else {
      add(s,x[i]);
    }
  }
  return s;
}

function add(s,x){
  var l = Math.log(x);
  s.v = x;
  s.s += x;
  if( s.sq > Number.MAX_VALUE - x*x){
    console.warn('sum squared to overflow');
  }
  s.sq += x*x;
  s.sl += l;
  s.sql += l*l;
  s.n += 1;
  if( s.mn === null || x < s.mn ){
    s.mn = x;
  }
  if( s.mx === null || x > s.mx ){
    s.mx = x;
  }
}

function copy(a,b){
  b.n = a.n;      // count
  b.s = a.s;      // sum
  b.sq = a.sq;    // sum squared
  b.sl = a.sl;    // sum log
  b.sql = a.sql;  // sum log squared
  b.mn = a.mn;    // min
  b.mx = a.mx;    // max
  // TODO quantiles
}

function Sample(){
  this.v = null;   // value (current/last)
  this.n = 0;      // count
  this.s = 0;      // sum
  this.sq = 0;     // sum squared
  this.sl = 0;     // sum log
  this.sql = 0;    // sum log squared
  this.mn = null;  // min
  this.mx = null;  // max
  // this.q = [];  // TODO quantiles (defaults to quartiles: [0,.25,.5,.75,1], define eta in opts) http://stackoverflow.com/a/2144754/80582
}
