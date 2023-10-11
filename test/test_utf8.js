var utils = require('../dist/utils.js');
var test = utils.test;
var utf8 = utils.utf8;

describe('utf8', function () {
    describe('decode', function () {
        it('complex', function () {
            test.assertEqual(
                utf8.decode(
                    '\x46\x6F\x6F\x20\xC2\xA9\x20\x62\x61\x72\x20\xF0\x9D\x8C\x86\x20\x62\x61\x7A\x20\xE2\x98\x83\x20\x71\x75\x78'
                ),
                'Foo © bar 𝌆 baz ☃ qux'
            );
        });
    });
    describe('encode', function () {
        it('complex', function () {
            test.assertEqual(
                utf8.encode('Foo © bar 𝌆 baz ☃ qux'),
                '\x46\x6F\x6F\x20\xC2\xA9\x20\x62\x61\x72\x20\xF0\x9D\x8C\x86\x20\x62\x61\x7A\x20\xE2\x98\x83\x20\x71\x75\x78'
            );
        });
    });
});
