var StringUtil = {

    // endsWith
    // reverse
    // startsWith
    // toRandomCase
    // toUpperCaseFirst
    // trim
    // trimLeft
    // trimRight

    contains: function(str, occurrence)
    {
        if (str.length == 0){
            return false;
        }
        return Boolean(str.indexOf(occurrence) > -1);
    },

    icontains: function(str, occurrence)
    {
        if (str.length == 0){
            return false;
        }
        return StringUtil.contains(str.toLowerCase(), occurrence.toLowerCase());
    },

    levenshteinDistance: function(a, b)
    {
        // http://www.emanueleferonato.com/2010/06/09/find-levenshtein-distance-with-as3/

        var i, j, m = [];

        var y = a.length;
        var x = b.length;

        for(i = 0; i <= y; i++)
        {
            m[i] = [];

            for(j = 0; j <= x; j++)
            {
                m[i].push((i != 0 ? 0 : j));
            }

            m[i][0] = i;
        }

        for(i = 1; i <= y; i++)
        {
            for(j = 1; j <= x; j++)
            {
                m[i][j] = Math.min((m[i - 1][j] + 1), (m[i][j - 1] + 1), (m[i - 1][j - 1] + Math.floor(a.charAt(i - 1) == b.charAt(j - 1))));
            }
        }

        return m[y][x];
    },

    levenshteinSimilarity: function(a, b)
    {
        var d = StringUtil.levenshteinDistance(a, b);
        var l = Math.max(a.length, b.length);

        return ((l == 0) ? 1.0 : (1.0 - (d / l)));
    },

    padLeft: function(str, len, char)
    {
        var i = str.length
        while (i < len) {
            str = (char + str);
            i++;
        }
        return str;
    },

    padRight: function(str, len, char)
    {
        var i = str.length
        while (i < len) {
            str = (str + char);
            i++;
        }
        return str;
    },

    strip: function(str)
    {
        if (str.length == 0){
            return str;
        }
        return str.replace(/\s+/gm, '');
    },

    toLowerCaseFirst: function(str)
    {
    },

    toRandomCase: function(str)
    {
    },

    toUpperCaseFirst: function(str, toLowerCaseRest)
    {
        var f = str.substr(0, 1).toUpperCase();
        var r = str.substr(1);
        return (f + ((toLowerCaseRest === true) ? r.toLowerCase() : r));
    }

};