var assert = require('assert');
var utils = require('../dist/utils.js');

describe('utils', function() {
    it('utils', function() {
        assert.ok(utils);
    });
    it('utils.array', function() {
        assert.ok(utils.array);
    });
    it('utils.base64', function() {
        assert.ok(utils.base64);
    });
    it('utils.color', function() {
        assert.ok(utils.color);
    });
    it('utils.color.cmyk', function() {
        assert.ok(utils.color.cmyk);
    });
    it('utils.color.hex', function() {
        assert.ok(utils.color.hex);
    });
    it('utils.color.rgb', function() {
        assert.ok(utils.color.rgb);
    });
    it('utils.date', function() {
        assert.ok(utils.date);
    });
    it('utils.easing', function() {
        assert.ok(utils.easing);
    });
    it('utils.func', function() {
        assert.ok(utils.func);
    });
    it('utils.geom', function() {
        assert.ok(utils.geom);
    });
    it('utils.geom.point', function() {
        assert.ok(utils.geom.point);
    });
    it('utils.hex', function() {
        assert.ok(utils.hex);
    });
    it('utils.json', function() {
        assert.ok(utils.json);
    });
    it('utils.math', function() {
        assert.ok(utils.math);
    });
    it('utils.math.interpolation', function() {
        assert.ok(utils.math.interpolation);
    });
    it('utils.number', function() {
        assert.ok(utils.number);
    });
    it('utils.object', function() {
        assert.ok(utils.object);
    });
    it('utils.random', function() {
        assert.ok(utils.random);
    });
    it('utils.string', function() {
        assert.ok(utils.string);
    });
    it('utils.test', function() {
        assert.ok(utils.test);
    });
    it('utils.trigo', function() {
        assert.ok(utils.trigo);
    });
    it('utils.type', function() {
        assert.ok(utils.type);
    });
    it('utils.url', function() {
        assert.ok(utils.url);
    });
    it('utils.xml', function() {
        assert.ok(utils.xml);
    });
});