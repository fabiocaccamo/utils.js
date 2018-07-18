var DateUtil = {

    now: function()
    {
        return new Date().getTime();
    },

    yyyymmdd: function(date)
    {
        var d = (date || new Date());
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1; // getMonth() is zero-based
        var dd = d.getDate();

        return [
            String(yy),
            (mm > 9 ? '' : '0') + String(mm),
            (dd > 9 ? '' : '0') + String(dd)
        ].join('');
    }
};