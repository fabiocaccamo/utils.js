export default {
    decodeInt,
    encodeInt,
};

function decodeInt(s) {
    return parseInt(s, 16);
}

function encodeInt(n) {
    const hex = Math.round(n).toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
}
