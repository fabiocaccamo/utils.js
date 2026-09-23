import { rotate as arrayRotate } from './array.js';
import { hasOwnProp } from './object.js';
import { boolean } from './random.js';
import { isNone } from './type.js';

export function contains(str, occurrence) {
    return Boolean(str.includes(occurrence));
}

export function endsWith(str, search) {
    // if (String.prototype.endsWith) {
    //     return str.endsWith(search);
    // }
    return str.substring(str.length - search.length, str.length) === search;
}

export function icontains(str, occurrence) {
    return contains(str.toLowerCase(), occurrence.toLowerCase());
}

export function levenshteinDistance(a, b) {
    // taken from GitHub here:
    // https://gist.github.com/andrei-m/982927#gistcomment-586471
    // only the previous and the current rows of the matrix are needed
    let prev = Array.from({ length: a.length + 1 }, (_, j) => j);
    let curr = new Array(a.length + 1);
    for (let i = 1; i <= b.length; i++) {
        curr[0] = i;
        for (let j = 1; j <= a.length; j++) {
            curr[j] =
                b.charAt(i - 1) === a.charAt(j - 1)
                    ? prev[j - 1]
                    : Math.min(prev[j - 1] + 1, curr[j - 1] + 1, prev[j] + 1);
        }
        [prev, curr] = [curr, prev];
    }
    return prev[a.length];
}

export function levenshteinSimilarity(a, b) {
    const d = levenshteinDistance(a, b);
    const l = Math.max(a.length, b.length);

    return l === 0 ? 1.0 : 1.0 - d / l;
}

export function padLeft(str, len, char) {
    let i = str.length;
    while (i < len) {
        str = char + str;
        i++;
    }
    return str;
}

export function padRight(str, len, char) {
    let i = str.length;
    while (i < len) {
        str = str + char;
        i++;
    }
    return str;
}

export function padZeros(str, len) {
    return padLeft(String(str), len, '0');
}

