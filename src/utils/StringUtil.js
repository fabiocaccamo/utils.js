/** global: ArrayUtil */
/** global: RandomUtil */
/** global: StringUtil */
/** global: TypeUtil */

StringUtil = {

    contains: function(str, occurrence)
    {
        return Boolean(str.indexOf(occurrence) > -1);
    },

    endsWith: function(str, search)
    {
        // if (String.prototype.endsWith) {
        //     return str.endsWith(search);
        // }
        return (str.substring((str.length - search.length), str.length) === search);
    },

    icontains: function(str, occurrence)
    {
        return StringUtil.contains(str.toLowerCase(), occurrence.toLowerCase());
    },

    levenshteinDistance: function(a, b)
    {
        // taken from GitHub here:
        // https://gist.github.com/andrei-m/982927#gistcomment-586471
        var m = [];
        for (var i = 0; i <= b.length; i++) {
            m[i] = [i];
            if (i === 0) {
                continue;
            }
            for (var j = 0; j <= a.length; j++) {
                m[0][j] = j;
                if (j === 0) {
                    continue;
                }
                m[i][j] = b.charAt(i - 1) === a.charAt(j - 1) ? m[i - 1][j - 1] : Math.min(
                    m[i-1][j-1] + 1,
                    m[i][j-1] + 1,
                    m[i-1][j] + 1
                );
            }
        }
        return m[b.length][a.length];
    },

    levenshteinSimilarity: function(a, b)
    {
        var d = StringUtil.levenshteinDistance(a, b);
        var l = Math.max(a.length, b.length);

        return ((l === 0) ? 1.0 : (1.0 - (d / l)));
    },

    padLeft: function(str, len, char)
    {
        var i = str.length;
        while (i < len) {
            str = (char + str);
            i++;
        }
        return str;
    },

    padRight: function(str, len, char)
    {
        var i = str.length;
        while (i < len) {
            str = (str + char);
            i++;
        }
        return str;
    },

    padZeros: function(str, len)
    {
        return StringUtil.padLeft(String(str), len, '0');
    },

    render: function(str, data, placeholderStart, placeholderEnd)
    {
        var pattern = ((placeholderStart || '{{') + '[\\s]*([a-zA-Z0-9\\-\\_]+){1}[\\s]*' + (placeholderEnd || '}}'));
        var regex = new RegExp(pattern, 'g');
        var matches = Array.from(str.matchAll(regex));
        var occurrence, replacement;
        data = (data || {});
        matches.forEach(function(match) {
            occurrence = match[0];
            replacement = data[match[1]];
            if (TypeUtil.isNone(replacement)) {
                replacement = '';
            }
            str = StringUtil.replace(str, occurrence, replacement);
        });
        return str;
    },

    replace: function(str, occurrence, replacement, caseSensitive)
    {
        var pattern = occurrence.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var flags = (caseSensitive === false ? 'gi' : 'g');
        var regex = new RegExp(pattern, flags);
        return str.replace(regex, replacement);
    },

    reverse: function(str)
    {
        var chars = str.split('');
        chars.reverse();
        return chars.join('');
    },

    rotate: function(str, count)
    {
        var chars = str.split('');
        chars = ArrayUtil.rotate(chars, count);
        return chars.join('');
    },

    slugify: function(str)
    {
        var sep = '-';
        var chars = {
            // Latin
            'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
            'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
            'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
            'Õ': 'O', 'Ö': 'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U',
            'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss', 'à': 'a', 'á': 'a',
            'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e',
            'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
            'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
            'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u',
            'ý': 'y', 'þ': 'th', 'ÿ': 'y', 'ẞ': 'SS', 'œ': 'oe', 'Œ': 'OE',
            // Greek
            'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h',
            'θ': '8', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3',
            'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f',
            'χ': 'x', 'ψ': 'ps', 'ω': 'w', 'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o',
            'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's', 'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y',
            'ΐ': 'i', 'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z',
            'Η': 'H', 'Θ': '8', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N',
            'Ξ': '3', 'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y',
            'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W', 'Ά': 'A', 'Έ': 'E', 'Ί': 'I',
            'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I', 'Ϋ': 'Y',
            // Turkish
            'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I', 'ğ': 'g', 'Ğ': 'G',
            // Russian
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
            'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
            'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': 'u',
            'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B',
            'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z',
            'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
            'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H',
            'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': 'U', 'Ы': 'Y',
            'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
            // Ukranian
            'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
            'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',
            // Czech
            'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's',
            'ť': 't', 'ů': 'u', 'ž': 'z', 'Č': 'C', 'Ď': 'D', 'Ě': 'E',
            'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U', 'Ž': 'Z',
            // Polish
            'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ś': 's',
            'ź': 'z', 'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L',
            'Ń': 'N', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
            // Latvian
            'ā': 'a', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l',
            'ņ': 'n', 'ū': 'u', 'Ā': 'A', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i',
            'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N', 'Ū': 'u'
        };

        // transliterate non-english characters for their english equivalent
        for (var i = 0, len = str.length; i < len; i++) {
            if (chars[str.charAt(i)]) {
                str = str.replace(str.charAt(i), chars[str.charAt(i)]);
            }
        }

        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9]/gm, sep);
        // replace multiple sep with single sep
        str = str.replace(/[\-]+/gm, sep);
        // strip sep from the beginning and from the end
        str = str.replace(/^[\-]|[\-]$/gm, '');
        return str;
    },

    startsWith: function(str, search)
    {
        // if (String.prototype.startsWith) {
        //     return str.startsWith(search);
        // }
        return (str.substr(0, search.length) === search);
    },

    toConstantCase: function(str)
    {
        return str.replace(/[\s]/gm, '_').toUpperCase();
    },

    toRandomCase: function(str)
    {
        return str.replace(/./gm, function(match) {
            return (RandomUtil.boolean() ? match.toUpperCase() : match.toLowerCase());
        });
    },

    toTitleCase: function(str, toLowerCaseRest)
    {
        return str.replace(/[\w]+/gm, function(match) {
            return StringUtil.toUpperCaseFirst(match, toLowerCaseRest);
        });
    },

    toUpperCaseFirst: function(str, toLowerCaseRest)
    {
        if (str.length === 0) {
            return str;
        }
        var f = str.substr(0, 1).toUpperCase();
        var r = (str.length > 1 ? str.substr(1) : '');
        return (f + ((toLowerCaseRest === true) ? r.toLowerCase() : r));
    },

    trim: function(str)
    {
        // if (String.prototype.trim) {
        //     return str.trim();
        // }
        return str.replace(/^[\s]+|[\s]+$/gm, '');
    },

    trimLeft: function(str)
    {
        // if (String.prototype.trimStart) {
        //     return str.trimStart();
        // }
        return str.replace(/^[\s]+/gm, '');
    },

    trimRight: function(str)
    {
        // if (String.prototype.trimEnd) {
        //     return str.trimEnd();
        // }
        return str.replace(/[\s]+$/gm, '');
    }

};