import utils from '../src/utils.js';

const test = utils.test;

describe('utils', () => {
    it('utils', () => {
        test.assertObject(utils);
    });
    it('utils.array', () => {
        test.assertObject(utils.array);
    });
    it('utils.base64', () => {
        test.assertObject(utils.base64);
    });
    it('utils.color', () => {
        test.assertObject(utils.color);
    });
    it('utils.color.cmyk', () => {
        test.assertObject(utils.color.cmyk);
    });
    it('utils.color.hex', () => {
        test.assertObject(utils.color.hex);
    });
    it('utils.color.rgb', () => {
        test.assertObject(utils.color.rgb);
    });
    it('utils.date', () => {
        test.assertObject(utils.date);
    });
    it('utils.ease', () => {
        test.assertObject(utils.ease);
    });
    it('utils.func', () => {
        test.assertObject(utils.func);
    });
    it('utils.geom', () => {
        test.assertObject(utils.geom);
    });
    it('utils.geom.point', () => {
        test.assertObject(utils.geom.point);
    });
    it('utils.hex', () => {
        test.assertObject(utils.hex);
    });
    it('utils.json', () => {
        test.assertObject(utils.json);
    });
    it('utils.math', () => {
        test.assertObject(utils.math);
    });
    it('utils.math.interpolation', () => {
        test.assertObject(utils.math.interpolation);
    });
    it('utils.number', () => {
        test.assertObject(utils.number);
    });
    it('utils.object', () => {
        test.assertObject(utils.object);
    });
    it('utils.random', () => {
        test.assertObject(utils.random);
    });
    it('utils.string', () => {
        test.assertObject(utils.string);
    });
    it('utils.test', () => {
        test.assertObject(utils.test);
    });
    it('utils.trigo', () => {
        test.assertObject(utils.trigo);
    });
    it('utils.type', () => {
        test.assertObject(utils.type);
    });
    it('utils.url', () => {
        test.assertObject(utils.url);
    });
    it('utils.utf8', () => {
        test.assertObject(utils.utf8);
    });
    it('utils.xml', () => {
        test.assertObject(utils.xml);
    });
});
