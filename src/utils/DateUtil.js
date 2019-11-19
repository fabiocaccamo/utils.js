DateUtil = {

    clone: function(date)
    {
        return new Date(date.getTime());
    },
    /*
    delta: function(info, now)
    {
        // info = { days:-1, hours:0, minutes:0, milliseconds:0 }
    },
    */
    /*
    hhmm: function(hours, minutes, separator)
    {
        var hh = StringUtil.padZeros(hours, 2);
        var mm = StringUtil.padZeros(minutes, 2);
        var sep = (separator || ':');
        return (hh + sep + mm);
    },
    */
    /*
    normalize: function(ms)
    {
        var time = {
            milliseconds:   (ms % 1000),
            seconds:        (Math.floor(ms / 1000) % 60),
            minutes:        (Math.floor(ms / 1000 / 60) % 60),
            hours:          (Math.floor(ms / 1000 / 60 / 60) % 24),
            days:           (Math.floor(ms / 1000 / 60 / 60 / 24))
        };
        return time;
    },
    */
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