var utils = require('../dist/utils.js');
var test = utils.test;
var url = utils.url;

describe('url', function() {
    describe('getParameterByName', function() {
        var f = url.getParameterByName;
        var s;
        it('test valid param against params', function() {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s, 'page'), '16');
            test.assertEqual(f(s, 'code'), '0123456789');
        });
        it('test invalid param against params', function() {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s, 'status'), undefined);
        });
        it('test invalid param against params with default value', function() {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s, 'status', 'none'), 'none');
        });
        it('test invalid param against no params ', function() {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s, 'page'), undefined);
        });
        it('test invalid param against no params with default value', function() {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s, 'page', '1'), '1');
        });
        it('test invalid param against no params with default value', function() {
            var data = 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==';
            s = 'http://localhost:8000/index.html?data=' + data;
            test.assertEqual(f(s, 'data', null), data);
        });
        it('test empty param', function() {
            s = 'http://localhost:8000/?page=&code=&status=&ok=';
            test.assertEqual(f(s, 'page'), '');
            test.assertEqual(f(s, 'code'), '');
            test.assertEqual(f(s, 'status'), '');
            test.assertEqual(f(s, 'ok'), '');
        });
        it('test empty param with default value', function() {
            s = 'http://localhost:8000/?page=&code=&status=&ok=';
            test.assertEqual(f(s, 'page', 'ok'), 'ok');
            test.assertEqual(f(s, 'code', 'ok'), 'ok');
            test.assertEqual(f(s, 'status', 'ok'), 'ok');
            test.assertEqual(f(s, 'ok', 'ok'), 'ok');
        });
        it('test empty param (only name)', function() {
            s = 'http://localhost:8000/?page&code&status&ok';
            test.assertEqual(f(s, 'page'), '');
            test.assertEqual(f(s, 'code'), '');
            test.assertEqual(f(s, 'status'), '');
            test.assertEqual(f(s, 'ok'), '');
        });
        it('test empty param (only name) with default value', function() {
            s = 'http://localhost:8000/?page&code&status&ok';
            test.assertEqual(f(s, 'page', 'ok'), 'ok');
            test.assertEqual(f(s, 'code', 'ok'), 'ok');
            test.assertEqual(f(s, 'status', 'ok'), 'ok');
            test.assertEqual(f(s, 'ok', 'ok'), 'ok');
        });
    });
    describe('getParameters', function() {
        var f = url.getParameters;
        var s;
        it('test simple', function() {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s), { page:'16', code:'0123456789' });
        });
        it('test variable with base64 value ending with "="', function() {
            var b64 = 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==';
            s = 'http://localhost:8000/?data=' + b64 + '&code=0123456789&';
            test.assertEqual(f(s), { data:b64, code:'0123456789' });
        });
        it('test url without query string', function() {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s), {});
        });
        it('test url with empty query string', function() {
            s = 'http://localhost:8000/?';
            test.assertEqual(f(s), {});
        });
        it('test url with "=" before query string', function() {
            var b64 = 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==';
            s = 'http://localhost:8000/page=123?data=' + b64 + '&code=0123456789&';
            test.assertEqual(f(s), { data:b64, code:'0123456789' });
        });
        it('test url with "?" in param value', function() {
            s = 'http://localhost:8000/?code=0123456789?';
            test.assertEqual(f(s), { code:'0123456789?' });
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