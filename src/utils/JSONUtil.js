var JSONUtil = {

    decode: function(str)
    {
        // unquote str to avoid syntax error
        str = str.replace(/&quot;/g, '\"');
        return JSON.parse(str);
    },

    encode: function(obj)
    {
        return JSON.stringify(obj);
    }
};