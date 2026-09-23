export function decode(str) {
    let output = '';
    try {
        output = JSON.parse(str);
    } catch (error) {
        // unquote str to avoid syntax error
        str = str.replace(/&quot;/g, '"');
        output = JSON.parse(str);
    }
    return output;
}

export function decodeById(id, defaultValue = null) {
    if (typeof document === 'undefined') {
        return defaultValue;
    }
    const el = document.getElementById(id);
    return el ? decode(el.textContent) : defaultValue;
}

export function encode(obj) {
    return JSON.stringify(obj);
}

export default {
    decode,
    decodeById,
    encode,
};
