var utils = require('../dist/utils.js');
var test = utils.test;

describe('json', function() {
    var j = utils.json;
    var d = j.decode;
    var e = j.encode;
    describe('decode', function() {
        it('test decode empty', function() {
            test.assertEqual(d("\"\""), '');
        });
        it('test decode array', function() {
            test.assertEqual(d("[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]"), [0, 1, 2, 3, '', 'a', 'b', 'c', null, null, null]);
        });
        it('test decode object', function() {
            test.assertEqual(d("{\"k\":[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]}"), { k:[0, 1, 2, 3, '', 'a', 'b', 'c', null, null, null] });
        });
        it('test decode utf8 simple', function() {
            test.assertEqual(d("[\"✓ ok\"]"), ['✓ ok']);
        });
        it('test decode utf8', function() {
            test.assertEqual(d("[\"観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。\"]"), ['観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。']);
        });
        it('test decode/encode utf8 simple', function() {
            var s = '✓ ok';
            test.assertEqual(d(e([s])), [s]);
        });
        it('test decode/encode utf8 complex', function() {
            var s = '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            test.assertEqual(d(e([s])), [s]);
        });
        it('test decode unquoted object', function() {
            test.assertEqual(d("{&quot;a&quot;:1,&quot;b&quot;:2,&quot;c&quot;:3}"), { a:1, b:2, c:3 });
        });
        it('test decode html entities to avoid "SyntaxError: Unexpected token B in JSON"', function() {
            test.assertEqual(d("{\"text\":\"&quot;Fabio&quot; &amp; &quot;Caccamo&quot;\"}"), { text:"&quot;Fabio&quot; &amp; &quot;Caccamo&quot;" });
            test.assertEqual(d("{\"text\":\"Llanta de aleación 20&quot; Bicolor (1 ud.)\"}"), { text:"Llanta de aleación 20&quot; Bicolor (1 ud.)" });
        });
    });
    describe('encode', function() {
        it('test encode empty', function() {
            test.assertEqual(e(''), "\"\"");
        });
        it('test encode array', function() {
            test.assertEqual(e([0, 1, 2, 3, '', 'a', 'b', 'c', null, undefined, NaN]), "[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]");
        });
        it('test encode object', function() {
            test.assertEqual(e({ k:[0, 1, 2, 3, '', 'a', 'b', 'c', null, undefined, NaN] }), "{\"k\":[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]}");
        });
        it('test encode/decode object', function() {
            test.assertEqual(e(d("{\"k\":[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]}")), "{\"k\":[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]}");
        });
        it('test encode utf8 simple', function() {
            test.assertEqual(e(['✓ ok']), "[\"✓ ok\"]");
        });
        it('test encode utf8', function() {
            test.assertEqual(e(['観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。']), "[\"観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。\"]");
        });
        it('test encode base64', function() {
            test.assertEqual(e(['観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。']), "[\"観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。\"]");
        });
    });
});