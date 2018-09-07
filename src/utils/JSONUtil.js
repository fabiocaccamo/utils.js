var JSONUtil = {

    decode: function(str)
    {
        return JSON.parse(str);
    },

    encode: function(obj)
    {
        return JSON.stringify(obj);
    }
};