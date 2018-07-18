var Base64Util = {

    decode: function(str)
    {
        return window.atob(str);
    },

    encode: function(str)
    {
        return window.btoa(str);
    }
};