/** global: UTF8Util */

UTF8Util = {
    decode(input) {
        return decodeURIComponent(escape(input));

        // var output = '';
        // var i = 0;
        // var j = input.length;
        // var c, c1, c2;

        // while (i < j)
        // {
        //     c = input.charCodeAt(i);

        //     if (c < 128) {
        //         output += String.fromCharCode(c);
        //         i++;
        //     }
        //     else if((c > 191) && (c < 224)) {
        //         c2 = input.charCodeAt(i + 1);
        //         output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        //         i += 2;
        //     }
        //     else {
        //         c2 = input.charCodeAt(i + 1);
        //         c3 = input.charCodeAt(i + 2);
        //         output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        //         i += 3;
        //     }
        // }

        // return output;
    },

    encode(input) {
        return unescape(encodeURIComponent(input));

        // input = input.replace(/\r\n/g, '\n');

        // var output = '';
        // var i = 0;
        // var j = input.length;
        // var c;

        // for (i; i < j; i++)
        // {
        //     c = input.charCodeAt(i);
        //     if (c < 128) {
        //         output += String.fromCharCode(c);
        //     }
        //     else if ((c > 127) && (c < 2048)) {
        //         output += String.fromCharCode((c >> 6) | 192);
        //         output += String.fromCharCode((c & 63) | 128);
        //     }
        //     else {
        //         output += String.fromCharCode((c >> 12) | 224);
        //         output += String.fromCharCode(((c >> 6) & 63) | 128);
        //         output += String.fromCharCode((c & 63) | 128);
        //     }
        // }

        // return output;
    },
};
