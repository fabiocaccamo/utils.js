import utils from '../src/utils.js';
const test = utils.test;
const obj = utils.object;

describe('object', () => {
    describe('assign', () => {
        const f = obj.assign;
        it('test same instance', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1, o1);
            test.assertEqual(r, { a: 1, b: 2, c: 3 });
        });
        it('test diff instance', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const o2 = { d: 4, e: 5, f: 6 };
            const r = f(o1, o2);
            test.assertTrue(o1 !== o2);
            test.assertTrue(o1 === r);
            test.assertTrue(o2 !== r);
            test.assertEqual(r, { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        });
        it('test multiple instances', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const o2 = { d: 4, e: 5, f: 6 };
            const o3 = { g: 7, h: 8, i: 9 };
            const o4 = { a: 0, e: 0, i: 0 };
            const r = f(o1, o2, o3, o4);
            test.assertEqual(r, {
                a: 0,
                b: 2,
                c: 3,
                d: 4,
                e: 0,
                f: 6,
                g: 7,
                h: 8,
                i: 0,
            });
        });
        it('test props overwrite', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const o2 = { a: 4, b: 5, c: 6 };
            const r = f(o1, o2);
            test.assertEqual(r['a'], 4);
            test.assertEqual(r['b'], 5);
            test.assertEqual(r['c'], 6);
            test.assertEqual(r, { a: 4, b: 5, c: 6 });
        });
    });
    describe('clean', () => {
        const f = obj.clean;
        it('test soft', () => {
            const o1 = {
                a: 1,
                b: undefined,
                c: 3,
                d: null,
                e: '',
                f: 0,
                g: NaN,
                h: false,
                i: [null],
                j: { k: null },
            };
            const r = f(o1);
            test.assertEqual(obj.length(r), 7);
            test.assertEqual(r, {
                a: 1,
                c: 3,
                e: '',
                f: 0,
                h: false,
                i: [null],
                j: { k: null },
            });
        });
        it('test hard', () => {
            const o1 = {
                a: 1,
                b: undefined,
                c: 3,
                d: null,
                e: '',
                f: 0,
                g: NaN,
                h: false,
                i: [null],
                j: { k: null },
            };
            const r = f(o1, true);
            test.assertEqual(obj.length(r), 4);
            test.assertEqual(r, { a: 1, c: 3, f: 0, h: false });
        });
    });
    describe('clone', () => {
        const f = obj.clone;
        it('test new instance and key/values cloned', () => {
            const o = { a: 1, b: 2, c: 3 };
            const r = f(o);
            test.assertFalse(r === o);
            test.assertEqual(r, o);
        });
        it('test array property cloned', () => {
            const a = { a: [1, 2, 3] };
            const o = { a: a };
            const r = f(o);
            test.assertFalse(r['a'] === a);
            test.assertEqual(r['a'], a);
        });
        it('test boolean property cloned', () => {
            const b = true;
            const o = { b: b };
            const r = f(o);
            test.assertTrue(r['b'] === b);
            test.assertEqual(r['b'], b);
        });
        it('test date property cloned', () => {
            const d = new Date(1900);
            const o = { d: d };
            const r = f(o);
            test.assertFalse(r['d'] === d);
            test.assertEqual(r['d'], d);
        });
        it('test object property cloned', () => {
            const a = { a: 1, b: 2, c: 3 };
            const o = { o: a };
            const r = f(o);
            test.assertFalse(r['o'] === a);
            test.assertEqual(r['o'], a);
        });
        it('test number property cloned', () => {
            const n = 123;
            const o = { n: n };
            const r = f(o);
            test.assertTrue(r['n'] === n);
            test.assertEqual(r['n'], n);
        });
        it('test string property cloned', () => {
            const s = 'ok';
            const o = { s: s };
            const r = f(o);
            test.assertTrue(r['s'] === s);
            test.assertEqual(r['s'], s);
        });
    });
    // describe('decodeBase64', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    // describe('decodeJSON', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    // describe('encodeBase64', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    // describe('encodeJSON', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('equals', () => {
        const f = obj.equals;
        const a = {
            foods: {
                fruits: ['orange', 'lemon'],
            },
            numbers: {
                Decimal: {
                    tens: [40, 50, 20],
                    hundreds: [300, 500],
                },
                Roman: {
                    small: ['I', 'VII', 'IX'],
                    hundreds: [300, 500],
                },
            },
            bikes: ['recumbent', 'upright'],
        };
        const b = {
            foods: {
                fruits: ['orange', 'lemon'],
            },
            numbers: {
                Decimal: {
                    tens: [40, 50, 20],
                    hundreds: [300, 500],
                },
                Roman: {
                    small: ['I', 'VII', 'IX'],
                    hundreds: [300, 500],
                },
            },
            bikes: ['recumbent', 'upright'],
        };
        const c = {
            foods: {
                fruits: ['orange', 'lemon'],
            },
            numbers: {
                Decimal: {
                    tens: [40, 50, 20],
                    hundreds: [300, 700],
                },
                Roman: {
                    small: ['I', 'VII', 'IX'],
                    large: ['MCXVII', 'MCXXVIII', 'MMVIII'],
                },
            },
            bikes: ['recumbent', 'upright'],
        };
        it('test simple', () => {
            test.assertTrue(f(a, a));
            test.assertTrue(f(a, b));
            test.assertFalse(f(a, c));
            test.assertFalse(f(b, c));
        });
        it('test objects containing numbers', () => {
            const a = { x: 0.0, y: 0.0 };
            const b = { x: 0.0, y: 0.0000000001 };
            const c = { x: 0.0, y: 0.0001 };
            test.assertTrue(f(a, b));
            test.assertFalse(f(a, c));
        });
        it('test objects containing different keys', () => {
            const a = { x: 0.0, y: 0.0 };
            const b = { x: 0.0, y: 0.0, z: 0.0 };
            const c = { x: 0.0 };
            test.assertFalse(f(a, b));
            test.assertFalse(f(a, c));
            test.assertFalse(f(b, c));
        });
    });
    describe('keys', () => {
        const f = obj.keys;
        it('test no keys', () => {
            const o1 = {};
            const r = f(o1);
            test.assertEqual(r, []);
        });
        it('test keys unsorted', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1);
            test.assertTrue(r.includes('a'));
            test.assertTrue(r.includes('b'));
            test.assertTrue(r.includes('c'));
        });
        it('test keys sorted', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1, true);
            test.assertEqual(r, ['a', 'b', 'c']);
        });
    });
    describe('keypath', () => {
        it('test object', () => {
            test.assertObject(obj.keypath);
        });
    });
    describe('keypath.get', () => {
        const f = obj.keypath.get;
        const o = {
            a: 1,
            b: {
                y: 'ok',
            },
            c: {},
            d: 'ok',
            e: {
                f: {
                    g: 'ok',
                },
            },
        };
        let r;
        it('test on 1 non-existing key', () => {
            r = f(o, 'z');
            test.assertEqual(r, undefined);
        });
        it('test on 1 non-existing key default value', () => {
            r = f(o, 'z', 0);
            test.assertEqual(r, 0);
        });
        it('test on 1 existing key', () => {
            r = f(o, 'a');
            test.assertEqual(r, 1);
        });
        it('test on 2 non-existing keys', () => {
            r = f(o, 'a.x');
            test.assertEqual(r, undefined);
        });
        it('test on 2 non-existing keys default value', () => {
            r = f(o, 'a.x', 2);
            test.assertEqual(r, 2);
        });
        it('test on 2 existing keys', () => {
            r = f(o, 'b.y');
            test.assertEqual(r, 'ok');
        });
        it('test on 3 non-existing keys', () => {
            r = f(o, 'x.y.z');
            test.assertEqual(r, undefined);
        });
        it('test on 3 non-existing keys default value', () => {
            r = f(o, 'x.y.z', 1000);
            test.assertEqual(r, 1000);
        });
        it('test on 3 existing keys', () => {
            r = f(o, 'e.f.g');
            test.assertEqual(r, 'ok');
        });
    });
    describe('keypath.set', () => {
        const f = obj.keypath.set;
        const o = {
            a: {},
            b: {},
            c: {},
        };
        it('test on 1 non-existing key', () => {
            f(o, 'd', 'ok 1');
            test.assertEqual(o['d'], 'ok 1');
        });
        it('test on 1 existing key', () => {
            f(o, 'd', 'ok 2');
            test.assertEqual(o['d'], 'ok 2');
        });
        it('test on 2 non-existing keys', () => {
            f(o, 'e.f', 'ok 1');
            test.assertEqual(o['e']['f'], 'ok 1');
        });
        it('test on 2 existing keys', () => {
            f(o, 'e.f', 'ok 2');
            test.assertEqual(o['e']['f'], 'ok 2');
        });
        it('test on 3 non-existing keys', () => {
            f(o, 'e.f.g', 'ok 1');
            test.assertEqual(o['e']['f']['g'], 'ok 1');
        });
        it('test on 3 existing keys', () => {
            f(o, 'e.f.g', 'ok 2');
            test.assertEqual(o['e']['f']['g'], 'ok 2');
        });
        it('test prototype pollution', () => {
            f(o, '__proto__.polluted', true);
            test.assertUndefined(o['polluted']);
            test.assertUndefined({}.polluted);
        });
    });
    describe('length', () => {
        const f = obj.length;
        it('test empty object', () => {
            const o1 = {};
            const r = f(o1);
            test.assertEqual(r, 0);
        });
        it('test simple object', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1);
            test.assertEqual(r, 3);
        });
    });
    describe('map', () => {
        const f = obj.map;
        it('test all items', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const keys = obj.keys(o1);
            const values = obj.values(o1);
            const r = f(o1, (val, key, item) => {
                test.assertTrue(item === o1);
                test.assertTrue(keys.includes(key));
                test.assertTrue(values.includes(val));
            });
        });
        it('test result', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1, (val, key, item) => {
                return val * 2;
            });
            test.assertEqual(r, { a: 2, b: 4, c: 6 });
        });
    });
    describe('merge', () => {
        const f = obj.merge;
        it('test same instance', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1, o1);
            test.assertFalse(o1 === r);
            test.assertEqual(r, { a: 1, b: 2, c: 3 });
        });
        it('test diff instance', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const o2 = { d: 4, e: 5, f: 6 };
            const r = f(o1, o2);
            test.assertTrue(o1 !== o2);
            test.assertTrue(o1 !== r);
            test.assertTrue(o2 !== r);
            test.assertEqual(r, { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        });
        it('test multiple instances', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const o2 = { d: 4, e: 5, f: 6 };
            const o3 = { g: 7, h: 8, i: 9 };
            const o4 = { a: 0, e: 0, i: 0 };
            const r = f(o1, o2, o3, o4);
            test.assertEqual(r, {
                a: 0,
                b: 2,
                c: 3,
                d: 4,
                e: 0,
                f: 6,
                g: 7,
                h: 8,
                i: 0,
            });
        });
        it('test props overwrite', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const o2 = { a: 4, b: 5, c: 6 };
            const r = f(o1, o2);
            test.assertEqual(r, { a: 4, b: 5, c: 6 });
        });
    });
    describe('search', () => {
        const f = obj.search;
        it('test empty filter', () => {
            const objs = [
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
            ];
            const r = f(objs, {});
            test.assertEqual(r, objs);
        });
        it('test simple filter result found', () => {
            const objs = [
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 2, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 3, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 4, b: 2, c: null, d: 'ok', e: false, f: true },
            ];
            const r = f(objs, { a: 3 });
            test.assertEqual(r, [objs[2]]);
        });
        it('test simple filter result not found', () => {
            const objs = [
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 2, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 3, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 4, b: 2, c: null, d: 'ok', e: false, f: true },
            ];
            const r = f(objs, { a: 5 });
            test.assertEqual(r, []);
        });
        it('test simple filter multiple result found', () => {
            const objs = [
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 2, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: false },
                { a: 2, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 1, b: 2, c: null, d: 'ok', e: false, f: true },
                { a: 2, b: 2, c: null, d: 'ok', e: false, f: true },
            ];
            const r = f(objs, { a: 1, f: true });
            test.assertEqual(r, [objs[0], objs[4]]);
        });
    });
    describe('values', () => {
        const f = obj.values;
        it('test no values', () => {
            const o1 = {};
            const r = f(o1);
            test.assertEqual(r, []);
        });
        it('test values unsorted', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1);
            test.assertTrue(r.includes(1));
            test.assertTrue(r.includes(2));
            test.assertTrue(r.includes(3));
        });
        it('test values sorted', () => {
            const o1 = { a: 1, b: 2, c: 3 };
            const r = f(o1, true);
            test.assertEqual(r, [1, 2, 3]);
        });
    });
});
