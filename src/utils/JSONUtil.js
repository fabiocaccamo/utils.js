var JSONUtil = {

    decode: function(str)
    {
        var output = '';
        try {
            output = JSON.parse(str);
        }
        catch(error) {
            // unquote str to avoid syntax error
            str = str.replace(/&quot;/g, '\"');
            output = JSON.parse(str);
        }
        return output;
    },

    encode: function(obj)
    {
        return JSON.stringify(obj);
    }
};