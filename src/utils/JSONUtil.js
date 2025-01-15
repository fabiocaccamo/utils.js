/** global: JSONUtil */

JSONUtil = {
    decode(str) {
        let output = '';
        try {
            output = JSON.parse(str);
        } catch (error) {
            // unquote str to avoid syntax error
            str = str.replace(/&quot;/g, '"');
            output = JSON.parse(str);
        }
        return output;
    },

    encode(obj) {
        return JSON.stringify(obj);
    },
};
