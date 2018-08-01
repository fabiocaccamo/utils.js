var utils = require('../dist/utils.js');
var test = utils.test;

describe('utils', function() {
    it('utils', function() {
        test.assertObject(utils);
    });
    it('utils.array', function() {
        test.assertObject(utils.array);
    });
    it('utils.base64', function() {
        test.assertObject(utils.base64);
    });
    it('utils.color', function() {
        test.assertObject(utils.color);
    });
    it('utils.color.cmyk', function() {
        test.assertObject(utils.color.cmyk);
    });
    it('utils.color.hex', function() {
        test.assertObject(utils.color.hex);
    });
    it('utils.color.rgb', function() {
        test.assertObject(utils.color.rgb);
    });
    it('utils.date', function() {
        test.assertObject(utils.date);
    });
    it('utils.ease', function() {
        test.assertObject(utils.ease);
    });
    it('utils.func', function() {
        test.assertObject(utils.func);
    });
    it('utils.geom', function() {
        test.assertObject(utils.geom);
    });
    it('utils.geom.point', function() {
        test.assertObject(utils.geom.point);
    });
    it('utils.hex', function() {
        test.assertObject(utils.hex);
    });
    it('utils.json', function() {
        test.assertObject(utils.json);
    });
    it('utils.math', function() {
        test.assertObject(utils.math);
    });
    it('utils.math.interpolation', function() {
        test.assertObject(utils.math.interpolation);
    });
    it('utils.number', function() {
        test.assertObject(utils.number);
    });
    it('utils.object', function() {
        test.assertObject(utils.object);
    });
    it('utils.random', function() {
        test.assertObject(utils.random);
    });
    it('utils.string', function() {
        test.assertObject(utils.string);
    });
    it('utils.test', function() {
        test.assertObject(utils.test);
    });
    it('utils.trigo', function() {
        test.assertObject(utils.trigo);
    });
    it('utils.type', function() {
        test.assertObject(utils.type);
    });
    it('utils.url', function() {
        test.assertObject(utils.url);
    });
    it('utils.xml', function() {
        test.assertObject(utils.xml);
    });
});