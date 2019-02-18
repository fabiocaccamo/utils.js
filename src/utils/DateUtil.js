var DateUtil = {

    clone: function(date)
    {
        return new Date(date.getTime());
    },

    timestamp: function()
    {
        return new Date().getTime();
    },

    yyyymmdd: function(date, separator)
    {
        var d = (date || new Date());
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1; // getMonth() is zero-based
        var dd = d.getDate();
        var sep = (separator || '');
        return (String(yy) + sep + StringUtil.padZeros(mm, 2) + sep + StringUtil.padZeros(dd, 2));
    }
};