var JSONUtil = {

    decode: function(str)
    {
        // http://qnimate.com/json-parse-throws-unexpected-token-error-for-valid-json/
        // https://stackoverflow.com/questions/22200588/json-lint-says-its-valid-but-json-parse-throws-error/22200674
        // str = str.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\f/g, '\\f');
        return JSON.parse(str);
    },

    encode: function(obj)
    {
        return JSON.stringify(obj);
    }
};