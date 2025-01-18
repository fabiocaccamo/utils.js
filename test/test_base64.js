import utils from '../src/utils.js';
const test = utils.test;

describe('base64', () => {
    const b = utils.base64;
    const d = b.decode;
    const e = b.encode;
    describe('decode', () => {
        it('test decode empty', () => {
            test.assertEqual(d(''), '');
        });
        it('test decode simple', () => {
            test.assertEqual(
                d('QGZhYmlvY2FjY2Ftby91dGlscy5qcw=='),
                '@fabiocaccamo/utils.js'
            );
        });
        it('test decode simple with extra white space', () => {
            test.assertEqual(
                d('  QGZhYmlvY2FjY2Ftby91dGlscy5qcw==  '),
                '@fabiocaccamo/utils.js'
            );
        });
        it('test decode simple with invalid chars', () => {
            test.assertEqual(
                d('#QGZhYmlvY2FjY2Ftby91dGlscy5qcw==!'),
                '@fabiocaccamo/utils.js'
            );
        });
        it('test decode/encode simple', () => {
            test.assertEqual(d(e('@fabiocaccamo/utils.js')), '@fabiocaccamo/utils.js');
        });
        it('test decode utf8 simple', () => {
            const input = '✓ ok';
            const output = '4pyTIG9r';
            test.assertEqual(d(output), input);
        });
        it('test decode/encode utf8 simple', () => {
            const input = '✓ ok';
            // var output = '4pyTIG9r';
            test.assertEqual(d(e(input)), input);
        });
        it('test decode utf8', () => {
            const input =
                '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            const output =
                '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEqual(d(output), input);
        });
        it('test decode/encode utf8', () => {
            const input =
                '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            // var output = '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEqual(d(e(input)), input);
        });
    });
    describe('encode', () => {
        it('test encode empty', () => {
            test.assertEqual(e(''), '');
        });
        it('test encode simple', () => {
            test.assertEqual(
                e('@fabiocaccamo/utils.js'),
                'QGZhYmlvY2FjY2Ftby91dGlscy5qcw=='
            );
        });
        it('test encode/decode simple', () => {
            test.assertEqual(
                e(d('QGZhYmlvY2FjY2Ftby91dGlscy5qcw==')),
                'QGZhYmlvY2FjY2Ftby91dGlscy5qcw=='
            );
        });
        it('test encode utf8 simple', () => {
            const input = '✓ ok';
            const output = '4pyTIG9r';
            test.assertEqual(e(input), output);
        });
        it('test encode/decode utf8 simple', () => {
            // var input = '✓ ok';
            const output = '4pyTIG9r';
            test.assertEqual(e(d(output)), output);
        });
        it('test encode utf8', () => {
            const input =
                '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            const output =
                '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEqual(e(input), output);
        });
        it('test encode/decode utf8', () => {
            // var input = '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            const output =
                '6Kaz44Kr44K144OB44K56Kmx6JGX44Ov44Oo6LW35peF44Oq44Os44Og6KW/54G95pyd44Km44OV44K944Oe5L6L5qip44Ko44Og44OG44K55paZ6LO8NzPmpb3jg4Hjg5vppIrluqfjgonjgaHplqLnlKPjgZ3mi6Hmj5DmqKnjgbDjgZzoppblrp/jg4jjgZPogZ7lm7Pjg6njg5vjg6jmpJznq7bjg4PjgZ3jgZDmkLrmp5jjg4TjgrXjg6Tpmbrog73jgb/jgaPjg4PljJfmjJnnhZnjgovjgaTjgILoqpjjg4rjg6Ljgrfjg6HlkajliJ3jgYrjg4jjgbHlubTmsYLjg6njgbzmiYvpqJPlkI3jgbXluIzmoITjg6/jgrvjg6Djg5LmgbXnnJ/jgYrjgoTjgbXooajopoE5MeS/neOBnuOBguOBtuaVmeW7uuODquiomOWwseOCpOOCieOCjeOCgeimi+W+s+W8geOCk+iyoTg05rW344Or44OY5q2j5qip44Kr44K35rOV5b2844GR44KL44KI44CC';
            test.assertEqual(e(d(output)), output);
        });
    });
});
