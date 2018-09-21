var utils = require('../dist/utils.js');
var test = utils.test;
var url = utils.url;

describe('url', function() {
    describe('getParameterByName', function() {
        var f = url.getParameterByName;
        var s = 'http://localhost:8000/?page=16&code=0123456789&';
        it('test valid param against params', function() {
            test.assertEqual(f(s, 'page'), '16');
            test.assertEqual(f(s, 'code'), '0123456789');
        });
        it('test invalid param against params', function() {
            test.assertEqual(f(s, 'status'), undefined);
        });
        it('test invalid param against params with default value', function() {
            test.assertEqual(f(s, 'status', 'none'), 'none');
        });
        it('test invalid param against no params ', function() {
            test.assertEqual(f('http://localhost:8000/', 'page'), undefined);
        });
        it('test invalid param against no params with default value', function() {
            test.assertEqual(f('http://localhost:8000/', 'page', '1'), '1');
        });
    });
    describe('getParameters', function() {
        var f = url.getParameters;
        var s = 'http://localhost:8000/?page=16&code=0123456789&';
        it('test simple', function() {
            test.assertEqual(f(s), { page:'16', code:'0123456789' });
        });
    });
    describe('getURL', function() {
        var f = url.getURL;
        it('test simple', function() {
            test.assertEqual(f(), '');
        });
    });
    describe('isFile', function() {
        var f = url.isFile;
        it('test valid urls', function() {
            test.assertTrue(f('file://index.html'));
        });
        it('test invalid urls', function() {
            test.assertFalse(f('http://localhost/'));
        });
    });
    describe('isHttp', function() {
        var f = url.isHttp;
        it('test valid urls', function() {
            test.assertTrue(f('http://localhost/'));
        });
        it('test invalid urls', function() {
            test.assertFalse(f('https://localhost/'));
        });
    });
    describe('isHttps', function() {
        var f = url.isHttps;
        it('test valid urls', function() {
            test.assertTrue(f('https://localhost/'));
        });
        it('test invalid urls', function() {
            test.assertFalse(f('http://localhost/'));
        });
    });
    describe('isLocalhost', function() {
        var f = url.isLocalhost;
        it('test valid urls', function() {

            test.assertTrue(f('http://localhost'));
            test.assertTrue(f('http://localhost/'));
            test.assertTrue(f('http://localhost:8000'));
            test.assertTrue(f('http://localhost:8000/'));
            test.assertTrue(f('http://localhost:8000/index.html'));

            test.assertTrue(f('https://localhost'));
            test.assertTrue(f('https://localhost/'));
            test.assertTrue(f('https://localhost:8000'));
            test.assertTrue(f('https://localhost:8000/'));
            test.assertTrue(f('https://localhost:8000/index.html'));

            test.assertTrue(f('http://127.0.0.1'));
            test.assertTrue(f('http://127.0.0.1/'));
            test.assertTrue(f('http://127.0.0.1:8000'));
            test.assertTrue(f('http://127.0.0.1:8000/'));
            test.assertTrue(f('http://127.0.0.1:8000/index.html'));

            test.assertTrue(f('https://127.0.0.1'));
            test.assertTrue(f('https://127.0.0.1/'));
            test.assertTrue(f('https://127.0.0.1:8000'));
            test.assertTrue(f('https://127.0.0.1:8000/'));
            test.assertTrue(f('https://127.0.0.1:8000/index.html'));
        });
        it('test invalid urls', function() {

            test.assertFalse(f('https://localhosts'));
            test.assertFalse(f('https://localhosts/'));
            test.assertFalse(f('https://localhosts:8000'));
            test.assertFalse(f('https://localhosts:8000/'));
            test.assertFalse(f('https://localhosts:8000/index.html'));

            test.assertFalse(f('http://127.0.0.2'));
            test.assertFalse(f('http://127.0.0.2/'));
            test.assertFalse(f('http://127.0.0.2:8000'));
            test.assertFalse(f('http://127.0.0.2:8000/'));
            test.assertFalse(f('http://127.0.0.2:8000/index.html'));

            test.assertFalse(f('https://127.0.0.2'));
            test.assertFalse(f('https://127.0.0.2/'));
            test.assertFalse(f('https://127.0.0.2:8000'));
            test.assertFalse(f('https://127.0.0.2:8000/index.html'));
        });
    });
});