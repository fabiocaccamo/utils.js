var utils = require('../dist/utils.js');
var test = utils.test;

describe('base64', function() {
    var b = utils.base64;
    var d = b.decode;
    var e = b.encode;
    describe('decode', function() {
        it('test decode empty', function() {
            test.assertEquals(d(''), '');
        });
        it('test decode simple', function() {
            test.assertEquals(d('QGZhYmlvY2FjY2Ftby91dGlscy5qcw=='), '@fabiocaccamo/utils.js');
        });
        it('test decode simple with extra white space', function() {
            test.assertEquals(d('  QGZhYmlvY2FjY2Ftby91dGlscy5qcw==  '), '@fabiocaccamo/utils.js');
        });
        it('test decode simple with invalid chars', function() {
            test.assertEquals(d('#QGZhYmlvY2FjY2Ftby91dGlscy5qcw==!'), '@fabiocaccamo/utils.js');
        });
        it('test decode/encode simple', function() {
            test.assertEquals(d(e('@fabiocaccamo/utils.js')), '@fabiocaccamo/utils.js');
        });
        it('test decode utf8 simple', function() {
            var input = '✓ ok';
            var output = '4pyTIG9r';
            test.assertEquals(d(output), input);
        });
        it('test decode/encode utf8 simple', function() {
            var input = '✓ ok';
            // var output = '4pyTIG9r';
            test.assertEquals(d(e(input)), input);
        });
        it('test decode utf8', function() {
            var input = '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            var output = '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEquals(d(output), input);
        });
        it('test decode/encode utf8', function() {
            var input = '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            // var output = '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEquals(d(e(input)), input);
        });
    });
    describe('encode', function() {
        var f = b.encode;
        it('test encode empty', function() {
            test.assertEquals(e(''), '');
        });
        it('test encode simple', function() {
            test.assertEquals(e('@fabiocaccamo/utils.js'), 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==');
        });
        it('test encode/decode simple', function() {
            test.assertEquals(e(d('QGZhYmlvY2FjY2Ftby91dGlscy5qcw==')), 'QGZhYmlvY2FjY2Ftby91dGlscy5qcw==');
        });
        it('test encode utf8 simple', function() {
            var input = '✓ ok';
            var output = '4pyTIG9r';
            test.assertEquals(e(input), output);
        });
        it('test encode/decode utf8 simple', function() {
            // var input = '✓ ok';
            var output = '4pyTIG9r';
            test.assertEquals(e(d(output)), output);
        });
        it('test encode utf8', function() {
            var input = '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            var output = '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEquals(e(input), output);
        });
        it('test encode/decode utf8', function() {
            // var input = '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            var output = '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEquals(e(d(output)), output);
        });
    });
});