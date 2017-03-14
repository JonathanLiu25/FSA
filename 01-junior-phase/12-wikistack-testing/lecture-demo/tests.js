const Cat = require('./cat-app').Cat;
const expect = require('chai').expect;

describe('Cat app', function () {
  
  describe('models', function () {

    // this gets applied to all `it`s any where inside the 'models' describe block
    before(function (done) {
      Cat.sync({force: true})
      .then(function () {
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    describe('instance methods', function () {

      describe('`getBellyRub`', function () {

        it('takes no arguments and returns a string', function () {
          const cat = Cat.build({});
          const result = cat.getBellyRub();
          expect(result).to.be.a('string');
        });

        xit('will base its output on the cats scratch probability', function () {
          const niceCat = Cat.build({scratchProbability: 0});
          const meanCat = Cat.build({scratchProbability: 1});
          const niceResult = niceCat.getBellyRub();
          const meanResult = meanCat.getBellyRub();
          expect(niceResult).to.equal('prrrr...');
          expect(meanResult).to.equal('Kill them! With claws!');
        });

        let originalRandom;
        beforeEach(function () {
          originalRandom = Math.random;
          Math.random = function () {
            return 0.5;
          };
        });

        afterEach(function () {
          Math.random = originalRandom;
        });

        // stub / fake! good for isolating things
        it('will base its output on the cats scratch probability', function () {
          const niceCat = Cat.build({scratchProbability: 0.4});
          const niceResult = niceCat.getBellyRub();
          expect(niceResult).to.equal('prrrr...');

          const meanCat = Cat.build({scratchProbability: 0.6});
          const meanResult = meanCat.getBellyRub();
          expect(meanResult).to.equal('Kill them! With claws!');
        });

      });

    });

    describe('class methods', function () {
  
      describe('`findAngryOnes`', function () {

        // way with callbacks and `done`
        it('takes no arguments and returns a promise for an array', function (iAmFinishedRunningThisSpec) {
          Cat.findAngryOnes()
          .then(function (cats) {
            expect(cats).to.be.an('array'); // throw an error
            iAmFinishedRunningThisSpec();
          })
          .catch(function (err) {
            iAmFinishedRunningThisSpec(err);
          });
        });

        // way with promises
        it('takes no arguments and returns a promise for an array', function () {
          const promise = Cat.findAngryOnes()
          .then(function (cats) {
            expect(cats).to.be.an('array'); // throw an error
          });
          return promise;
        });

      });

    });

  });
  
  describe('routes', function () {});

});