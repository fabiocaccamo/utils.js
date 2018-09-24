var utils = require('../dist/utils.js');
var test = utils.test;
var obj = utils.object;

describe('object', function() {
    describe('assign', function() {
        var f = obj.assign;
        it('test same instance', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1, o1);
            test.assertEqual(r['a'], 1);
            test.assertEqual(r['b'], 2);
            test.assertEqual(r['c'], 3);
        });
        it('test diff instance', function() {
            var o1 = { a:1, b:2, c:3 };
            var o2 = { d:4, e:5, f:6 };
            var r = f(o1, o2);
            test.assertTrue(o1 !== o2);
            test.assertTrue(o1 === r);
            test.assertTrue(o2 !== r);
            test.assertEqual(r['a'], 1);
            test.assertEqual(r['b'], 2);
            test.assertEqual(r['c'], 3);
            test.assertEqual(r['d'], 4);
            test.assertEqual(r['e'], 5);
            test.assertEqual(r['f'], 6);
        });
        it('test multiple instances', function() {
            var o1 = { a:1, b:2, c:3 };
            var o2 = { d:4, e:5, f:6 };
            var o3 = { g:7, h:8, i:9 };
            var o4 = { a:0, e:0, i:0 };
            var r = f(o1, o2, o3, o4);
            test.assertEqual(r['a'], 0);
            test.assertEqual(r['b'], 2);
            test.assertEqual(r['c'], 3);
            test.assertEqual(r['d'], 4);
            test.assertEqual(r['e'], 0);
            test.assertEqual(r['f'], 6);
            test.assertEqual(r['g'], 7);
            test.assertEqual(r['h'], 8);
            test.assertEqual(r['i'], 0);
        });
        it('test props overwrite', function() {
            var o1 = { a:1, b:2, c:3 };
            var o2 = { a:4, b:5, c:6 };
            var r = f(o1, o2);
            test.assertEqual(r['a'], 4);
            test.assertEqual(r['b'], 5);
            test.assertEqual(r['c'], 6);
        });
    });
    describe('clean', function() {
        var f = obj.clean;
        it('test soft', function() {
            var o1 = { a:1, b:undefined, c:3, d:null, e:'', f:0, g:NaN, h:false, i:[null], j:{ k:null } };
            var r = f(o1);
            test.assertEqual(obj.length(r), 7);
            test.assertEqual(r['a'], 1);
            test.assertEqual(r['b'], undefined);
            test.assertEqual(r['c'], 3);
            test.assertEqual(r['d'], undefined);
            test.assertEqual(r['e'], '');
            test.assertEqual(r['f'], 0);
            test.assertEqual(r['g'], undefined);
            test.assertEqual(r['h'], false);
            test.assertEqual(r['i'], [null]);
            test.assertEqual(r['j'], { k:null });
        });
        it('test hard', function() {
            var o1 = { a:1, b:undefined, c:3, d:null, e:'', f:0, g:NaN, h:false, i:[null], j:{ k:null } };
            var r = f(o1, true);
            test.assertEqual(obj.length(r), 4);
            test.assertEqual(r['a'], 1);
            test.assertEqual(r['b'], undefined);
            test.assertEqual(r['c'], 3);
            test.assertEqual(r['d'], undefined);
            test.assertEqual(r['e'], undefined);
            test.assertEqual(r['f'], 0);
            test.assertEqual(r['g'], undefined);
            test.assertEqual(r['h'], false);
            test.assertEqual(r['i'], undefined);
            test.assertEqual(r['j'], undefined);
        });
    });
    describe('clone', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('decodeBase64', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('decodeJSON', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('encodeBase64', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('encodeJSON', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('equals', function() {
        var f = obj.equals;
        var a = {
            foods:{
                fruits: ["orange", "lemon"]
            },
            numbers:{
                "Decimal": {
                    tens:[40, 50, 20],
                    hundreds:[300, 500]
                },
                "Roman": {
                    small:["I", "VII", "IX"],
                    hundreds:[300, 500]
                },
            },
            bikes: ["recumbent", "upright"]
        };
        var b = {
            foods:{
                fruits:["orange", "lemon"]
            },
            numbers:{
                "Decimal": {
                    tens:[40, 50, 20],
                    hundreds:[300, 500]
                },
                "Roman": {
                    small:["I", "VII", "IX"],
                    hundreds:[300, 500]
                },
            },
            bikes: ["recumbent", "upright"]
        };
        var c = {
            foods:{
                fruits:["orange", "lemon"]
            },
            numbers:{
                "Decimal": {
                    tens:[40, 50, 20],
                    hundreds:[300, 700]
                },
                "Roman": {
                    small:["I", "VII", "IX"],
                    large:["MCXVII", "MCXXVIII", "MMVIII"]
                },
            },
            bikes: ["recumbent", "upright"]
        };
        it('test simple', function() {
            test.assertTrue(f(a, a));
            test.assertTrue(f(a, b));
            test.assertFalse(f(a, c));
            test.assertFalse(f(b, c));
        });
        it('test objects containing numbers', function() {
            var a = { x:0.0, y:0.0 };
            var b = { x:0.0, y:0.0000000001 };
            var c = { x:0.0, y:0.0001 };
            test.assertTrue(f(a, b));
            test.assertFalse(f(a, c));
        });
    });
    describe('keys', function() {
        var f = obj.keys;
        it('test no keys', function() {
            var o1 = {};
            var r = f(o1);
            test.assertEqual(r, []);
        });
        it('test keys unsorted', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1);
            test.assertTrue(r.indexOf('a') !== -1);
            test.assertTrue(r.indexOf('b') !== -1);
            test.assertTrue(r.indexOf('c') !== -1);
        });
        it('test keys sorted', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1, true);
            test.assertEqual(r, ['a', 'b', 'c']);
        });
    });
    describe('keypath', function() {
        it('test object', function() {
            test.assertObject(obj.keypath);
        });
    });
    describe('keypath.get', function() {
        var f = obj.keypath.get;
        var o = {
            a: 1,
            b: {
                y: 'ok'
            },
            c: {},
            d: 'ok',
            e: {
                f: {
                    g: 'ok'
                }
            }
        };
        var r;
        it('test on 1 non-existing key', function() {
            r = f(o, 'z');
            test.assertEqual(r, undefined);
        });
        it('test on 1 non-existing key default value', function() {
            r = f(o, 'z', 0);
            test.assertEqual(r, 0);
        });
        it('test on 1 existing key', function() {
            r = f(o, 'a');
            test.assertEqual(r, 1);
        });
        it('test on 2 non-existing keys', function() {
            r = f(o, 'a.x');
            test.assertEqual(r, undefined);
        });
        it('test on 2 non-existing keys default value', function() {
            r = f(o, 'a.x', 2);
            test.assertEqual(r, 2);
        });
        it('test on 2 existing keys', function() {
            r = f(o, 'b.y');
            test.assertEqual(r, 'ok');
        });
        it('test on 3 non-existing keys', function() {
            r = f(o, 'x.y.z');
            test.assertEqual(r, undefined);
        });
        it('test on 3 non-existing keys default value', function() {
            r = f(o, 'x.y.z', 1000);
            test.assertEqual(r, 1000);
        });
        it('test on 3 existing keys', function() {
            r = f(o, 'e.f.g');
            test.assertEqual(r, 'ok');
        });
    });
    describe('keypath.set', function() {
        var f = obj.keypath.set;
        var o = {
            a: {},
            b: {},
            c: {}
        };
        it('test on 1 non-existing key', function() {
            f(o, 'd', 'ok 1');
            test.assertEqual(o['d'], 'ok 1');
        });
        it('test on 1 existing key', function() {
            f(o, 'd', 'ok 2');
            test.assertEqual(o['d'], 'ok 2');
        });
        it('test on 2 non-existing keys', function() {
            f(o, 'e.f', 'ok 1');
            test.assertEqual(o['e']['f'], 'ok 1');
        });
        it('test on 2 existing keys', function() {
            f(o, 'e.f', 'ok 2');
            test.assertEqual(o['e']['f'], 'ok 2');
        });
        it('test on 3 non-existing keys', function() {
            f(o, 'e.f.g', 'ok 1');
            test.assertEqual(o['e']['f']['g'], 'ok 1');
        });
        it('test on 3 existing keys', function() {
            f(o, 'e.f.g', 'ok 2');
            test.assertEqual(o['e']['f']['g'], 'ok 2');
        });
    });
    describe('length', function() {
        var f = obj.length;
        it('test empty object', function() {
            var o1 = {};
            var r = f(o1);
            test.assertEqual(r, 0);
        });
        it('test simple object', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1);
            test.assertEqual(r, 3);
        });
    });
    describe('map', function() {
        var f = obj.map;
        it('test all items', function() {
            var o1 = { a:1, b:2, c:3 };
            var keys = obj.keys(o1);
            var values = obj.values(o1);
            var r = f(o1, function(val, key, item){
                test.assertTrue(item === o1);
                test.assertTrue(keys.indexOf(key) !== -1);
                test.assertTrue(values.indexOf(val) !== -1);
            });
        });
        it('test result', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1, function(val, key, item){
                return (val * 2);
            });
            test.assertEqual(r, { a:2, b:4, c:6 });
        });
    });
    describe('merge', function() {
        var f = obj.merge;
        it('test same instance', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1, o1);
            test.assertFalse(o1 === r);
            test.assertEqual(r['a'], 1);
            test.assertEqual(r['b'], 2);
            test.assertEqual(r['c'], 3);
        });
        it('test diff instance', function() {
            var o1 = { a:1, b:2, c:3 };
            var o2 = { d:4, e:5, f:6 };
            var r = f(o1, o2);
            test.assertTrue(o1 !== o2);
            test.assertTrue(o1 !== r);
            test.assertTrue(o2 !== r);
            test.assertEqual(r['a'], 1);
            test.assertEqual(r['b'], 2);
            test.assertEqual(r['c'], 3);
            test.assertEqual(r['d'], 4);
            test.assertEqual(r['e'], 5);
            test.assertEqual(r['f'], 6);
        });
        it('test multiple instances', function() {
            var o1 = { a:1, b:2, c:3 };
            var o2 = { d:4, e:5, f:6 };
            var o3 = { g:7, h:8, i:9 };
            var o4 = { a:0, e:0, i:0 };
            var r = f(o1, o2, o3, o4);
            test.assertEqual(r['a'], 0);
            test.assertEqual(r['b'], 2);
            test.assertEqual(r['c'], 3);
            test.assertEqual(r['d'], 4);
            test.assertEqual(r['e'], 0);
            test.assertEqual(r['f'], 6);
            test.assertEqual(r['g'], 7);
            test.assertEqual(r['h'], 8);
            test.assertEqual(r['i'], 0);
        });
        it('test props overwrite', function() {
            var o1 = { a:1, b:2, c:3 };
            var o2 = { a:4, b:5, c:6 };
            var r = f(o1, o2);
            test.assertEqual(r['a'], 4);
            test.assertEqual(r['b'], 5);
            test.assertEqual(r['c'], 6);
        });
    });
    describe('values', function() {
        var f = obj.values;
        it('test no values', function() {
            var o1 = {};
            var r = f(o1);
            test.assertEqual(r, []);
        });
        it('test values unsorted', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1);
            test.assertTrue(r.indexOf(1) !== -1);
            test.assertTrue(r.indexOf(2) !== -1);
            test.assertTrue(r.indexOf(3) !== -1);
        });
        it('test values sorted', function() {
            var o1 = { a:1, b:2, c:3 };
            var r = f(o1, true);
            test.assertEqual(r, [1, 2, 3]);
        });
    });
});