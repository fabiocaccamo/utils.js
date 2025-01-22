import utils from '../src/utils.js';
const test = utils.test;
const arr = utils.array;

describe('array', () => {
    describe('all', () => {
        const f = arr.all;
        it('test true', () => {
            test.assertEqual(f([true, 1, 'ok', [0], { a: 0 }]), true);
        });
        it('test false', () => {
            test.assertEqual(f([false, 1, 'ok', [0], { a: 0 }]), false);
            test.assertEqual(f([true, 0, 'ok', [0], { a: 0 }]), false);
            test.assertEqual(f([true, 1, '', [0], { a: 0 }]), false);
            test.assertEqual(f([true, 1, 'ok', [], { a: 0 }]), false);
            test.assertEqual(f([true, 1, 'ok', [0], {}]), false);
        });
    });
    describe('any', () => {
        const f = arr.any;
        it('test true', () => {
            test.assertEqual(f([true, 1, 'ok', [0], { a: 0 }]), true);
            test.assertEqual(f([false, 1, 'ok', [0], { a: 0 }]), true);
            test.assertEqual(f([true, 0, 'ok', [0], { a: 0 }]), true);
            test.assertEqual(f([true, 1, '', [0], { a: 0 }]), true);
            test.assertEqual(f([true, 1, 'ok', [], { a: 0 }]), true);
            test.assertEqual(f([true, 1, 'ok', [0], {}]), true);
            test.assertEqual(f([true, 0, '', [], {}]), true);
        });
        it('test false', () => {
            test.assertEqual(f([false, 0, '', [], {}]), false);
        });
    });
    describe('clean', () => {
        const f = arr.clean;

        it('test none', () => {
            test.assertEqual(f([null, undefined, NaN], false), []);
        });
        it('test none hard', () => {
            test.assertEqual(f([null, undefined, NaN], true), []);
        });

        it('test booleans', () => {
            test.assertEqual(f([true, false], false), [true, false]);
        });
        it('test booleans hard', () => {
            test.assertEqual(f([true, false], true), [true, false]);
        });

        it('test date', () => {
            const d = new Date();
            test.assertEqual(f([d], false), [d]);
        });
        it('test date hard', () => {
            const d = new Date();
            test.assertEqual(f([d], true), [d]);
        });

        it('test error', () => {
            const e = new Error();
            test.assertEqual(f([e], false), [e]);
        });
        it('test error hard', () => {
            const e = new Error();
            test.assertEqual(f([e], true), [e]);
        });

        it('test function', () => {
            test.assertEqual(f([f], false), [f]);
        });
        it('test function hard', () => {
            test.assertEqual(f([f], true), [f]);
        });

        it('test numbers', () => {
            test.assertEqual(
                f([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, NaN, Number.Infinity], false),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            );
        });
        it('test numbers hard', () => {
            test.assertEqual(
                f([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, NaN, Number.Infinity], true),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            );
        });

        it('test regexp', () => {
            const re = /^$/;
            test.assertEqual(f([re], false), [re]);
        });
        it('test regexp hard', () => {
            const re = /^$/;
            test.assertEqual(f([re], true), [re]);
        });

        it('test strings', () => {
            test.assertEqual(f(['', ' ', '   ', 'a', 'b', 'c'], false), [
                '',
                ' ',
                '   ',
                'a',
                'b',
                'c',
            ]);
        });
        it('test strings hard', () => {
            test.assertEqual(f(['', ' ', '   ', 'a', 'b', 'c'], true), ['a', 'b', 'c']);
        });

        it('test arrays', () => {
            test.assertEqual(f([[[], [], []], [], [], []], false), [
                [[], [], []],
                [],
                [],
                [],
            ]);
        });
        it('test arrays hard', () => {
            test.assertEqual(f([[], [], []], true), []);
            test.assertEqual(f([[[], [], []], [], [], []], true), []);
        });

        it('test objects', () => {
            test.assertEqual(f([{}, {}, {}], false), [{}, {}, {}]);
            test.assertEqual(f([{ a: {} }, { b: {} }, { c: {} }], false), [
                { a: {} },
                { b: {} },
                { c: {} },
            ]);
            test.assertEqual(f([{ a: null }, { b: {} }, { c: {} }], false), [
                { a: null },
                { b: {} },
                { c: {} },
            ]);
            test.assertEqual(f([{ a: { b: null } }, { b: {} }, { c: {} }], false), [
                { a: { b: null } },
                { b: {} },
                { c: {} },
            ]);
        });
        it('test objects hard', () => {
            test.assertEqual(f([{}, {}, {}], true), []);
            test.assertEqual(f([{ a: {} }, { b: {} }, { c: {} }], true), []);
            test.assertEqual(f([{ a: null }, { b: {} }, { c: {} }], true), []);
            test.assertEqual(f([{ a: { b: null } }, { b: {} }, { c: {} }], true), []);
            test.assertEqual(f([{ a: { b: 0 } }, { b: {} }, { c: {} }], true), [
                { a: { b: 0 } },
            ]);

            let input, output;
            input = [
                0,
                1,
                2,
                true,
                false,
                '',
                ' ',
                ' ok ',
                null,
                undefined,
                NaN,
                [],
                [[]],
                [[[]], [[]]],
                [3, 4, NaN, 6],
                {},
                {
                    a: 'ok',
                    b: null,
                    c: undefined,
                    d: {},
                    e: [],
                    f: [{}, {}],
                    g: { h: [], i: [[]], j: [{ k: null }, { k: true }] },
                },
                { x: null, y: undefined, z: NaN },
            ];
            output = [
                0,
                1,
                2,
                true,
                false,
                ' ok ',
                [3, 4, 6],
                { a: 'ok', g: { j: [{ k: true }] } },
            ];
            test.assertEqual(f(input, true), output);
        });
    });
    describe('clone', () => {
        const f = arr.clone;
        it('test array of array(s)', () => {
            const a = [1, 2, 3];
            const b = [4, 5, 6];
            const c = [7, 8, 9];
            const o = [a, b, c];
            const r = f(o);

            test.assertFalse(r === o);
            test.assertEqual(r, o);

            test.assertFalse(r[0] === a);
            test.assertEqual(r[0], a);

            test.assertFalse(r[1] === b);
            test.assertEqual(r[1], b);

            test.assertFalse(r[2] === c);
            test.assertEqual(r[2], c);
        });
        it('test array of boolean(s)', () => {
            const o = [true, false, true, false];
            const r = f(o);
            test.assertFalse(r === o);
            test.assertEqual(r, o);
        });
        it('test array of date(s)', () => {
            const o = [new Date(1800), new Date(1900), new Date(2000)];
            const r = f(o);
            test.assertFalse(r === o);
            test.assertEqual(r, o);
        });
        it('test array of object(s)', () => {
            const a = { a: 1, b: 2, c: 3 };
            const b = { d: 4, e: 5, f: 6 };
            const c = { g: 7, h: 8, i: 9 };
            const o = [a, b, c];
            const r = f(o);
            test.assertFalse(r[0] === a);
            test.assertEqual(r[0], a);
            test.assertFalse(r[1] === b);
            test.assertEqual(r[1], b);
            test.assertFalse(r[2] === c);
            test.assertEqual(r[2], c);
        });
        it('test array of number(s)', () => {
            const o = [0, 1, 2, 3];
            const r = f(o);
            test.assertFalse(r === o);
            test.assertEqual(r, o);
        });
        it('test array of string(s)', () => {
            const o = ['a', 'b', 'c', 'd'];
            const r = f(o);
            test.assertFalse(r === o);
            test.assertEqual(r, o);
        });
    });
    describe('contains', () => {
        const f = arr.contains;
        it('test none', () => {
            test.assertTrue(f([null, undefined, NaN], null));
            test.assertTrue(f([null, undefined, NaN], undefined));
            test.assertTrue(f([null, undefined, NaN], NaN));
            test.assertFalse(f([null, undefined, NaN], 0));
        });
        it('test booleans', () => {
            test.assertTrue(f([true, true, true], true));
            test.assertFalse(f([true, true, true], false));
            test.assertTrue(f([false, false, false], false));
            test.assertFalse(f([false, false, false], true));
        });
        it('test date', () => {
            test.assertTrue(f([new Date('1999/12/31')], new Date('1999/12/31')));
            test.assertFalse(f([new Date('1999/12/31')], new Date('1999/12/30')));
        });
        it('test error', () => {
            const a = new Error('message 1');
            const b = new Error('message 1');
            const c = new Error('message 2');
            test.assertTrue(f([a], b));
            test.assertFalse(f([a], c));
        });
        it('test function', () => {
            test.assertTrue(f([f, f, f], f));
            test.assertFalse(f([f, f, f], () => {}));
        });
        it('test numbers', () => {
            test.assertTrue(f([0, 1, 2, 3, 4, 5, NaN], 0));
            test.assertFalse(f([0, 1, 2, 3, 4, 5, NaN], 6));
        });
        it('test regexp', () => {
            test.assertTrue(f([/^[a-z]$/], /^[a-z]$/));
            test.assertFalse(f([/^[a-z]$/], /^[a-zA-Z]$/));
        });
        it('test strings', () => {
            test.assertTrue(f(['a', 'b', 'c'], 'a'));
            test.assertFalse(f(['a', 'b', 'c'], 'd'));
            test.assertFalse(f(['a', 'b', 'c'], 'A'));
        });
        it('test arrays', () => {
            test.assertTrue(
                f(
                    [
                        [1, 2],
                        [3, 4],
                        [5, 6],
                    ],
                    [5, 6]
                )
            );
            test.assertFalse(
                f(
                    [
                        [1, 2],
                        [3, 4],
                        [5, 6],
                    ],
                    [5, 7]
                )
            );
        });
        it('test objects', () => {
            test.assertTrue(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { c: 3, d: 4 }
                )
            );
            test.assertFalse(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { c: 3, d: 5 }
                )
            );
            test.assertFalse(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { c: 3, e: 4 }
                )
            );
        });
        it('test none multivalue', () => {
            test.assertTrue(f([null, undefined, NaN], null, undefined));
            test.assertTrue(f([null, undefined, NaN], undefined, NaN));
            test.assertTrue(f([null, undefined, NaN], NaN, null));
            test.assertFalse(f([null, undefined, NaN], NaN, 0));
        });
        it('test booleans multivalue', () => {
            test.assertTrue(f([true, true, true], true, true));
            test.assertFalse(f([true, true, true], false, true));
            test.assertTrue(f([false, false, false], false, false));
            test.assertFalse(f([false, false, false], true, true));
        });
        it('test date multivalue', () => {
            test.assertTrue(
                f(
                    [
                        new Date('1999/12/31'),
                        new Date('2000/12/31'),
                        new Date('2001/12/31'),
                    ],
                    new Date('1999/12/31'),
                    new Date('2001/12/31')
                )
            );
            test.assertFalse(
                f(
                    [
                        new Date('1999/12/31'),
                        new Date('2000/12/31'),
                        new Date('2001/12/31'),
                    ],
                    new Date('1999/12/31'),
                    new Date('2002/12/31')
                )
            );
        });
        it('test error multivalue', () => {
            const a = new Error('message 1');
            const b = new Error('message 1');
            const c = new Error('message 2');
            test.assertTrue(f([a, b], a, b));
            test.assertFalse(f([a, b], a, c));
        });
        it('test function multivalue', () => {
            test.assertTrue(f([f, f, f], f, f));
            test.assertFalse(f([f, f, f], f, () => {}));
        });
        it('test numbers multivalue', () => {
            test.assertTrue(f([0, 1, 2, 3, 4, 5, NaN], 0, 3, NaN));
            test.assertFalse(f([0, 1, 2, 3, 4, 5, NaN], 0, 3, 6));
        });
        it('test regexp multivalue', () => {
            test.assertTrue(f([/^[a-z]$/], /^[a-z]$/, /^[a-z]$/));
            test.assertFalse(f([/^[a-z]$/], /^[a-z]$/, /^[a-zA-Z]$/));
        });
        it('test strings multivalue', () => {
            test.assertTrue(f(['a', 'b', 'c'], 'a', 'c'));
            test.assertFalse(f(['a', 'b', 'c'], 'a', 'd'));
            test.assertFalse(f(['a', 'b', 'c'], 'A', 'b'));
        });
        it('test arrays multivalue', () => {
            test.assertTrue(
                f(
                    [
                        [1, 2],
                        [3, 4],
                        [5, 6],
                    ],
                    [3, 4],
                    [5, 6]
                )
            );
            test.assertFalse(
                f(
                    [
                        [1, 2],
                        [3, 4],
                        [5, 6],
                    ],
                    [3, 4],
                    [5, 7]
                )
            );
        });
        it('test objects multivalue', () => {
            test.assertTrue(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { a: 1, b: 2 },
                    { c: 3, d: 4 }
                )
            );
            test.assertFalse(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { a: 1, b: 2 },
                    { c: 3, d: 5 }
                )
            );
            test.assertFalse(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { a: 1, b: 2 },
                    { c: 3, e: 4 }
                )
            );
        });
    });
    describe('equals', () => {
        const f = arr.equals;
        it('test none', () => {
            test.assertTrue(f([null, undefined, NaN], [null, undefined, NaN]));
            test.assertFalse(f([null, undefined, NaN], [null, undefined, NaN, NaN]));
            test.assertFalse(f([null, undefined, NaN], [null, undefined, null]));
        });
        it('test booleans', () => {
            test.assertTrue(f([true, false, true, false], [true, false, true, false]));
            test.assertFalse(f([true, false, true, false], [true, false, true, true]));
            test.assertFalse(f([true, false, true, false], [true, false, true]));
        });
        it('test date', () => {
            const a = new Date();
            const b = new Date();
            const c = new Date('1999/12/31');
            test.assertTrue(f([a], [a]));
            test.assertTrue(f([a], [b]));
            test.assertFalse(f([a], [c]));
        });
        it('test error', () => {
            const a = new Error('message 1');
            const b = new Error('message 1');
            const c = new Error('message 2');
            test.assertTrue(f([a], [a]));
            test.assertTrue(f([a], [b]));
            test.assertFalse(f([a], [c]));
        });
        it('test function', () => {
            test.assertTrue(f([f, f, f], [f, f, f]));
            test.assertFalse(f([f, f, f], [f, f]));
            test.assertFalse(f([f, f, f], [f, f, () => {}]));
        });
        it('test numbers', () => {
            test.assertTrue(f([0, 1, 2, 3, 4, 5, NaN], [0, 1, 2, 3, 4, 5, NaN]));
            test.assertFalse(f([0, 1, 2, 3, 4, 5, NaN], [1, 2, 3, 4, 5, NaN]));
        });
        it('test regexp', () => {
            test.assertTrue(f([/^[a-z]$/], [/^[a-z]$/]));
            test.assertFalse(f([/^[a-z]$/], [/^[a-zA-Z]$/]));
        });
        it('test strings', () => {
            test.assertTrue(f(['a'], ['a']));
            test.assertFalse(f(['a'], ['A']));
        });
        it('test arrays', () => {
            let a, b;
            a = [
                [1, 2],
                [null, true],
            ];
            b = [
                [1, 2],
                [null, true],
            ];
            test.assertTrue(f(a, b));
            a = [
                [1, 2],
                [null, true],
            ];
            b = [
                [1, 2],
                [undefined, true],
            ];
            test.assertFalse(f(a, b));
        });
        it('test objects', () => {
            let a, b;
            a = [{ a: 1, b: 2 }];
            b = [{ a: 1, b: 2 }];
            test.assertTrue(f(a, b));
            a = [{ a: 1, b: 2 }];
            b = [{ a: 1, b: 3 }];
            test.assertFalse(f(a, b));
            a = [{ a: 1, b: 2 }];
            b = [{ a: 1, b: 2, c: 3 }];
            test.assertFalse(f(a, b));
        });
        it('test complex', () => {
            let a, b;
            a = [
                0,
                1,
                2,
                true,
                false,
                Object,
                '',
                ' ',
                ' ok ',
                null,
                undefined,
                NaN,
                [],
                [[]],
                [[[]], [[]]],
                [3, 4, NaN, 6],
                {},
                {
                    a: 'ok',
                    b: null,
                    c: undefined,
                    d: {},
                    e: [],
                    f: [{}, {}, f],
                    g: { h: [], i: [[]], j: [{ k: null }, { k: true }] },
                },
                { x: null, y: undefined, z: NaN },
                { r: /^[a-z]$/ },
            ];
            b = [
                0,
                1,
                2,
                true,
                false,
                Object,
                '',
                ' ',
                ' ok ',
                null,
                undefined,
                NaN,
                [],
                [[]],
                [[[]], [[]]],
                [3, 4, NaN, 6],
                {},
                {
                    a: 'ok',
                    b: null,
                    c: undefined,
                    d: {},
                    e: [],
                    f: [{}, {}, f],
                    g: { h: [], i: [[]], j: [{ k: null }, { k: true }] },
                },
                { x: null, y: undefined, z: NaN },
                { r: /^[a-z]$/ },
            ];
            test.assertTrue(f(a, b));
        });
    });
    describe('flatten', () => {
        const f = arr.flatten;
        it('test array 2D', () => {
            const a = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
            ];
            const b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), b);
        });
        it('test array 2D and values', () => {
            const a = [0, [1, 2], 3, [4, 5], 6, [7, 8], 9];
            const b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), b);
        });
        it('test array 3D', () => {
            const a = [
                [[0, 1, 2], 3, 4],
                [[5, 6, 7], 8, 9],
            ];
            const b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), b);
        });
        it('test array [n]D', () => {
            const a = [[[[[[[[[[0], 1], 2], 3], 4], 5], 6], 7], 8], 9];
            const b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), b);
        });
    });
    describe('index', () => {
        const f = arr.index;
        it('test single key / single value', () => {
            const a = [
                { id: 1, name: 'a' },
                { id: 2, name: 'b' },
                { id: 3, name: 'c' },
                { id: 4, name: 'd' },
                { id: 5, name: 'e' },
                { id: 6, name: 'f' },
            ];
            const b = {
                1: [{ id: 1, name: 'a' }],
                2: [{ id: 2, name: 'b' }],
                3: [{ id: 3, name: 'c' }],
                4: [{ id: 4, name: 'd' }],
                5: [{ id: 5, name: 'e' }],
                6: [{ id: 6, name: 'f' }],
            };
            test.assertEqual(f(a, 'id'), b);
        });
        it('test single key / single value flat', () => {
            const a = [
                { id: 1, name: 'a' },
                { id: 2, name: 'b' },
                { id: 3, name: 'c' },
                { id: 4, name: 'd' },
                { id: 5, name: 'e' },
                { id: 6, name: 'f' },
            ];
            const b = {
                1: { id: 1, name: 'a' },
                2: { id: 2, name: 'b' },
                3: { id: 3, name: 'c' },
                4: { id: 4, name: 'd' },
                5: { id: 5, name: 'e' },
                6: { id: 6, name: 'f' },
            };
            test.assertEqual(f(a, 'id', true), b);
        });
        it('test single key / multiple values', () => {
            const a = [
                { id: 1, name: 'a' },
                { id: 2, name: 'b' },
                { id: 3, name: 'c' },
                { id: 4, name: 'd' },
                { id: 5, name: 'e' },
                { id: 6, name: 'f' },
                { id: 1, name: 'aa' },
                { id: 2, name: 'bb' },
                { id: 3, name: 'cc' },
                { id: 4, name: 'dd' },
                { id: 5, name: 'ee' },
                { id: 6, name: 'ff' },
            ];
            const b = {
                1: [
                    { id: 1, name: 'a' },
                    { id: 1, name: 'aa' },
                ],
                2: [
                    { id: 2, name: 'b' },
                    { id: 2, name: 'bb' },
                ],
                3: [
                    { id: 3, name: 'c' },
                    { id: 3, name: 'cc' },
                ],
                4: [
                    { id: 4, name: 'd' },
                    { id: 4, name: 'dd' },
                ],
                5: [
                    { id: 5, name: 'e' },
                    { id: 5, name: 'ee' },
                ],
                6: [
                    { id: 6, name: 'f' },
                    { id: 6, name: 'ff' },
                ],
            };
            test.assertEqual(f(a, 'id'), b);
        });
        it('test single key / multiple values flat', () => {
            const a = [
                { id: 1, name: 'a' },
                { id: 2, name: 'b' },
                { id: 3, name: 'c' },
                { id: 4, name: 'd' },
                { id: 5, name: 'e' },
                { id: 6, name: 'f' },
                { id: 1, name: 'aa' },
                { id: 2, name: 'bb' },
                { id: 3, name: 'cc' },
                { id: 4, name: 'dd' },
                { id: 5, name: 'ee' },
                { id: 6, name: 'ff' },
            ];
            const b = {
                1: { id: 1, name: 'aa' },
                2: { id: 2, name: 'bb' },
                3: { id: 3, name: 'cc' },
                4: { id: 4, name: 'dd' },
                5: { id: 5, name: 'ee' },
                6: { id: 6, name: 'ff' },
            };
            test.assertEqual(f(a, 'id', true), b);
        });
        it('test multiple keys / values', () => {
            const a = [
                { id: 1, name: 'a', even: false },
                { id: 2, name: 'b', even: true },
                { id: 3, name: 'c', even: false },
                { id: 4, name: 'd', even: true },
                { id: 5, name: 'e', even: false },
                { id: 6, name: 'f', even: true },
            ];
            const b = {
                1: [{ id: 1, name: 'a', even: false }],
                2: [{ id: 2, name: 'b', even: true }],
                3: [{ id: 3, name: 'c', even: false }],
                4: [{ id: 4, name: 'd', even: true }],
                5: [{ id: 5, name: 'e', even: false }],
                6: [{ id: 6, name: 'f', even: true }],
                false: [
                    { id: 1, name: 'a', even: false },
                    { id: 3, name: 'c', even: false },
                    { id: 5, name: 'e', even: false },
                ],
                true: [
                    { id: 2, name: 'b', even: true },
                    { id: 4, name: 'd', even: true },
                    { id: 6, name: 'f', even: true },
                ],
            };
            test.assertEqual(f(a, ['id', 'even']), b);
        });
        it('test multiple keys / values flat', () => {
            const a = [
                { id: 1, name: 'a', even: false },
                { id: 2, name: 'b', even: true },
                { id: 3, name: 'c', even: false },
                { id: 4, name: 'd', even: true },
                { id: 5, name: 'e', even: false },
                { id: 6, name: 'f', even: true },
            ];
            const b = {
                1: { id: 1, name: 'a', even: false },
                2: { id: 2, name: 'b', even: true },
                3: { id: 3, name: 'c', even: false },
                4: { id: 4, name: 'd', even: true },
                5: { id: 5, name: 'e', even: false },
                6: { id: 6, name: 'f', even: true },
                false: { id: 5, name: 'e', even: false },
                true: { id: 6, name: 'f', even: true },
            };
            test.assertEqual(f(a, ['id', 'even'], true), b);
        });
    });
    describe('insert', () => {
        const f = arr.insert;
        it('test first', () => {
            const a = ['a', 'b', 'c', 'd', 'e'];
            test.assertEqual(f(a.slice(), 0, 'x'), ['x', 'a', 'b', 'c', 'd', 'e']);
        });
        it('test last', () => {
            const a = ['a', 'b', 'c', 'd', 'e'];
            test.assertEqual(f(a.slice(), 5, 'x'), ['a', 'b', 'c', 'd', 'e', 'x']);
        });
        it('test middle', () => {
            const a = ['a', 'b', 'c', 'd', 'e'];
            test.assertEqual(f(a.slice(), 3, 'x'), ['a', 'b', 'c', 'x', 'd', 'e']);
        });
    });
    describe('min', () => {
        const f = arr.min;
        it('test array of numbers', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), 0);
        });
        it('test array of objects', () => {
            const a = [
                { n: 0 },
                { n: 1 },
                { n: 2 },
                { n: 3 },
                { n: 4 },
                { n: 5 },
                { n: 6 },
                { n: 7 },
                { n: 8 },
                { n: 9 },
            ];
            test.assertEqual(
                f(a, (item) => {
                    return item['n'];
                }),
                0
            );
        });
    });
    describe('max', () => {
        const f = arr.max;
        it('test array of numbers', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), 9);
        });
        it('test array of objects', () => {
            const a = [
                { n: 0 },
                { n: 1 },
                { n: 2 },
                { n: 3 },
                { n: 4 },
                { n: 5 },
                { n: 6 },
                { n: 7 },
                { n: 8 },
                { n: 9 },
            ];
            test.assertEqual(
                f(a, (item) => {
                    return item['n'];
                }),
                9
            );
        });
    });
    describe('paginate', () => {
        const f = arr.paginate;
        it('test array length 10 items per page -1', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 0), []);
        });
        it('test array length 10 items per page 0', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 0), []);
        });
        it('test array length 10 items per page 1', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 1), [
                [0],
                [1],
                [2],
                [3],
                [4],
                [5],
                [6],
                [7],
                [8],
                [9],
            ]);
        });
        it('test array length 10 items per page 2', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 2), [
                [0, 1],
                [2, 3],
                [4, 5],
                [6, 7],
                [8, 9],
            ]);
        });
        it('test array length 10 items per page 3', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 3), [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
        });
        it('test array length 10 items per page 4', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 4), [
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9],
            ]);
        });
        it('test array length 10 items per page 5', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 5), [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
            ]);
        });
        it('test array length 10 items per page 6', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 6), [
                [0, 1, 2, 3, 4, 5],
                [6, 7, 8, 9],
            ]);
        });
        it('test array length 10 items per page 7', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 7), [
                [0, 1, 2, 3, 4, 5, 6],
                [7, 8, 9],
            ]);
        });
        it('test array length 10 items per page 8', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 8), [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [8, 9],
            ]);
        });
        it('test array length 10 items per page 9', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 9), [[0, 1, 2, 3, 4, 5, 6, 7, 8], [9]]);
        });
        it('test array length 10 items per page 10', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 10), [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]);
        });
        it('test array length 10 items per page 11', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 11), [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]);
        });
    });
    describe('reduce', () => {
        const f = arr.reduce;
        it('test value', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const r = (accumulator, value, index, list) => {
                return accumulator + value;
            };
            test.assertEqual(f(a, r), 45);
        });
        it('test initial value', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const r = (accumulator, value, index, list) => {
                return accumulator + value;
            };
            test.assertEqual(f(a, r, 1), 46);
        });
        it('test index', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const r = (accumulator, value, index, list) => {
                return accumulator + index;
            };
            test.assertEqual(f(a, r), 45);
        });
    });
    describe('remove', () => {
        const f = arr.remove;

        it('test single value first', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 0), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('test single value last', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 9), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it('test single value middle', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 5), [0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });
        it('test single value multiple items', () => {
            const a = [0, 1, 0, 1, 0, 1, 0, 1, 0];
            test.assertEqual(f(a, 0), [1, 1, 1, 1]);
        });
        it('test single value all items', () => {
            const a = [0, 0, 0, 0, 0];
            test.assertEqual(f(a, 0), []);
        });
        it('test multiple values', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 1, 3, 5, 7, 9), [0, 2, 4, 6, 8]);
        });
        it('test none values', () => {
            const a = [null, undefined, NaN, NaN, null, undefined, undefined];
            test.assertEqual(f(a, undefined), [null, NaN, NaN, null]);
        });
        it('test arrays', () => {
            test.assertEqual(
                f(
                    [
                        [1, 2],
                        [3, 4],
                        [5, 6],
                    ],
                    [5, 6]
                ),
                [
                    [1, 2],
                    [3, 4],
                ]
            );
            test.assertEqual(
                f(
                    [
                        [1, 2],
                        [3, 4],
                        [5, 6],
                    ],
                    [5, 7]
                ),
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ]
            );
        });
        it('test objects', () => {
            test.assertEqual(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { c: 3, d: 4 }
                ),
                [
                    { a: 1, b: 2 },
                    { e: 5, f: 6 },
                ]
            );
            test.assertEqual(
                f(
                    [
                        { a: 1, b: 2 },
                        { c: 3, d: 4 },
                        { e: 5, f: 6 },
                    ],
                    { c: 3, d: 5 }
                ),
                [
                    { a: 1, b: 2 },
                    { c: 3, d: 4 },
                    { e: 5, f: 6 },
                ]
            );
        });
    });
    describe('replace', () => {
        const f = arr.replace;

        it('test single value first', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 0, 9), [9, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('test single value last', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 9, 0), [0, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
        });
        it('test single value middle', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 5, 0), [0, 1, 2, 3, 4, 0, 6, 7, 8, 9]);
        });
        it('test multiple values', () => {
            const a = [0, 1, 0, 1, 0, 1, 0, 1, 0];
            test.assertEqual(f(a, 1, -1), [0, -1, 0, -1, 0, -1, 0, -1, 0]);
        });
        it('test all values', () => {
            const a = [0, 0, 0, 0, 0];
            test.assertEqual(f(a, 0, 1), [1, 1, 1, 1, 1]);
        });
    });
    describe('rotate', () => {
        const f = arr.rotate;
        it('test rotate negative', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, -0), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            test.assertEqual(f(a, -1), [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
            test.assertEqual(f(a, -2), [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]);
            test.assertEqual(f(a, -3), [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
            test.assertEqual(f(a, -4), [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
            test.assertEqual(f(a, -5), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
            test.assertEqual(f(a, -6), [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]);
            test.assertEqual(f(a, -7), [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
            test.assertEqual(f(a, -8), [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
            test.assertEqual(f(a, -9), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
            test.assertEqual(f(a, -10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            test.assertEqual(f(a, -11), [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
            test.assertEqual(f(a, -12), [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]);
            test.assertEqual(f(a, -13), [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
            test.assertEqual(f(a, -14), [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
            test.assertEqual(f(a, -15), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        });
        it('test rotate positive', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
            test.assertEqual(f(a, 2), [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
            test.assertEqual(f(a, 3), [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
            test.assertEqual(f(a, 4), [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]);
            test.assertEqual(f(a, 5), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
            test.assertEqual(f(a, 6), [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
            test.assertEqual(f(a, 7), [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
            test.assertEqual(f(a, 8), [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]);
            test.assertEqual(f(a, 9), [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
            test.assertEqual(f(a, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            test.assertEqual(f(a, 11), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
            test.assertEqual(f(a, 12), [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
            test.assertEqual(f(a, 13), [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
            test.assertEqual(f(a, 14), [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]);
            test.assertEqual(f(a, 15), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        });
        it('test rotate 0-1 length', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = -5; i <= 5; i++) {
                test.assertEqual(f([], i), []);
                test.assertEqual(f([1], i), [1]);
            }
        });
    });
    describe('shuffle', () => {
        const f = arr.shuffle;
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let b;
        let c = [];
        it('test array has same length', () => {
            b = f(a);
            test.assertEqual(b.length, a.length);
        });
        it('test array contains all items', () => {
            b = f(a);
            for (let i = 0; i < a.length; i++) {
                test.assertTrue(b.includes(a[i]));
            }
        });
        it('test array contains all items once', () => {
            b = f(a);
            for (let i = 0; i < a.length; i++) {
                test.assertEqual(b.indexOf(a[i]), b.lastIndexOf(a[i]));
            }
        });
        it('test array items order changed', () => {
            b = f(a);
            c = b.some((item) => {
                return a.indexOf(item) != b.indexOf(item);
            });
            test.assertTrue(c);
        });
    });
    describe('sort', () => {
        const f = arr.sort;
        const s = arr.shuffle;
        let a, b;
        it('test array of numbers', () => {
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            b = s([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
            test.assertEqual(f(b), a);
        });
        it('test array of numbers and strings', () => {
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd'];
            b = s([9, 8, 'd', 7, 6, 'c', 5, 4, 'b', 3, 2, 'a', 1, 0]);
            test.assertEqual(f(b), a);
        });
        it('test array of objects on key', () => {
            a = [
                { n: 0 },
                { n: 1 },
                { n: 2 },
                { n: 3 },
                { n: 4 },
                { n: 5 },
                { n: 6 },
                { n: 7 },
                { n: 8 },
                { n: 9 },
                { n: 'a' },
                { n: 'b' },
                { n: 'c' },
            ];
            b = s([
                { n: 'c' },
                { n: 'b' },
                { n: 'a' },
                { n: 9 },
                { n: 8 },
                { n: 7 },
                { n: 6 },
                { n: 5 },
                { n: 4 },
                { n: 3 },
                { n: 2 },
                { n: 1 },
                { n: 0 },
            ]);
            test.assertEqual(f(b, 'n'), a);
        });
        it('test array of arrays on index', () => {
            a = [
                [4, 0, 7],
                [0, 1, 2],
                [2, 2, 4],
                [4, 3, 7],
                [8, 4, 0],
                [9, 5, 6],
            ];
            b = s(a);
            test.assertEqual(f(b, 1), a);
        });
    });
    describe('sum', () => {
        const f = arr.sum;
        it('test array of numbers', () => {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEqual(f(a), 45);
        });
        it('test array of objects', () => {
            const a = [
                { n: 0 },
                { n: 1 },
                { n: 2 },
                { n: 3 },
                { n: 4 },
                { n: 5 },
                { n: 6 },
                { n: 7 },
                { n: 8 },
                { n: 9 },
            ];
            test.assertEqual(
                f(a, (item) => {
                    return item['n'];
                }),
                45
            );
        });
    });
    describe('unique', () => {
        const f = arr.unique;
        it('test array empty', () => {
            test.assertEqual(f([[], [], [], []]), [[]]);
        });
        it('test array', () => {
            test.assertEqual(
                f([
                    [0, 1, 2, 3, 4],
                    [0, 1, 2, 3, 4],
                    [6, 7, 8, 9, 0],
                    [6, 7, 8, 9, 0],
                ]),
                [
                    [0, 1, 2, 3, 4],
                    [6, 7, 8, 9, 0],
                ]
            );
        });
        it('test boolean', () => {
            test.assertEqual(f([true, false, true, false]), [true, false]);
        });
        it('test date', () => {
            const d1 = new Date();
            const d2 = new Date('2018/12/31');
            test.assertEqual(f([d1, d2, d1]), [d1, d2]);
        });
        it('test error', () => {
            const e1 = new Error('error 1');
            const e2 = new Error('error 2');
            test.assertEqual(f([e1, e1, e1, e2, e2, e2]), [e1, e2]);
        });
        it('test function', () => {
            const f1 = f;
            const f2 = () => {};
            test.assertEqual(f([f1, f2, f1, f2, f1, f2], false), [f1, f2]);
        });
        it('test nan', () => {
            test.assertEqual(f([NaN, NaN, NaN]), [NaN]);
        });
        it('test none', () => {
            test.assertEqual(f([null, undefined, NaN, null, undefined, NaN]), [
                null,
                undefined,
                NaN,
            ]);
        });
        it('test null', () => {
            test.assertEqual(f([null, null, null]), [null]);
        });
        it('test number', () => {
            test.assertEqual(
                f([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            );
        });
        it('test object empty', () => {
            test.assertEqual(f([{}, {}, {}]), [{}]);
        });
        it('test object', () => {
            test.assertEqual(f([{ a: 1 }, { a: 1 }, { a: 1 }]), [{ a: 1 }]);
            test.assertEqual(
                f([
                    { a: 1, b: 2 },
                    { a: 1, b: null },
                    { a: 1, b: null },
                ]),
                [
                    { a: 1, b: 2 },
                    { a: 1, b: null },
                ]
            );
        });
        it('test regexp', () => {
            const re1 = /^$/;
            const re2 = /^[a-z]$/;
            test.assertEqual(f([re1, re2, re1, re2]), [re1, re2]);
        });
        it('test string empty', () => {
            test.assertEqual(f(['', '', '']), ['']);
            test.assertEqual(f(['', ' ', '  ']), ['', ' ', '  ']);
        });
        it('test string', () => {
            test.assertEqual(f(['a', 'a', 'b', 'b', 'c', 'c']), ['a', 'b', 'c']);
        });
        it('test undefined', () => {
            test.assertEqual(f([undefined, undefined, undefined]), [undefined]);
        });
    });
    describe('zip / unzip', () => {
        const z = arr.zip;
        const u = arr.unzip;
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ['a', 'b', 'c', 'd', 'e', 'f'];
        const c = [true, false, true, false, true, undefined];
        const l = Math.min(a.length, b.length, c.length);
        const unzipped = [a.slice(0, l), b.slice(0, l), c.slice(0, l)];
        const zipped = [
            [0, 'a', true],
            [1, 'b', false],
            [2, 'c', true],
            [3, 'd', false],
            [4, 'e', true],
            [5, 'f', undefined],
        ];
        it('test zip', () => {
            test.assertEqual(z(a, b, c), zipped);
        });
        it('test unzip', () => {
            test.assertEqual(u(zipped), unzipped);
        });
        it('test zip/unzip', () => {
            test.assertEqual(u(z(a, b, c)), unzipped);
        });
        it('test unzip/zip', () => {
            test.assertEqual(z(...u(zipped)), zipped);
        });
    });
});
