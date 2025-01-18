import utils from '../src/utils.js';
const test = utils.test;
const url = utils.url;

describe('url', () => {
    describe('getDomain', () => {
        const f = url.getDomain;
        it('test localhost', () => {
            test.assertEqual(f('http://localhost:8000'), 'localhost');
            test.assertEqual(f('https://localhost:8000'), 'localhost');
        });
        it('test url with querystring', () => {
            test.assertEqual(
                f('http://localhost:8000/?page=16&code=0123456789'),
                'localhost'
            );
            test.assertEqual(
                f('https://localhost:8000/?page=16&code=0123456789'),
                'localhost'
            );
        });
        it('test www', () => {
            test.assertEqual(f('http://www.google.com'), 'google.com');
            test.assertEqual(f('https://www.google.com'), 'google.com');
        });
        it('test subdomain', () => {
            test.assertEqual(f('http://mail.google.com'), 'mail.google.com');
            test.assertEqual(f('https://mail.google.com'), 'mail.google.com');
        });
        it('test specific domain level', () => {
            test.assertEqual(f('http://mail.google.com', 3), 'mail');
            test.assertEqual(f('https://mail.google.com', 3), 'mail');
        });
    });
    describe('getParameterByName', () => {
        const f = url.getParameterByName;
        let s;
        it('test valid param against params', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s, 'page'), '16');
            test.assertEqual(f(s, 'code'), '0123456789');
        });
        it('test invalid param against params', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s, 'status'), undefined);
        });
        it('test invalid param against params with default value', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s, 'status', 'none'), 'none');
        });
        it('test invalid param against no params ', () => {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s, 'page'), undefined);
        });
        it('test invalid param against no params with default value', () => {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s, 'page', '1'), '1');
        });
        it('test invalid param against no params with default value', () => {
            const data = 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==';
            s = `http://localhost:8000/index.html?data=${data}`;
            test.assertEqual(f(s, 'data', null), data);
        });
        it('test empty param', () => {
            s = 'http://localhost:8000/?page=&code=&status=&ok=';
            test.assertEqual(f(s, 'page'), '');
            test.assertEqual(f(s, 'code'), '');
            test.assertEqual(f(s, 'status'), '');
            test.assertEqual(f(s, 'ok'), '');
        });
        it('test empty param with default value', () => {
            s = 'http://localhost:8000/?page=&code=&status=&ok=';
            test.assertEqual(f(s, 'page', 'ok'), 'ok');
            test.assertEqual(f(s, 'code', 'ok'), 'ok');
            test.assertEqual(f(s, 'status', 'ok'), 'ok');
            test.assertEqual(f(s, 'ok', 'ok'), 'ok');
        });
        it('test empty param (only name)', () => {
            s = 'http://localhost:8000/?page&code&status&ok';
            test.assertEqual(f(s, 'page'), '');
            test.assertEqual(f(s, 'code'), '');
            test.assertEqual(f(s, 'status'), '');
            test.assertEqual(f(s, 'ok'), '');
        });
        it('test empty param (only name) with default value', () => {
            s = 'http://localhost:8000/?page&code&status&ok';
            test.assertEqual(f(s, 'page', 'ok'), 'ok');
            test.assertEqual(f(s, 'code', 'ok'), 'ok');
            test.assertEqual(f(s, 'status', 'ok'), 'ok');
            test.assertEqual(f(s, 'ok', 'ok'), 'ok');
        });
    });
    describe('getParameters', () => {
        const f = url.getParameters;
        let s;
        it('test simple', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s), { page: '16', code: '0123456789' });
        });
        it('test variable with base64 value ending with "="', () => {
            const b64 = 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==';
            s = `http://localhost:8000/?data=${b64}&code=0123456789&`;
            test.assertEqual(f(s), { data: b64, code: '0123456789' });
        });
        it('test url without query string', () => {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s), {});
        });
        it('test url with empty query string', () => {
            s = 'http://localhost:8000/?';
            test.assertEqual(f(s), {});
        });
        it('test url with "=" before query string', () => {
            const b64 = 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==';
            s = `http://localhost:8000/page=123?data=${b64}&code=0123456789&`;
            test.assertEqual(f(s), { data: b64, code: '0123456789' });
        });
        it('test url with "?" in param value', () => {
            s = 'http://localhost:8000/?code=0123456789?';
            test.assertEqual(f(s), { code: '0123456789?' });
        });
        it('test url with keys containing - and _', () => {
            s = 'http://localhost:8000/?status-code=1&status_code=2&statuscode=3';
            test.assertEqual(f(s), {
                'status-code': '1',
                'status_code': '2',
                'statuscode': '3',
            });
        });
    });
    describe('getParametersString', () => {
        const f = url.getParametersString;
        let s;
        it('test simple', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789&';
            test.assertEqual(f(s), 'page=16&code=0123456789&');
        });
        it('test with hash', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789#section=footer';
            test.assertEqual(f(s), 'page=16&code=0123456789');
        });
    });
    describe('getURL', () => {
        const f = url.getURL;
        it('test simple', () => {
            test.assertEqual(f(), '');
        });
    });
    describe('hasParameter', () => {
        const f = url.hasParameter;
        let s;
        it('test invalid parameter', () => {
            s = 'http://localhost:8000/?page=16&code=0123456789';
            test.assertEqual(f(s, 'status'), false);
        });
        it('test invalid parameter (empty query string)', () => {
            s = 'http://localhost:8000/';
            test.assertEqual(f(s, 'status'), false);
        });
        it('test valid parameter', () => {
            s = 'http://localhost:8000/?page=1&code=10&status=ok';
            test.assertEqual(f(s, 'page'), true);
            test.assertEqual(f(s, 'code'), true);
            test.assertEqual(f(s, 'status'), true);
        });
        it('test valid empty param (only =)', () => {
            s = 'http://localhost:8000/?page=&code=&status=&ok=';
            test.assertEqual(f(s, 'page'), true);
            test.assertEqual(f(s, 'code'), true);
            test.assertEqual(f(s, 'status'), true);
        });
        it('test valid empty param (only name)', () => {
            s = 'http://localhost:8000/?page&code&status&ok';
            test.assertEqual(f(s, 'page'), true);
            test.assertEqual(f(s, 'code'), true);
            test.assertEqual(f(s, 'status'), true);
        });
    });
    describe('isFile', () => {
        const f = url.isFile;
        it('test valid urls', () => {
            test.assertTrue(f('file://index.html'));
        });
        it('test invalid urls', () => {
            test.assertFalse(f('http://localhost/'));
        });
    });
    describe('isHttp', () => {
        const f = url.isHttp;
        it('test valid urls', () => {
            test.assertTrue(f('http://localhost/'));
        });
        it('test invalid urls', () => {
            test.assertFalse(f('https://localhost/'));
        });
    });
    describe('isHttps', () => {
        const f = url.isHttps;
        it('test valid urls', () => {
            test.assertTrue(f('https://localhost/'));
        });
        it('test invalid urls', () => {
            test.assertFalse(f('http://localhost/'));
        });
    });
    describe('isLocalhost', () => {
        const f = url.isLocalhost;
        it('test valid urls', () => {
            test.assertTrue(f('http://localhost'));
            test.assertTrue(f('http://localhost/'));
            test.assertTrue(f('http://localhost:8000'));
            test.assertTrue(f('http://localhost:8000/'));
            test.assertTrue(f('http://localhost:8000/index.html'));
            test.assertTrue(f('http://localhost.my-domain.com:8000/index.html'));

            test.assertTrue(f('https://localhost'));
            test.assertTrue(f('https://localhost/'));
            test.assertTrue(f('https://localhost:8000'));
            test.assertTrue(f('https://localhost:8000/'));
            test.assertTrue(f('https://localhost:8000/index.html'));
            test.assertTrue(f('https://localhost.my-domain.com:8000/index.html'));

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
        it('test invalid urls', () => {
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
