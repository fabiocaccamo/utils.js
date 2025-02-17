function decode(str) {
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

function decodeById(id) {
    const el = document?.getElementById(id);
    return el ? decode(el.textContent) : null;
}

function encode(obj) {
    return JSON.stringify(obj);
}

export default {
    decode,
    decodeById,
    encode,
};
