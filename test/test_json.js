import utils from '../src/utils.js';
const test = utils.test;

describe('json', () => {
    const j = utils.json;
    const d = j.decode;
    const e = j.encode;
    describe('decode', () => {
        it('test decode empty', () => {
            test.assertEqual(d('""'), '');
        });
        it('test decode array', () => {
            test.assertEqual(d('[0,1,2,3,"","a","b","c",null,null,null]'), [
                0,
                1,
                2,
                3,
                '',
                'a',
                'b',
                'c',
                null,
                null,
                null,
            ]);
        });
        it('test decode object', () => {
            test.assertEqual(d('{"k":[0,1,2,3,"","a","b","c",null,null,null]}'), {
                k: [0, 1, 2, 3, '', 'a', 'b', 'c', null, null, null],
            });
        });
        it('test decode utf8 simple', () => {
            test.assertEqual(d('["✓ ok"]'), ['✓ ok']);
        });
        it('test decode utf8', () => {
            test.assertEqual(
                d(
                    '["観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。"]'
                ),
                [
                    '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。',
                ]
            );
        });
        it('test decode/encode utf8 simple', () => {
            const s = '✓ ok';
            test.assertEqual(d(e([s])), [s]);
        });
        it('test decode/encode utf8 complex', () => {
            const s =
                '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。';
            test.assertEqual(d(e([s])), [s]);
        });
        it('test decode unquoted object', () => {
            test.assertEqual(d('{&quot;a&quot;:1,&quot;b&quot;:2,&quot;c&quot;:3}'), {
                a: 1,
                b: 2,
                c: 3,
            });
        });
        it('test decode html entities to avoid "SyntaxError: Unexpected token B in JSON"', () => {
            test.assertEqual(
                d('{"text":"&quot;Fabio&quot; &amp; &quot;Caccamo&quot;"}'),
                { text: '&quot;Fabio&quot; &amp; &quot;Caccamo&quot;' }
            );
            test.assertEqual(
                d('{"text":"Llanta de aleación 20&quot; Bicolor (1 ud.)"}'),
                { text: 'Llanta de aleación 20&quot; Bicolor (1 ud.)' }
            );
        });
    });
    describe('encode', () => {
        it('test encode empty', () => {
            test.assertEqual(e(''), '""');
        });
        it('test encode array', () => {
            test.assertEqual(
                e([0, 1, 2, 3, '', 'a', 'b', 'c', null, undefined, NaN]),
                '[0,1,2,3,"","a","b","c",null,null,null]'
            );
        });
        it('test encode object', () => {
            test.assertEqual(
                e({ k: [0, 1, 2, 3, '', 'a', 'b', 'c', null, undefined, NaN] }),
                '{"k":[0,1,2,3,"","a","b","c",null,null,null]}'
            );
        });
        it('test encode/decode object', () => {
            test.assertEqual(
                e(d('{"k":[0,1,2,3,"","a","b","c",null,null,null]}')),
                '{"k":[0,1,2,3,"","a","b","c",null,null,null]}'
            );
        });
        it('test encode utf8 simple', () => {
            test.assertEqual(e(['✓ ok']), '["✓ ok"]');
        });
        it('test encode utf8', () => {
            test.assertEqual(
                e([
                    '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。',
                ]),
                '["観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。"]'
            );
        });
        it('test encode base64', () => {
            test.assertEqual(
                e([
                    '観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。',
                ]),
                '["観カサチス話著ワヨ起旅リレム西災朝ウフソマ例権エムテス料購73楽チホ養座らち関産そ拡提権ばぜ視実トこ聞図ラホヨ検競ッそぐ携様ツサヤ険能みっッ北挙煙るつ。誘ナモシメ周初おトぱ年求ラぼ手験名ふ希栄ワセムヒ恵真おやふ表要91保ぞあぶ教建リ記就イらろめ見徳弁ん財84海ルヘ正権カシ法彼けるよ。"]'
            );
        });
    });
});
