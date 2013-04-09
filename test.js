var sample = require('./');

var a = sample();

console.log(a)

console.time('sampling')
sample(a,1)
sample(a,2.5,3,4)
sample(a,[5,6,7])
sample(a,8)
sample(a,9)
console.timeEnd('sampling')

console.log(a)

// verify results with http://wolfr.am/ZaNudW
console.time('logging')
console.log('stddev (arithmetic)',sample.stddev(a))
console.log('stddev (geometric)',sample.stddev(a,'geometric'))
console.log('mean (arithmetic)',sample.mean(a))
console.log('mean (geometric)',sample.mean(a,'geometric'))
console.log('mean (quadric)',sample.mean(a,'quadric'))
console.log('mean (harmonic)',sample.mean(a,'harmonic'))
console.log('variance',sample.variance(a))
console.log('product',sample.product(a))
console.log('moe (standard error)',sample.moe(a))
console.log('sum',sample.sum(a))
console.log('min',sample.min(a))
console.log('max',sample.max(a))
console.log('range',sample.range(a))
console.log('count',sample.count(a))
console.timeEnd('logging')