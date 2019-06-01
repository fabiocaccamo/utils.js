var utils = require('../dist/utils.js');
var test = utils.test;
var string = utils.string;

describe('string', function() {
    describe('contains', function() {
        var f = string.contains;
        var s = 'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test contains same case', function() {
            test.assertTrue(f(s, 'fugiat'));
        });
        it('test contains different case', function() {
            test.assertFalse(f(s, 'Fugiat'));
        });
        it('test not contains', function() {
            test.assertFalse(f(s, 'lorem'));
        });
    });
    describe('endsWith', function() {
        var f = string.endsWith;
        var s = 'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test endsWith true', function() {
            test.assertTrue(f(s, 'culpa.'));
        });
        it('test endsWith false', function() {
            test.assertFalse(f(s, 'culpa'));
        });
    });
    describe('icontains', function() {
        var f = string.icontains;
        var s = 'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test contains same case', function() {
            test.assertTrue(f(s, 'fugiat'));
        });
        it('test contains different case', function() {
            test.assertTrue(f(s, 'Fugiat'));
        });
        it('test not contains', function() {
            test.assertFalse(f(s, 'lorem'));
        });
    });
    describe('levenshteinDistance', function() {
        var f = string.levenshteinDistance;
        it('test same strings', function() {
            test.assertEqual(f('torino', 'torino'), 0);
        });
        it('test different strings', function() {
            test.assertEqual(f('torino', 'turin'), 2);
            test.assertEqual(f('turin', 'torino'), 2);
            test.assertEqual(f('torino', 'milano'), 4);
            test.assertEqual(f('torino', 'trino'), 1);
        });
    });
    describe('levenshteinSimilarity', function() {
        var f = string.levenshteinSimilarity;
        it('test empty strings', function() {
            test.assertEqual(f('', ''), 1.0);
        });
        it('test same strings', function() {
            test.assertEqual(f('torino', 'torino'), 1.0);
        });
        it('test different strings', function() {
            test.assertNumberAlmostEqual(f('torino', 'turin'), 0.66, 0.01);
            test.assertNumberAlmostEqual(f('turin', 'torino'), 0.66, 0.01);
            test.assertNumberAlmostEqual(f('torino', 'milano'), 0.33, 0.01);
            test.assertNumberAlmostEqual(f('torino', 'trino'), .83, 0.01);
        });
    });
    describe('padLeft', function() {
        var f = string.padLeft;
        it('test padLeft str length < length', function() {
            test.assertEqual(f('000000', 10, 'x'), 'xxxx000000');
        });
        it('test padLeft str length > length', function() {
            test.assertEqual(f('000000', 5, 'x'), '000000');
        });
    });
    describe('padRight', function() {
        var f = string.padRight;
        it('test padRight str length < length', function() {
            test.assertEqual(f('000000', 10, 'x'), '000000xxxx');
        });
        it('test padRight str length > length', function() {
            test.assertEqual(f('000000', 5, 'x'), '000000');
        });
    });
    describe('padZeros', function() {
        var f = string.padZeros;
        it('test padZeros str length < length', function() {
            test.assertEqual(f('8', 2), '08');
        });
        it('test padZeros str length == length', function() {
            test.assertEqual(f('12', 2), '12');
        });
        it('test padZeros str length > length', function() {
            test.assertEqual(f('120', 2), '120');
        });
        it('test padZeros num length < length', function() {
            test.assertEqual(f(8, 2), '08');
        });
        it('test padZeros num length == length', function() {
            test.assertEqual(f(12, 2), '12');
        });
        it('test padZeros num length > length', function() {
            test.assertEqual(f(120, 2), '120');
        });
        // it('test padZeros num negative length < length', function() {
        //     test.assertEqual(f(-8, 5), '-0008');
        // });
        // it('test padZeros num negative length == length', function() {
        //     test.assertEqual(f(-12, 5), '-0012');
        // });
        // it('test padZeros num negative length > length', function() {
        //     test.assertEqual(f(-12345, 5), '-12345');
        // });
    });
    describe('replace', function() {
        var f = string.replace;
        var s = 'Hello world, hello world, hElLo wOrLd, hello|world?, hello mountains, hello world';
        it('test single occurrence case-sensitive', function() {
            test.assertEqual(f(s, 'Hello world', 'X'), 'X, hello world, hElLo wOrLd, hello|world?, hello mountains, hello world');
        });
        it('test multiple occurrences case-sensitive', function() {
            test.assertEqual(f(s, 'hello world', 'X'), 'Hello world, X, hElLo wOrLd, hello|world?, hello mountains, X');
        });
        it('test multiple occurrences not case-sensitive', function() {
            test.assertEqual(f(s, 'hello world', 'X', false), 'X, X, X, hello|world?, hello mountains, X');
            test.assertEqual(f(s, 'hello', 'X', false), 'X world, X world, X wOrLd, X|world?, X mountains, X world');
        });
    });
    describe('reverse', function() {
        var f = string.reverse;
        it('test simple', function() {
            test.assertEqual(f('Lorem ipsum'), 'muspi meroL');
        });
    });
    describe('rotate', function() {
        var f = string.rotate;
        var s = 'loading...'
        it('test rotate negative', function() {
            test.assertEqual(f(s, -0), 'loading...');
            test.assertEqual(f(s, -1), '.loading..');
            test.assertEqual(f(s, -2), '..loading.');
            test.assertEqual(f(s, -3), '...loading');
            test.assertEqual(f(s, -4), 'g...loadin');
            test.assertEqual(f(s, -5), 'ng...loadi');
            test.assertEqual(f(s, -6), 'ing...load');
            test.assertEqual(f(s, -7), 'ding...loa');
            test.assertEqual(f(s, -8), 'ading...lo');
            test.assertEqual(f(s, -9), 'oading...l');
            test.assertEqual(f(s, -10), 'loading...');
            test.assertEqual(f(s, -11), '.loading..');
            test.assertEqual(f(s, -12), '..loading.');
            test.assertEqual(f(s, -13), '...loading');
            test.assertEqual(f(s, -14), 'g...loadin');
            test.assertEqual(f(s, -15), 'ng...loadi');
        });
        it('test rotate positive', function() {
            test.assertEqual(f(s, 0), 'loading...');
            test.assertEqual(f(s, 1), 'oading...l');
            test.assertEqual(f(s, 2), 'ading...lo');
            test.assertEqual(f(s, 3), 'ding...loa');
            test.assertEqual(f(s, 4), 'ing...load');
            test.assertEqual(f(s, 5), 'ng...loadi');
            test.assertEqual(f(s, 6), 'g...loadin');
            test.assertEqual(f(s, 7), '...loading');
            test.assertEqual(f(s, 8), '..loading.');
            test.assertEqual(f(s, 9), '.loading..');
            test.assertEqual(f(s, 10), 'loading...');
            test.assertEqual(f(s, 11), 'oading...l');
            test.assertEqual(f(s, 12), 'ading...lo');
            test.assertEqual(f(s, 13), 'ding...loa');
            test.assertEqual(f(s, 14), 'ing...load');
            test.assertEqual(f(s, 15), 'ng...loadi');
        });
    });
    describe('slugify', function() {
        var f = string.slugify;
        it('test simple', function() {
            test.assertEqual(f('lorem ipsum'), 'lorem-ipsum');
        });
        it('test uppercase', function() {
            test.assertEqual(f('LOREM IPSUM'), 'lorem-ipsum');
        });
        it('test extra white', function() {
            test.assertEqual(f('  lorem  ipsum  '), 'lorem-ipsum');
        });
        it('test extra dashes', function() {
            test.assertEqual(f('-lorem--ipsum-'), 'lorem-ipsum');
        });
        it('test special chars', function() {
            test.assertEqual(f('àèéìòùç'), 'aeeiouc');
        });
    });
    describe('startsWith', function() {
        var f = string.startsWith;
        var s = 'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test startsWith true', function() {
            test.assertTrue(f(s, 'Incididunt '));
        });
        it('test startsWith false', function() {
            test.assertFalse(f(s, 'Lorem '));
        });
    });
    describe('toConstantCase', function() {
        var f = string.toConstantCase;
        it('test simple', function() {
            test.assertEqual(f('Lorem ipsum'), 'LOREM_IPSUM');
            test.assertEqual(f('  Lorem ipsum  '), '__LOREM_IPSUM__');
        });
    });
    describe('toRandomCase', function() {
        var f = string.toRandomCase;
        it('test simple', function() {
            var s = 'lorem ipsum dolor sit amet';
            for (var i = 0; i < 10; i++) {
                r = f(s);
                test.assertTrue(r.length === s.length && (r !== s));
                s = r;
                // console.log(s);
            }
        });
    });
    describe('toTitleCase', function() {
        var f = string.toTitleCase;
        var s = 'lorem ipsum tempor. Ex adipisicing aliqua consectetur a Duis voluptate quis sunt.'
        it('test simple', function() {
            test.assertEqual(f(s), 'Lorem Ipsum Tempor. Ex Adipisicing Aliqua Consectetur A Duis Voluptate Quis Sunt.');
        });
    });
    describe('toUpperCaseFirst', function() {
        var f = string.toUpperCaseFirst;
        var s = 'lorem ipsum tempor. Ex adipisicing aliqua consectetur. Duis voluptate quis sunt. Aute sint laborum tempor.'
        it('test uppercase first', function() {
            test.assertEqual(f(s), 'Lorem ipsum tempor. Ex adipisicing aliqua consectetur. Duis voluptate quis sunt. Aute sint laborum tempor.');
        });
        it('test uppercase first empty string', function() {
            test.assertEqual(f(''), '');
        });
        it('test uppercase first and lowercase rest', function() {
            test.assertEqual(f(s, true), 'Lorem ipsum tempor. ex adipisicing aliqua consectetur. duis voluptate quis sunt. aute sint laborum tempor.');
        });
    });
    describe('trim', function() {
        var f = string.trim;
        it('test simple white space', function() {
            var s = '     lorem ipsum     ';
            test.assertEqual(f(s), 'lorem ipsum');
        });
        it('test special white space chars', function() {
            var s = '\n \r \t lorem ipsum \n \r \t';
            test.assertEqual(f(s), 'lorem ipsum');
        });
    });
    describe('trimLeft', function() {
        var f = string.trimLeft;
        it('test simple white space', function() {
            var s = '     lorem ipsum     ';
            test.assertEqual(f(s), 'lorem ipsum     ');
        });
        it('test special white space chars', function() {
            var s = '\n \r \t lorem ipsum';
            test.assertEqual(f(s), 'lorem ipsum');
        });
    });
    describe('trimRight', function() {
        var f = string.trimRight;
        it('test simple white space', function() {
            var s = '     lorem ipsum     ';
            test.assertEqual(f(s), '     lorem ipsum');
        });
        it('test special white space chars', function() {
            var s = 'lorem ipsum \n \r \t';
            test.assertEqual(f(s), 'lorem ipsum');
        });
    });
});