function escapeRegex(str) {
    return String(str ?? '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function render(str, data, placeholderStart, placeholderEnd) {
    const escapedStart = escapeRegex(placeholderStart || '{{');
    const escapedEnd = escapeRegex(placeholderEnd || '}}');
    const pattern = `${escapedStart}[\\s]*([a-zA-Z0-9\\-\\_]+){1}[\\s]*${escapedEnd}`;
    const regex = new RegExp(pattern, 'g');
    data = data || {};
    // single pass: values are never parsed as placeholders or replacement patterns
    return str.replace(regex, (occurrence, key) => {
        const replacement = hasOwnProp(data, key) ? data[key] : undefined;
        return isNone(replacement) ? '' : String(replacement);
    });
}

export function replace(str, occurrence, replacement, caseSensitive) {
    const pattern = escapeRegex(occurrence);
    const flags = caseSensitive === false ? 'gi' : 'g';
    const regex = new RegExp(pattern, flags);
    const replacementStr = String(replacement);
    // use a function to avoid the special replacement patterns ($&, $1, $$, ...)
    return str.replace(regex, () => replacementStr);
}

export function reverse(str) {
    const chars = str.split('');
    chars.reverse();
    return chars.join('');
}

export function rotate(str, count) {
    let chars = str.split('');
    chars = arrayRotate(chars, count);
    return chars.join('');
}

// Transliteration table used by slugify, applied after the NFKD normalization
// (accented chars are decomposed and their combining marks removed, eg. 'é' -> 'e').
// It contains only the chars that NFKD does not reduce to ascii, with the values of Unidecode 1.4.0
// as used by python-slugify 8.0.4 (unidecode quotes removed), for these Unicode blocks:
// Latin-1 Supplement, Latin Extended-A/B, Spacing Modifier Letters, Greek, Cyrillic,
// Latin Extended Additional, General Punctuation, Currency Symbols.
// prettier-ignore
const SLUGIFY_CHARS = {
    // Latin-1 Supplement, Latin Extended-A/B
    '¢': 'C/', '£': 'PS', '¥': 'Y=', '§': 'SS', '©': '(c)', '\u00AD': '', '®': '(r)',
    '°': 'deg', '¶': 'P', 'Æ': 'AE', 'Ð': 'D', '×': 'x', 'Ø': 'O', 'Þ': 'Th', 'ß': 'ss',
    'æ': 'ae', 'ð': 'd', 'ø': 'o', 'þ': 'th', 'Đ': 'D', 'đ': 'd', 'Ħ': 'H', 'ħ': 'h',
    'ı': 'i', 'ĸ': 'k', 'Ł': 'L', 'ł': 'l', 'Ŋ': 'NG', 'ŋ': 'ng', 'Œ': 'OE', 'œ': 'oe',
    'Ŧ': 'T', 'ŧ': 't', 'ƀ': 'b', 'Ɓ': 'B', 'Ƃ': 'B', 'ƃ': 'b', 'Ƅ': '6', 'ƅ': '6',
    'Ɔ': 'O', 'Ƈ': 'C', 'ƈ': 'c', 'Ɖ': 'D', 'Ɗ': 'D', 'Ƌ': 'D', 'ƌ': 'd', 'ƍ': 'd',
    'Ǝ': '3', 'Ɛ': 'E', 'Ƒ': 'F', 'ƒ': 'f', 'Ɠ': 'G', 'Ɣ': 'G', 'ƕ': 'hv', 'Ɩ': 'I',
    'Ɨ': 'I', 'Ƙ': 'K', 'ƙ': 'k', 'ƚ': 'l', 'ƛ': 'l', 'Ɯ': 'W', 'Ɲ': 'N', 'ƞ': 'n',
    'Ɵ': 'O', 'Ƣ': 'OI', 'ƣ': 'oi', 'Ƥ': 'P', 'ƥ': 'p', 'Ʀ': 'YR', 'Ƨ': '2', 'ƨ': '2',
    'Ʃ': 'SH', 'ƪ': 'sh', 'ƫ': 't', 'Ƭ': 'T', 'ƭ': 't', 'Ʈ': 'T', 'Ʊ': 'Y', 'Ʋ': 'V',
    'Ƴ': 'Y', 'ƴ': 'y', 'Ƶ': 'Z', 'ƶ': 'z', 'Ʒ': 'ZH', 'Ƹ': 'ZH', 'ƹ': 'zh', 'ƺ': 'zh',
    'ƻ': '2', 'Ƽ': '5', 'ƽ': '5', 'ƾ': 'ts', 'ƿ': 'w', 'Ǥ': 'G', 'ǥ': 'g', 'Ƕ': 'HV',
    'Ƿ': 'W', 'Ȝ': 'Y', 'ȝ': 'y', 'Ƞ': 'N', 'ȡ': 'd', 'Ȣ': 'OU', 'ȣ': 'ou', 'Ȥ': 'Z',
    'ȥ': 'z', 'ȴ': 'l', 'ȵ': 'n', 'ȶ': 't', 'ȷ': 'j', 'ȸ': 'db', 'ȹ': 'qp', 'Ⱥ': 'A',
    'Ȼ': 'C', 'ȼ': 'c', 'Ƚ': 'L', 'Ⱦ': 'T', 'ȿ': 's', 'ɀ': 'z', 'Ɂ': '', 'ɂ': '',
    'Ƀ': 'B', 'Ʉ': 'U', 'Ɇ': 'E', 'ɇ': 'e', 'Ɉ': 'J', 'ɉ': 'j', 'Ɋ': 'q', 'ɋ': 'q',
    'Ɍ': 'R', 'ɍ': 'r', 'Ɏ': 'Y', 'ɏ': 'y',
    // Spacing Modifier Letters
    'ʹ': '', 'ʼ': '', 'ʿ': '', '˅': 'V', 'ˇ': 'V', 'ˈ': '', '˓': '', '˕': 'V', '˞': 'R',
    '˟': 'X', '˥': '', '˦': '', '˧': '', '˨': '', '˩': '', '˪': '', '˫': '', 'ˬ': 'V',
    '˯': '', '˰': '', '˱': '', '˲': '', '˳': '', '˴': '', '˵': '', '˶': '', '˷': '',
    '˸': '', '˹': '', '˺': '', '˻': '', '˼': '', '˽': '', '˾': '', '˿': '',
    // Greek
    'Ͱ': '', 'ͱ': '', 'Ͳ': '', 'ͳ': '', 'Ͷ': '', 'ͷ': '', 'ͻ': '', 'ͼ': '', 'ͽ': '',
    'Ϳ': '', 'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'E',
    'Θ': 'Th', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'Ks', 'Ο': 'O',
    'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'U', 'Φ': 'Ph', 'Χ': 'Kh', 'Ψ': 'Ps',
    'Ω': 'O', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'e',
    'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o',
    'π': 'p', 'ρ': 'r', 'ς': 's', 'σ': 's', 'τ': 't', 'υ': 'u', 'φ': 'ph', 'χ': 'kh',
    'ψ': 'ps', 'ω': 'o', 'Ϗ': '', 'Ϙ': '', 'ϙ': '', 'Ϛ': 'St', 'ϛ': 'st', 'Ϝ': 'W',
    'ϝ': 'w', 'Ϟ': 'Q', 'ϟ': 'q', 'Ϡ': 'Sp', 'ϡ': 'sp', 'Ϣ': 'Sh', 'ϣ': 'sh', 'Ϥ': 'F',
    'ϥ': 'f', 'Ϧ': 'Kh', 'ϧ': 'kh', 'Ϩ': 'H', 'ϩ': 'h', 'Ϫ': 'G', 'ϫ': 'g', 'Ϭ': 'CH',
    'ϭ': 'ch', 'Ϯ': 'Ti', 'ϯ': 'ti', 'ϳ': 'j', '϶': '', 'Ϸ': '', 'ϸ': '', 'Ϻ': '',
    'ϻ': '', 'ϼ': '', 'Ͻ': '', 'Ͼ': '', 'Ͽ': '',
    // Cyrillic
    'Ђ': 'Dj', 'Є': 'Ie', 'Ѕ': 'Dz', 'І': 'I', 'Ј': 'J', 'Љ': 'Lj', 'Њ': 'Nj', 'Ћ': 'Tsh',
    'Џ': 'Dzh', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
    'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch',
    'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Iu', 'Я': 'Ia',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'iu', 'я': 'ia', 'ђ': 'dj',
    'є': 'ie', 'ѕ': 'dz', 'і': 'i', 'ј': 'j', 'љ': 'lj', 'њ': 'nj', 'ћ': 'tsh',
    'џ': 'dzh', 'Ѡ': 'O', 'ѡ': 'o', 'Ѣ': 'E', 'ѣ': 'e', 'Ѥ': 'Ie', 'ѥ': 'ie', 'Ѧ': 'E',
    'ѧ': 'e', 'Ѩ': 'Ie', 'ѩ': 'ie', 'Ѫ': 'O', 'ѫ': 'o', 'Ѭ': 'Io', 'ѭ': 'io', 'Ѯ': 'Ks',
    'ѯ': 'ks', 'Ѱ': 'Ps', 'ѱ': 'ps', 'Ѳ': 'F', 'ѳ': 'f', 'Ѵ': 'Y', 'ѵ': 'y', 'Ѹ': 'u',
    'ѹ': 'u', 'Ѻ': 'O', 'ѻ': 'o', 'Ѽ': 'O', 'ѽ': 'o', 'Ѿ': 'Ot', 'ѿ': 'ot', 'Ҁ': 'Q',
    'ҁ': 'q', '҂': '*1000*', '҈': '*100.000*', '҉': '*1.000.000*', 'Ҋ': '', 'ҋ': '',
    'Ҏ': 'R', 'ҏ': 'r', 'Ґ': 'G', 'ґ': 'g', 'Ғ': 'G', 'ғ': 'g', 'Ҕ': 'G', 'ҕ': 'g',
    'Җ': 'Zh', 'җ': 'zh', 'Ҙ': 'Z', 'ҙ': 'z', 'Қ': 'K', 'қ': 'k', 'Ҝ': 'K', 'ҝ': 'k',
    'Ҟ': 'K', 'ҟ': 'k', 'Ҡ': 'K', 'ҡ': 'k', 'Ң': 'N', 'ң': 'n', 'Ҥ': 'Ng', 'ҥ': 'ng',
    'Ҧ': 'P', 'ҧ': 'p', 'Ҩ': 'Kh', 'ҩ': 'kh', 'Ҫ': 'S', 'ҫ': 's', 'Ҭ': 'T', 'ҭ': 't',
    'Ү': 'U', 'ү': 'u', 'Ұ': 'U', 'ұ': 'u', 'Ҳ': 'Kh', 'ҳ': 'kh', 'Ҵ': 'Tts', 'ҵ': 'tts',
    'Ҷ': 'Ch', 'ҷ': 'ch', 'Ҹ': 'Ch', 'ҹ': 'ch', 'Һ': 'H', 'һ': 'h', 'Ҽ': 'Ch', 'ҽ': 'ch',
    'Ҿ': 'Ch', 'ҿ': 'ch', 'Ӄ': 'K', 'ӄ': 'k', 'Ӆ': '', 'ӆ': '', 'Ӈ': 'N', 'ӈ': 'n',
    'Ӊ': '', 'ӊ': '', 'Ӌ': 'Ch', 'ӌ': 'ch', 'Ӎ': '', 'ӎ': '', 'ӏ': '', 'Ӕ': 'Ae',
    'ӕ': 'ae', 'Ӡ': 'Dz', 'ӡ': 'dz', 'Ө': 'O', 'ө': 'o', 'Ӷ': '', 'ӷ': '', 'Ӻ': '',
    'ӻ': '', 'Ӽ': '', 'ӽ': '', 'Ӿ': '', 'ӿ': '',
    // Latin Extended Additional
    'ẜ': '', 'ẝ': '', 'ẞ': 'SS', 'ẟ': '', 'Ỻ': '', 'ỻ': '', 'Ỽ': '', 'ỽ': '', 'Ỿ': '',
    'ỿ': '',
    // General Punctuation
    '\u200C': '', '\u200D': '', '\u200E': '', '\u200F': '', '‘': '', '’': '', '‛': '',
    '\u202A': '', '\u202B': '', '\u202C': '', '\u202D': '', '\u202E': '', '‰': '%0',
    '‱': '%00', '′': '', '⁋': 'PP', '⁏': '', '⁐': '', '⁑': '', '⁔': '', '⁕': '', '⁖': '',
    '⁘': '', '⁙': '', '⁚': '', '⁛': '', '⁜': '', '⁝': '', '⁞': '', '\u2060': '',
    '\u2061': '', '\u2062': '', '\u2063': '', '\u2064': '', '\u2066': '', '\u2067': '',
    '\u2068': '', '\u2069': '', '\u206A': '', '\u206B': '', '\u206C': '', '\u206D': '',
    '\u206E': '', '\u206F': '',
    // Currency Symbols
    '₠': 'ECU', '₡': 'CL', '₢': 'Cr', '₣': 'FF', '₤': 'L', '₥': 'mil', '₦': 'N',
    '₧': 'Pts', '₩': 'W', '₪': 'NS', '₫': 'D', '€': 'EUR', '₭': 'K', '₮': 'T', '₯': 'Dr',
    '₰': 'Pf', '₱': 'P', '₲': 'G', '₳': 'A', '₴': 'UAH', '₵': 'C|', '₶': 'L', '₷': 'Sm',
    '₸': 'T', '₹': 'Rs', '₺': 'L', '₻': 'M', '₼': 'm', '₽': 'R', '₾': 'l', '₿': 'BTC',
    '⃀': '',
    // Other chars produced by NFKD
    'ɣ': 'g', 'ɦ': 'h', 'ɹ': 'r', 'ɻ': 'r', 'ʁ': 'R', 'ʒ': 'Z'
};

function truncateSlug(str, maxLength, wordBoundary, separator) {
    // same algorithm of python-slugify smart_truncate (with save_order = false)
    if (str.length < maxLength) {
        return str;
    }
    if (!wordBoundary) {
        return str.substring(0, maxLength).replace(/^-+|-+$/g, '');
    }
    if (!str.includes(separator)) {
        return str.substring(0, maxLength);
    }
    let truncated = '';
    let nextLength;
    for (const word of str.split(separator)) {
        if (!word) {
            continue;
        }
        nextLength = truncated.length + word.length;
        if (nextLength < maxLength) {
            truncated += word + separator;
        } else if (nextLength === maxLength) {
            truncated += word;
            break;
        }
    }
    if (!truncated) {
        truncated = str.substring(0, maxLength);
    }
    return truncated.replace(/^-+|-+$/g, '');
}

/**
 * Converts a value to a URL friendly slug.
 *
 * The output is the same of python-slugify (8.0.4, with Unidecode) with the same options,
 * for the scripts covered by the transliteration table: Latin (including Vietnamese),
 * Greek and Cyrillic.
 *
 * Known divergences from python-slugify:
 * - chars of other scripts (eg. CJK, Arabic, Hebrew, Armenian) are not transliterated,
 *   they are dropped and act as separators: 'Noto Sans 日本' -> 'noto-sans'
 *   (python-slugify returns 'noto-sans-ri-ben');
 * - HTML entities are not decoded (eg. '&amp;', '&#233;').
 *
 * @param {*} value The value to slugify, converted with `String(value ?? '')`.
 * @param {Object} [options]
 * @param {string} [options.separator='-'] The separator that replaces every run of non alphanumeric chars.
 * @param {boolean} [options.lowercase=true] Convert the slug to lowercase.
 * @param {number} [options.maxLength=0] The max length of the slug, 0 means unlimited.
 * @param {boolean} [options.wordBoundary=false] When truncating, keep only full words.
 * @returns {string} The slug.
 */
export function slugify(value, options) {
    const {
        separator = '-',
        lowercase = true,
        maxLength = 0,
        wordBoundary = false,
    } = options || {};
    const sep = '-';

    // decompose accented chars into base char + combining marks (eg. 'é' -> 'e' + '\u0301')
    let str = String(value ?? '').normalize('NFKD');

    // transliterate chars for their ascii equivalent, in a single pass
    let transliterated = '';
    let replacement;
    for (const char of str) {
        replacement = SLUGIFY_CHARS[char];
        transliterated += replacement === undefined ? char : replacement;
    }
    // remove the combining marks
    str = transliterated.replace(/\p{M}/gu, '');

    if (lowercase) {
        str = str.toLowerCase();
    }
    // remove thousands separators between digits, eg. '1,000' -> '1000'
    str = str.replace(/(\d),(?=\d)/g, '$1');
    // replace every run of non alphanumeric chars with a single separator
    str = str.replace(/[^A-Za-z0-9]+/g, sep);
    // strip separator from the beginning and from the end
    str = str.replace(/^-|-$/g, '');

    if (maxLength > 0) {
        str = truncateSlug(str, maxLength, wordBoundary, sep);
    }
    if (separator !== sep) {
        str = str.split(sep).join(separator);
    }
    return str;
}

export function startsWith(str, search) {
    // if (String.prototype.startsWith) {
    //     return str.startsWith(search);
    // }
    return str.substr(0, search.length) === search;
}

export function toConstantCase(str) {
    return str.replace(/[\s]/gm, '_').toUpperCase();
}

export function toRandomCase(str) {
    return str.replace(/./gm, (match) => {
        return boolean() ? match.toUpperCase() : match.toLowerCase();
    });
}

export function toTitleCase(str, toLowerCaseRest) {
    return str.replace(/[^\'\‘\’\`\-\s]+/gm, (match) => {
        return toUpperCaseFirst(match, toLowerCaseRest);
    });
}

export function toUpperCaseFirst(str, toLowerCaseRest) {
    if (str.length === 0) {
        return str;
    }
    const f = str.substr(0, 1).toUpperCase();
    const r = str.length > 1 ? str.substr(1) : '';
    return f + (toLowerCaseRest === true ? r.toLowerCase() : r);
}

export function trim(str) {
    // return str.replace(/^[\s]+|(?<!\s)[\s]+$/gm, '');
    return str.trim();
}

export function trimLeft(str) {
    // return str.replace(/^\s+/gm, '');
    return str.trimStart();
}

export function trimRight(str) {
    // return str.replace(/\s+$/gm, '');
    return str.trimEnd();
}

export default {
    contains,
    endsWith,
    icontains,
    levenshteinDistance,
    levenshteinSimilarity,
    padLeft,
    padRight,
    padZeros,
    render,
    replace,
    reverse,
    rotate,
    slugify,
    startsWith,
    toConstantCase,
    toRandomCase,
    toTitleCase,
    toUpperCaseFirst,
    trim,
    trimLeft,
    trimRight,
};
