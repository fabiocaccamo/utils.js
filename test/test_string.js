import utils from '../src/utils.js';
const test = utils.test;
const string = utils.string;

describe('string', () => {
    describe('contains', () => {
        const f = string.contains;
        const s =
            'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test contains same case', () => {
            test.assertTrue(f(s, 'fugiat'));
        });
        it('test contains different case', () => {
            test.assertFalse(f(s, 'Fugiat'));
        });
        it('test not contains', () => {
            test.assertFalse(f(s, 'lorem'));
        });
    });
    describe('endsWith', () => {
        const f = string.endsWith;
        const s =
            'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test endsWith true', () => {
            test.assertTrue(f(s, 'culpa.'));
        });
        it('test endsWith false', () => {
            test.assertFalse(f(s, 'culpa'));
        });
    });
    describe('icontains', () => {
        const f = string.icontains;
        const s =
            'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test contains same case', () => {
            test.assertTrue(f(s, 'fugiat'));
        });
        it('test contains different case', () => {
            test.assertTrue(f(s, 'Fugiat'));
        });
        it('test not contains', () => {
            test.assertFalse(f(s, 'lorem'));
        });
    });
    describe('levenshteinDistance', () => {
        const f = string.levenshteinDistance;
        it('test same strings', () => {
            test.assertEqual(f('torino', 'torino'), 0);
        });
        it('test different strings', () => {
            test.assertEqual(f('torino', 'turin'), 2);
            test.assertEqual(f('turin', 'torino'), 2);
            test.assertEqual(f('torino', 'milano'), 4);
            test.assertEqual(f('torino', 'trino'), 1);
        });
    });
    describe('levenshteinSimilarity', () => {
        const f = string.levenshteinSimilarity;
        it('test empty strings', () => {
            test.assertEqual(f('', ''), 1.0);
        });
        it('test same strings', () => {
            test.assertEqual(f('torino', 'torino'), 1.0);
        });
        it('test different strings', () => {
            test.assertNumberAlmostEqual(f('torino', 'turin'), 0.66, 0.01);
            test.assertNumberAlmostEqual(f('turin', 'torino'), 0.66, 0.01);
            test.assertNumberAlmostEqual(f('torino', 'milano'), 0.33, 0.01);
            test.assertNumberAlmostEqual(f('torino', 'trino'), 0.83, 0.01);
        });
    });
    describe('padLeft', () => {
        const f = string.padLeft;
        it('test padLeft str length < length', () => {
            test.assertEqual(f('000000', 10, 'x'), 'xxxx000000');
        });
        it('test padLeft str length > length', () => {
            test.assertEqual(f('000000', 5, 'x'), '000000');
        });
    });
    describe('padRight', () => {
        const f = string.padRight;
        it('test padRight str length < length', () => {
            test.assertEqual(f('000000', 10, 'x'), '000000xxxx');
        });
        it('test padRight str length > length', () => {
            test.assertEqual(f('000000', 5, 'x'), '000000');
        });
    });
    describe('padZeros', () => {
        const f = string.padZeros;
        it('test padZeros str length < length', () => {
            test.assertEqual(f('8', 2), '08');
        });
        it('test padZeros str length == length', () => {
            test.assertEqual(f('12', 2), '12');
        });
        it('test padZeros str length > length', () => {
            test.assertEqual(f('120', 2), '120');
        });
        it('test padZeros num length < length', () => {
            test.assertEqual(f(8, 2), '08');
        });
        it('test padZeros num length == length', () => {
            test.assertEqual(f(12, 2), '12');
        });
        it('test padZeros num length > length', () => {
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
    describe('render', () => {
        const f = string.render;
        it('test single placeholder', () => {
            test.assertEqual(f('{{ name }}', { name: 'utils.js' }), 'utils.js');
        });
        it('test single placeholder without data', () => {
            test.assertEqual(f('{{ name }}', null), '');
        });
        it('test single placeholder with missing variable', () => {
            test.assertEqual(f('{{ name }}', {}), '');
        });
        it('test single placeholder without white space around delimiters', () => {
            test.assertEqual(f('{{name}}', { name: 'utils.js' }), 'utils.js');
        });
        it('test single placeholder with extra white space around delimiters', () => {
            test.assertEqual(f('{{     name     }}', { name: 'utils.js' }), 'utils.js');
        });
        it('test single placeholder with custom delimiters', () => {
            test.assertEqual(
                f('__name__', { name: 'utils.js' }, '__', '__'),
                'utils.js'
            );
        });
        it('test multiple occurrencies of the same placeholder', () => {
            test.assertEqual(
                f('{{ name }} {{ name }}', { name: 'utils.js' }),
                'utils.js utils.js'
            );
        });
        it('test multiple mixed placeholders', () => {
            test.assertEqual(
                f('npm install {{ user }}/{{ packageName }}@{{ version }} --save-dev', {
                    user: '@fabiocaccamo',
                    packageName: 'utils.js',
                    version: 'latest',
                }),
                'npm install @fabiocaccamo/utils.js@latest --save-dev'
            );
        });
        it('test multiple mixed placeholders with custom delimiters', () => {
            test.assertEqual(
                f(
                    'npm install {user}/{packageName}@{version} --save-dev',
                    {
                        user: '@fabiocaccamo',
                        packageName: 'utils.js',
                        version: 'latest',
                    },
                    '{',
                    '}'
                ),
                'npm install @fabiocaccamo/utils.js@latest --save-dev'
            );
        });
    });
    describe('replace', () => {
        const f = string.replace;
        const s =
            'Hello world, hello world, hElLo wOrLd, hello|world?, hello mountains, hello world';
        it('test single occurrence case-sensitive', () => {
            test.assertEqual(
                f(s, 'Hello world', 'X'),
                'X, hello world, hElLo wOrLd, hello|world?, hello mountains, hello world'
            );
        });
        it('test multiple occurrences case-sensitive', () => {
            test.assertEqual(
                f(s, 'hello world', 'X'),
                'Hello world, X, hElLo wOrLd, hello|world?, hello mountains, X'
            );
        });
        it('test multiple occurrences not case-sensitive', () => {
            test.assertEqual(
                f(s, 'hello world', 'X', false),
                'X, X, X, hello|world?, hello mountains, X'
            );
            test.assertEqual(
                f(s, 'hello', 'X', false),
                'X world, X world, X wOrLd, X|world?, X mountains, X world'
            );
        });
    });
    describe('reverse', () => {
        const f = string.reverse;
        it('test simple', () => {
            test.assertEqual(f('Lorem ipsum'), 'muspi meroL');
        });
    });
    describe('rotate', () => {
        const f = string.rotate;
        const s = 'loading...';
        it('test rotate negative', () => {
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
        it('test rotate positive', () => {
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
    describe('slugify', () => {
        const f = string.slugify;
        it('test simple', () => {
            test.assertEqual(f('lorem ipsum'), 'lorem-ipsum');
        });
        it('test uppercase', () => {
            test.assertEqual(f('LOREM IPSUM'), 'lorem-ipsum');
        });
        it('test extra white', () => {
            test.assertEqual(f('  lorem  ipsum  '), 'lorem-ipsum');
        });
        it('test extra dashes', () => {
            test.assertEqual(f('-lorem--ipsum-'), 'lorem-ipsum');
        });
        it('test special chars', () => {
            test.assertEqual(f('àèéìòùç'), 'aeeiouc');
        });
    });
    describe('startsWith', () => {
        const f = string.startsWith;
        const s =
            'Incididunt fugiat in excepteur do anim in nostrud irure sint laboris dolore mollit in sint culpa.';
        it('test startsWith true', () => {
            test.assertTrue(f(s, 'Incididunt '));
        });
        it('test startsWith false', () => {
            test.assertFalse(f(s, 'Lorem '));
        });
    });
    describe('toConstantCase', () => {
        const f = string.toConstantCase;
        it('test simple', () => {
            test.assertEqual(f('Lorem ipsum'), 'LOREM_IPSUM');
            test.assertEqual(f('  Lorem ipsum  '), '__LOREM_IPSUM__');
        });
    });
    describe('toRandomCase', () => {
        const f = string.toRandomCase;
        it('test simple', () => {
            let s = 'lorem ipsum dolor sit amet';
            for (let i = 0; i < 10; i++) {
                let r = f(s);
                test.assertTrue(r.length === s.length && r !== s);
                s = r;
                // console.log(s);
            }
        });
    });
    describe('toTitleCase', () => {
        const f = string.toTitleCase;
        const s =
            'lorem ipsum tempor. Ex adipisicing aliqua consectetur a Duis voluptate quis sunt.';
        it('test simple', () => {
            test.assertEqual(
                f(s),
                'Lorem Ipsum Tempor. Ex Adipisicing Aliqua Consectetur A Duis Voluptate Quis Sunt.'
            );
        });
        it('test with accented letters', () => {
            test.assertEqual(f('bàcédòçu édìfògù'), 'Bàcédòçu Édìfògù');
        });
        it('test with hyphen', () => {
            test.assertEqual(f('bàcédòçu-édìfògù'), 'Bàcédòçu-Édìfògù');
        });
        it('test with apostroph', () => {
            test.assertEqual(f("bàcédòç'uédìfògù"), "Bàcédòç'Uédìfògù");
        });
    });
    describe('toUpperCaseFirst', () => {
        const f = string.toUpperCaseFirst;
        const s =
            'lorem ipsum tempor. Ex adipisicing aliqua consectetur. Duis voluptate quis sunt. Aute sint laborum tempor.';
        it('test uppercase first', () => {
            test.assertEqual(
                f(s),
                'Lorem ipsum tempor. Ex adipisicing aliqua consectetur. Duis voluptate quis sunt. Aute sint laborum tempor.'
            );
        });
        it('test uppercase first empty string', () => {
            test.assertEqual(f(''), '');
        });
        it('test uppercase first and lowercase rest', () => {
            test.assertEqual(
                f(s, true),
                'Lorem ipsum tempor. ex adipisicing aliqua consectetur. duis voluptate quis sunt. aute sint laborum tempor.'
            );
        });
    });
    describe('trim', () => {
        const f = string.trim;
        it('test simple white space', () => {
            const s = '     lorem ipsum     ';
            test.assertEqual(f(s), 'lorem ipsum');
        });
        it('test special white space chars', () => {
            const s = '\n \r \t lorem ipsum \n \r \t';
            test.assertEqual(f(s), 'lorem ipsum');
        });
    });
    describe('trimLeft', () => {
        const f = string.trimLeft;
        it('test simple white space', () => {
            const s = '     lorem ipsum     ';
            test.assertEqual(f(s), 'lorem ipsum     ');
        });
        it('test special white space chars', () => {
            const s = '\n \r \t lorem ipsum';
            test.assertEqual(f(s), 'lorem ipsum');
        });
    });
    describe('trimRight', () => {
        const f = string.trimRight;
        it('test simple white space', () => {
            const s = '     lorem ipsum     ';
            test.assertEqual(f(s), '     lorem ipsum');
        });
        it('test special white space chars', () => {
            const s = 'lorem ipsum \n \r \t';
            test.assertEqual(f(s), 'lorem ipsum');
        });
    });
});
