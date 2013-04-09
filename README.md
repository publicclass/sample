
# sample (sampl? available on npm...)

    var sample = require('sample');
    var a = new sample;


    a = {
      v: null,// current/last value
      n: 0,   // count
      s: 0,   // sum
      sq: 0,  // sum squared
      sl: 0,  // sum log
      sql: 0, // sum log squared
      mn: 0,  // min
      mx: 0,  // max
      q: [],  // quantiles (defaults to quartiles: [], define eta)
    }

    sample(a,1)
    sample(a,1)
    sample(a,3)
    sample(a,4)
    sample(a,1,2,3,4,5,10)

    var b = new sample(a) // clone!

  Get the values using the available functions:

  * sample.stdev(a[,!arithmetic,geometric])
  * sample.mean(a[,!arithmetic,geometric,harmonic,quadric])
  * sample.variance(a)
  * sample.sum(a)
  * sample.moe(a)
  * sample.range(a) // = max-min
  * sample.min(a)
  * sample.max(a)
  * sample.product(a)
  * sample.count(a)

  // approximations
  * sample.quantile(a,q) // approximation
  * sample.median(a)  // = sample.quantile(.5)

  // maybe just keep internal?
  * sample.sumSq(a)
  * sample.sumLog(a)
  * sample.sumSqLog(a)


## sample-time

    var sample = require('sample')
      , time = require('sample-time');

    var a = new sample();

    time.start(a)
    time.end(a)
    time(a)

  sets `frames` & `time` properties on the sample a

  fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) )
  ms = time - startTime

## sample-count

  Increments a number on the sample

  count(a) // a.i++
  count(a) // a.i++
  count(a) // a.i++
  count(a) // a.i++
  count.sample(a) // sample(a,a.i); a.i = 0;

  Examples:

    - count the number of times update() has been called during a frame
    - count the number of extras has been added/removed during an update()
    - count the collisions during an update()

## sample-viz


  +-----------------------+
  |title                 Z|
  +-----------------------+
  |  x       xxx          |
  |xx xxxx      xxxxx x   |
  |       xxx        x xxx|
  |                       |
  |                       |
  +-----------------------+
  |stdev: X        mean: Y|
  +-----------------------+


  - Click "stdev: X" or "mean: Y" to toggle between:
     * stdev
     * mean (arithmetic,geometric,harmonic,quadric)
     * median
     * variance
     * sum
     * range
     * min
     * max
     * product
     * count

  - Click "title Z" to toggles between different samples.
  - Draw colored background lines for the "secondary" values (stdev/mean in ascii)


### API

  var sample = require('sample');
  var time = require('sample-time');
  var viz = require('sample-viz');

  var a = new sample;
  var b = new sample;
  var c = new sample;

  var va = new viz(a,{name:'frame time',unit:'ms'});
  document.body.appendChild(va.div);

  requestAnimationFrame(function render(){
    requestAnimationFrame(render);
    time.start(a) // = a.startTime = now();
    while(Math.random() > .1){
      sample(c,Math.random()*1000)
    }
    time.end(a) // = sample(a,now()-a.startTime)
    time(b)     // = b.frames++; b.startTime = b.startTime || now(); if( now() > b.startTime+1000 ) { sample(b,b.frames/(now()-b.startTime)); b.frames = 0; b.startTime = now(); }
    va.render()
  })