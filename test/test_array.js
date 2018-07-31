var utils = require('../dist/utils.js');
var test = utils.test;

describe('array', function() {
    describe('clean', function() {
        var f = utils.array.clean;

        it('test none', function() {
            test.assertEquals(f([null, undefined, NaN], false), []);
        });
        it('test none hard', function() {
            test.assertEquals(f([null, undefined, NaN], true), []);
        });

        it('test booleans', function() {
            test.assertEquals(f([true, false], false), [true, false]);
        });
        it('test booleans hard', function() {
            test.assertEquals(f([true, false], true), [true, false]);
        });

        it('test date', function() {
            var d = new Date();
            test.assertEquals(f([d], false), [d]);
        });
        it('test date hard', function() {
            var d = new Date();
            test.assertEquals(f([d], true), [d]);
        });

        it('test error', function() {
            var e = new Error();
            test.assertEquals(f([e], false), [e]);
        });
        it('test error hard', function() {
            var e = new Error();
            test.assertEquals(f([e], true), [e]);
        });

        it('test function', function() {
            test.assertEquals(f([f], false), [f]);
        });
        it('test function hard', function() {
            test.assertEquals(f([f], true), [f]);
        });

        it('test numbers', function() {
            test.assertEquals(f([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, NaN, Number.Infinity], false), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('test numbers hard', function() {
            test.assertEquals(f([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, NaN, Number.Infinity], true), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('test regexp', function() {
            var re = /^$/;
            test.assertEquals(f([re], false), [re]);
        });
        it('test regexp hard', function() {
            var re = /^$/;
            test.assertEquals(f([re], true), [re]);
        });

        it('test strings', function() {
            test.assertEquals(f(['', ' ', '   ', 'a', 'b', 'c'], false), ['', ' ', '   ', 'a', 'b', 'c']);
        });
        it('test strings hard', function() {
            test.assertEquals(f(['', ' ', '   ', 'a', 'b', 'c'], true), ['a', 'b', 'c']);
        });

        it('test arrays', function() {
            test.assertEquals(f([[[], [], []], [], [], []], false), [[[], [], []], [], [], []]);
        });
        it('test arrays hard', function() {
            test.assertEquals(f([[], [], []], true), []);
            test.assertEquals(f([[[], [], []], [], [], []], true), []);
        });

        it('test objects', function() {
            test.assertEquals(f([{}, {}, {}], false), [{}, {}, {}]);
            test.assertEquals(f([{ a:{} }, { b:{} }, { c:{} }], false), [{ a:{} }, { b:{} }, { c:{} }]);
            test.assertEquals(f([{ a:null }, { b:{} }, { c:{} }], false), [{ a:null }, { b:{} }, { c:{} }]);
            test.assertEquals(f([{ a:{ b:null } }, { b:{} }, { c:{} }], false), [{ a:{ b:null } }, { b:{} }, { c:{} }]);
        });
        it('test objects hard', function() {
            test.assertEquals(f([{}, {}, {}], true), []);
            test.assertEquals(f([{ a:{} }, { b:{} }, { c:{} }], true), []);
            test.assertEquals(f([{ a:null }, { b:{} }, { c:{} }], true), []);
            test.assertEquals(f([{ a:{ b:null } }, { b:{} }, { c:{} }], true), []);
            test.assertEquals(f([{ a:{ b:0 } }, { b:{} }, { c:{} }], true), [{ a:{ b:0 } }]);

            var input, output;
            input = [0, 1, 2, true, false, '', ' ', ' ok ', null, undefined, NaN, [], [[]], [[[]], [[]]], [3, 4, NaN, 6], {}, { a:'ok', b:null, c:undefined, d:{}, e:[], f:[{}, {}], g:{ h:[], i:[[]], j:[{ k:null }, { k:true }] } }, { x:null, y:undefined, z:NaN }];
            output = [0, 1, 2, true, false, ' ok ', [3, 4, 6], { a:'ok', g:{ j:[{ k:true }] }}];
            test.assertEquals(f(input, true), output);
        });
    });
    describe('equals', function() {
        var f = utils.array.equals;
        var a, b;
        it('test none', function() {
            test.assertTrue(f([null, undefined, NaN], [null, undefined, NaN]));
            test.assertFalse(f([null, undefined, NaN], [null, undefined, NaN, NaN]));
            test.assertFalse(f([null, undefined, NaN], [null, undefined, null]));
        });
        it('test booleans', function() {
            test.assertTrue(f([true, false, true, false], [true, false, true, false]));
            test.assertFalse(f([true, false, true, false], [true, false, true, true]));
            test.assertFalse(f([true, false, true, false], [true, false, true]));
        });
        it('test date', function() {
            a = new Date();
            b = new Date();
            c = new Date('1999/12/31');
            test.assertTrue(f([a], [a]));
            test.assertTrue(f([a], [b]));
            test.assertFalse(f([a], [c]));
        });
        it('test error', function() {
            a = new Error('message 1');
            b = new Error('message 1');
            c = new Error('message 2');
            test.assertTrue(f([a], [a]));
            test.assertTrue(f([a], [b]));
            test.assertFalse(f([a], [c]));
        });
        it('test function', function() {
            test.assertTrue(f([f, f, f], [f, f, f]));
            test.assertFalse(f([f, f, f], [f, f]));
            test.assertFalse(f([f, f, f], [f, f, function(){}]));
        });
        it('test numbers', function() {
            test.assertTrue(f([0, 1, 2, 3, 4, 5, NaN], [0, 1, 2, 3, 4, 5, NaN]));
            test.assertFalse(f([0, 1, 2, 3, 4, 5, NaN], [1, 2, 3, 4, 5, NaN]));
        });
        it('test regexp', function() {
            test.assertTrue(f([/^[a-z]$/], [/^[a-z]$/]));
            test.assertFalse(f([/^[a-z]$/], [/^[a-zA-Z]$/]));
        });
        it('test strings', function() {
            test.assertTrue(f(['a'], ['a']));
            test.assertFalse(f(['a'], ['A']));
        });
        it('test arrays', function() {
            a = [[1, 2], [null, true]];
            b = [[1, 2], [null, true]];
            test.assertTrue(f(a, b));
            a = [[1, 2], [null, true]];
            b = [[1, 2], [undefined, true]];
            test.assertFalse(f(a, b));
        });
        it('test objects', function() {
            a = [{ a:1, b:2 }];
            b = [{ a:1, b:2 }];
            test.assertTrue(f(a, b));
            a = [{ a:1, b:2 }];
            b = [{ a:1, b:3 }];
            test.assertFalse(f(a, b));
            a = [{ a:1, b:2 }];
            b = [{ a:1, b:2, c:3 }];
            test.assertFalse(f(a, b));
        });
        it('test complex', function() {
            a = [0, 1, 2, true, false, Object, '', ' ', ' ok ', null, undefined, NaN, [], [[]], [[[]], [[]]], [3, 4, NaN, 6], {}, { a:'ok', b:null, c:undefined, d:{}, e:[], f:[{}, {}, f], g:{ h:[], i:[[]], j:[{ k:null }, { k:true }] } }, { x:null, y:undefined, z:NaN }, { r:/^[a-z]$/ }];
            b = [0, 1, 2, true, false, Object, '', ' ', ' ok ', null, undefined, NaN, [], [[]], [[[]], [[]]], [3, 4, NaN, 6], {}, { a:'ok', b:null, c:undefined, d:{}, e:[], f:[{}, {}, f], g:{ h:[], i:[[]], j:[{ k:null }, { k:true }] } }, { x:null, y:undefined, z:NaN }, { r:/^[a-z]$/ }];
            test.assertTrue(f(a, b));
        });
    });
    describe('flatten', function() {
        var f = utils.array.flatten;
        var a, b;
        it('test array 2D', function() {
            a = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]];
            b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEquals(f(a), b);
        });
        it('test array 2D and values', function() {
            a = [0, [1, 2], 3, [4, 5], 6, [7, 8], 9];
            b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEquals(f(a), b);
        });
        it('test array 3D', function() {
            a = [[[0, 1, 2], 3, 4], [[5, 6, 7], 8, 9]];
            b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEquals(f(a), b);
        });
        it('test array [n]D', function() {
            a = [[[[[[[[[[0], 1], 2], 3], 4], 5], 6], 7], 8], 9];
            b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            test.assertEquals(f(a), b);
        });
    });
    describe('index', function() {
        var f = utils.array.index;
        var a, b;
        it('test single key / single value', function() {
            a = [
                { id:1, name:'a' },
                { id:2, name:'b' },
                { id:3, name:'c' },
                { id:4, name:'d' },
                { id:5, name:'e' },
                { id:6, name:'f' }
            ];
            b = {
                '1': [{ id:1, name:'a' }],
                '2': [{ id:2, name:'b' }],
                '3': [{ id:3, name:'c' }],
                '4': [{ id:4, name:'d' }],
                '5': [{ id:5, name:'e' }],
                '6': [{ id:6, name:'f' }]
            };
            test.assertEquals(f(a, 'id'), b);
        });
        it('test single key / single value flat', function() {
            a = [
                { id:1, name:'a' },
                { id:2, name:'b' },
                { id:3, name:'c' },
                { id:4, name:'d' },
                { id:5, name:'e' },
                { id:6, name:'f' }
            ];
            b = {
                '1': { id:1, name:'a' },
                '2': { id:2, name:'b' },
                '3': { id:3, name:'c' },
                '4': { id:4, name:'d' },
                '5': { id:5, name:'e' },
                '6': { id:6, name:'f' }
            };
            test.assertEquals(f(a, 'id', true), b);
        });
        it('test single key / multiple values', function() {
            a = [
                { id:1, name:'a' },
                { id:2, name:'b' },
                { id:3, name:'c' },
                { id:4, name:'d' },
                { id:5, name:'e' },
                { id:6, name:'f' },
                { id:1, name:'aa' },
                { id:2, name:'bb' },
                { id:3, name:'cc' },
                { id:4, name:'dd' },
                { id:5, name:'ee' },
                { id:6, name:'ff' }
            ];
            b = {
                '1': [{ id:1, name:'a' }, { id:1, name:'aa' }],
                '2': [{ id:2, name:'b' }, { id:2, name:'bb' }],
                '3': [{ id:3, name:'c' }, { id:3, name:'cc' }],
                '4': [{ id:4, name:'d' }, { id:4, name:'dd' }],
                '5': [{ id:5, name:'e' }, { id:5, name:'ee' }],
                '6': [{ id:6, name:'f' }, { id:6, name:'ff' }]
            };
            test.assertEquals(f(a, 'id'), b);
        });
        it('test single key / multiple values flat', function() {
            a = [
                { id:1, name:'a' },
                { id:2, name:'b' },
                { id:3, name:'c' },
                { id:4, name:'d' },
                { id:5, name:'e' },
                { id:6, name:'f' },
                { id:1, name:'aa' },
                { id:2, name:'bb' },
                { id:3, name:'cc' },
                { id:4, name:'dd' },
                { id:5, name:'ee' },
                { id:6, name:'ff' }
            ];
            b = {
                '1': { id:1, name:'aa' },
                '2': { id:2, name:'bb' },
                '3': { id:3, name:'cc' },
                '4': { id:4, name:'dd' },
                '5': { id:5, name:'ee' },
                '6': { id:6, name:'ff' }
            };
            test.assertEquals(f(a, 'id', true), b);
        });
        it('test multiple keys / values', function() {
            a = [
                { id:1, name:'a', even:false },
                { id:2, name:'b', even:true },
                { id:3, name:'c', even:false },
                { id:4, name:'d', even:true },
                { id:5, name:'e', even:false },
                { id:6, name:'f', even:true }
            ];
            b = {
                '1': [{ id:1, name:'a', even:false }],
                '2': [{ id:2, name:'b', even:true }],
                '3': [{ id:3, name:'c', even:false }],
                '4': [{ id:4, name:'d', even:true }],
                '5': [{ id:5, name:'e', even:false }],
                '6': [{ id:6, name:'f', even:true }],
                'false': [{ id:1, name:'a', even:false }, { id:3, name:'c', even:false }, { id:5, name:'e', even:false }],
                'true': [{ id:2, name:'b', even:true }, { id:4, name:'d', even:true }, { id:6, name:'f', even:true }]
            };
            test.assertEquals(f(a, ['id', 'even']), b);
        });
        it('test multiple keys / values flat', function() {
            a = [
                { id:1, name:'a', even:false },
                { id:2, name:'b', even:true },
                { id:3, name:'c', even:false },
                { id:4, name:'d', even:true },
                { id:5, name:'e', even:false },
                { id:6, name:'f', even:true }
            ];
            b = {
                '1': { id:1, name:'a', even:false },
                '2': { id:2, name:'b', even:true },
                '3': { id:3, name:'c', even:false },
                '4': { id:4, name:'d', even:true },
                '5': { id:5, name:'e', even:false },
                '6': { id:6, name:'f', even:true },
                'false': { id:5, name:'e', even:false },
                'true': { id:6, name:'f', even:true }
            };
            test.assertEquals(f(a, ['id', 'even'], true), b);
        });
    });
    describe('paginate', function() {
        var f = utils.array.paginate;
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('test array length 10 items per page -1', function() {
            test.assertEquals(f(a, 0), []);
        });
        it('test array length 10 items per page 0', function() {
            test.assertEquals(f(a, 0), []);
        });
        it('test array length 10 items per page 1', function() {
            test.assertEquals(f(a, 1), [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]]);
        });
        it('test array length 10 items per page 2', function() {
            test.assertEquals(f(a, 2), [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]);
        });
        it('test array length 10 items per page 3', function() {
            test.assertEquals(f(a, 3), [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
        });
        it('test array length 10 items per page 4', function() {
            test.assertEquals(f(a, 4), [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]]);
        });
        it('test array length 10 items per page 5', function() {
            test.assertEquals(f(a, 5), [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]);
        });
        it('test array length 10 items per page 6', function() {
            test.assertEquals(f(a, 6), [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9]]);
        });
        it('test array length 10 items per page 7', function() {
            test.assertEquals(f(a, 7), [[0, 1, 2, 3, 4, 5, 6], [7, 8, 9]]);
        });
        it('test array length 10 items per page 8', function() {
            test.assertEquals(f(a, 8), [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9]]);
        });
        it('test array length 10 items per page 9', function() {
            test.assertEquals(f(a, 9), [[0, 1, 2, 3, 4, 5, 6, 7, 8], [9]]);
        });
        it('test array length 10 items per page 10', function() {
            test.assertEquals(f(a, 10), [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]);
        });
        it('test array length 10 items per page 11', function() {
            test.assertEquals(f(a, 11), [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]);
        });
    });
    describe('shuffle', function() {
        var f = utils.array.shuffle;
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var b;
        var c = [];
        it('test array has same length', function() {
            b = f(a);
            test.assertEquals(b.length, a.length);
        });
        it('test array contains all items', function() {
            b = f(a);
            for (i = 0; i < a.length; i++) {
                test.assertTrue(b.indexOf(a[i]) > -1);
            }
        });
        it('test array contains all items once', function() {
            b = f(a);
            for (i = 0; i < a.length; i++) {
                test.assertEquals(b.indexOf(a[i]), b.lastIndexOf(a[i]));
            }
        });
        it('test array items order changed', function() {
            b = f(a);
            c = b.some(function(item){
                return (a.indexOf(item) != b.indexOf(item));
            });
            test.assertTrue(c);
        });
    });
    describe('reduce', function() {
        var f = utils.array.reduce;
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('test value', function() {
            var r = function(accumulator, value, index, list){
                return (accumulator + value);
            };
            test.assertEquals(f(a, r), 45);
        });
        it('test initial value', function() {
            var r = function(accumulator, value, index, list){
                return (accumulator + value);
            };
            test.assertEquals(f(a, r, 1), 46);
        });
        it('test index', function() {
            var r = function(accumulator, value, index, list){
                return (accumulator + index);
            };
            test.assertEquals(f(a, r), 45);
        });
    });
    describe('scroll', function() {
        var f = utils.array.scroll;
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('test scroll negative', function() {
            test.assertEquals(f(a, -0), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            test.assertEquals(f(a, -1), [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
            test.assertEquals(f(a, -2), [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]);
            test.assertEquals(f(a, -3), [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
            test.assertEquals(f(a, -4), [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
            test.assertEquals(f(a, -5), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
            test.assertEquals(f(a, -6), [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]);
            test.assertEquals(f(a, -7), [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
            test.assertEquals(f(a, -8), [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
            test.assertEquals(f(a, -9), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
            test.assertEquals(f(a, -10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            test.assertEquals(f(a, -11), [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
            test.assertEquals(f(a, -12), [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]);
            test.assertEquals(f(a, -13), [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
            test.assertEquals(f(a, -14), [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
            test.assertEquals(f(a, -15), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        });
        it('test scroll positive', function() {
            test.assertEquals(f(a, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
            test.assertEquals(f(a, 2), [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
            test.assertEquals(f(a, 3), [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
            test.assertEquals(f(a, 4), [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]);
            test.assertEquals(f(a, 5), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
            test.assertEquals(f(a, 6), [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
            test.assertEquals(f(a, 7), [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
            test.assertEquals(f(a, 8), [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]);
            test.assertEquals(f(a, 9), [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
            test.assertEquals(f(a, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            test.assertEquals(f(a, 11), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
            test.assertEquals(f(a, 12), [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
            test.assertEquals(f(a, 13), [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
            test.assertEquals(f(a, 14), [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]);
            test.assertEquals(f(a, 15), [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        });
        it('test scroll 0-1 length', function() {
            for (var i = -5; i <= 5; i++) {
                test.assertEquals(f([], i), []);
                test.assertEquals(f([1], i), [1]);
            }
        });
    });
    describe('sort', function() {
        var f = utils.array.sort;
        var s = utils.array.shuffle;
        var a, b;
        it('test array of numbers', function() {
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            b = s([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
            test.assertEquals(f(b), a);
        });
        it('test array of numbers and strings', function() {
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd'];
            b = s([9, 8, 'd', 7, 6, 'c', 5, 4, 'b', 3, 2, 'a', 1, 0]);
            test.assertEquals(f(b), a);
        });
        it('test array of objects on key', function() {
            a = [{ n:0 }, { n:1 }, { n:2 }, { n:3 }, { n:4 }, { n:5 }, { n:6 }, { n:7 }, { n:8 }, { n:9 }, { n:'a' }, { n:'b' }, { n:'c' }];
            b = s([{ n:'c' }, { n:'b' }, { n:'a' }, { n:9 }, { n:8 }, { n:7 }, { n:6 }, { n:5 }, { n:4 }, { n:3 }, { n:2 }, { n:1 }, { n:0 }]);
            test.assertEquals(f(b, 'n'), a);
        });
    });
    describe('unique', function() {
        var f = utils.array.unique;
        it('test array empty', function() {
            test.assertEquals(f([[], [], [], []]), [[]]);
        });
        it('test array', function() {
            test.assertEquals(f([[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [6, 7, 8, 9, 0], [6, 7, 8, 9, 0]]), [[0, 1, 2, 3, 4], [6, 7, 8, 9, 0]]);
        });
        it('test boolean', function() {
            test.assertEquals(f([true, false, true, false]), [true, false]);
        });
        it('test date', function() {
            var d1 = new Date();
            var d2 = new Date('2018/12/31');
            test.assertEquals(f([d1, d2, d1]), [d1, d2]);
        });
        it('test error', function() {
            var e1 = new Error('error 1');
            var e2 = new Error('error 2');
            test.assertEquals(f([e1, e1, e1, e2, e2, e2]), [e1, e2]);
        });
        it('test function', function() {
            var f1 = f;
            var f2 = function(){};
            test.assertEquals(f([f1, f2, f1, f2, f1, f2], false), [f1, f2]);
        });
        it('test nan', function() {
            test.assertEquals(f([NaN, NaN, NaN]), [NaN]);
        });
        it('test none', function() {
            test.assertEquals(f([null, undefined, NaN, null, undefined, NaN]), [null, undefined, NaN]);
        });
        it('test null', function() {
            test.assertEquals(f([null, null, null]), [null]);
        });
        it('test number', function() {
            test.assertEquals(f([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('test object empty', function() {
            test.assertEquals(f([{}, {}, {}]), [{}]);
        });
        it('test object', function() {
            test.assertEquals(f([{ a:1 }, { a:1 }, { a:1 }]), [{ a:1 }]);
            test.assertEquals(f([{ a:1, b:2 }, { a:1, b:null }, { a:1, b:null }]), [{ a:1, b:2 }, { a:1, b:null }]);
        });
        it('test regexp', function() {
            var re1 = /^$/;
            var re2 = /^[a-z]$/;
            test.assertEquals(f([re1, re2, re1, re2]), [re1, re2]);
        });
        it('test string empty', function() {
            test.assertEquals(f(['', '', '']), ['']);
            test.assertEquals(f(['', ' ', '  ']), ['', ' ', '  ']);
        });
        it('test string', function() {
            test.assertEquals(f(['a', 'a', 'b', 'b', 'c', 'c']), ['a', 'b', 'c']);
        });
        it('test undefined', function() {
            test.assertEquals(f([undefined, undefined, undefined]), [undefined]);
        });
    });
    describe('zip / unzip', function() {
        var z = utils.array.zip;
        var u = utils.array.unzip;
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var b = ['a', 'b', 'c', 'd', 'e', 'f'];
        var c = [true, false, true, false, true, undefined];
        var l = Math.min(a.length, b.length, c.length);
        var unzipped = [a.slice(0, l), b.slice(0, l), c.slice(0, l)];
        var zipped = [
            [0, 'a', true],
            [1, 'b', false],
            [2, 'c', true],
            [3, 'd', false],
            [4, 'e', true],
            [5, 'f', undefined]
        ];
        it('test zip', function() {
            test.assertEquals(z(a, b, c), zipped);
        });
        it('test unzip', function() {
            test.assertEquals(u(zipped), unzipped);
        });
        it('test zip/unzip', function() {
            test.assertEquals(u(z(a, b, c)), unzipped);
        });
        it('test unzip/zip', function() {
            test.assertEquals(z.apply(null, (u(zipped))), zipped);
        });
    });
});