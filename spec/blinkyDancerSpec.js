describe('blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new makeBlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node blink', function() {
    sinon.spy(blinkyDancer.$node, 'toggle');
    blinkyDancer.step();
    expect(blinkyDancer.$node.toggle.called).to.be.true;
  });

  //-------------------------------------------------------

  var jQueryShow = sinon.stub($.fn, 'show');
  var jQueryHide = sinon.stub($.fn, 'hide');

  jQueryShow.callCount.should.be.equal(1);
  jQueryShow.thisValues[0].selector.should.be.equal("#login");

  jQueryHide.callCount.should.be.equal(1);
  jQueryHide.thisValues[0].selector.should.be.equal("#logout");

  it('should have a grow function that makes it grow', function() {
    sinon.spy(growingDancer.$node, 'on'); // or 'css'
    growingDancer.grow();
    expect(growingDancer.$node.on.called).to.be.true;
  });

  //-------------------------------------------------------

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(blinkyDancer, 'step');
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
  });
});
