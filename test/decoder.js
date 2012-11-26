
var fs = require('fs');
var path = require('path');
var lame = require('../');
var assert = require('assert');
var fixtures = path.resolve(__dirname, 'fixtures');

describe('Decoder', function () {

  describe('pipershut_lo.mp3', function ()  {
    var filename = path.resolve(fixtures, 'pipershut_lo.mp3');

    it('should emit a single "format" event', function (done) {
      var file = fs.createReadStream(filename);
      var decoder = new lame.Decoder();
      decoder.on('format', function (format) {
        assert(format);
        done();
      });
      file.pipe(decoder);
    });

    it('should emit a single "finish" event', function (done) {
      var file = fs.createReadStream(filename);
      var decoder = new lame.Decoder();
      decoder.on('finish', done);
      file.pipe(decoder);
      decoder.resume();
    });

    it('should emit a single "end" event', function (done) {
      var file = fs.createReadStream(filename);
      var decoder = new lame.Decoder();
      decoder.on('end', done);
      file.pipe(decoder);
      decoder.resume();
    });

    it('should emit "readable" events', function (done) {
      var file = fs.createReadStream(filename);
      var count = 0;
      var decoder = new lame.Decoder();
      decoder.on('readable', function () {
        count++;
        var b;
        while (null != (b = decoder.read()));
      });
      decoder.on('finish', function () {
        assert(count > 0);
        done();
      });
      file.pipe(decoder);
    });

  });

});