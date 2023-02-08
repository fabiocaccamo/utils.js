/** global: HexUtil */

HexUtil = {
    decodeInt: function (s) {
        return parseInt(s, 16);
    },

    encodeInt: function (n) {
        var hex = Math.round(n).toString(16).toUpperCase();
        return hex.length === 1 ? '0' + hex : hex;
    },
};
