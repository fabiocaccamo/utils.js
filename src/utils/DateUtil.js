/** global: DateUtil */
/** global: StringUtil */

DateUtil = {

    clone: function(date)
    {
        return new Date(date.getTime());
    },

    /*
    hhmm: function(hours, minutes, separator)
    {
        var hh = StringUtil.padZeros(hours, 2);
        var mm = StringUtil.padZeros(minutes, 2);
        var sep = (separator || ':');
        return (hh + sep + mm);
    },
    */

    identifier: function(date)
    {
        var d = (date || new Date());
        var year = d.getFullYear();
        var month = d.getMonth() + 1; // getMonth() is zero-based
        var day = d.getDate();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        var milliseconds = d.getMilliseconds();
        return (String(year) +
                StringUtil.padZeros(month, 2) +
                StringUtil.padZeros(day, 2) +
                StringUtil.padZeros(hours, 2) +
                StringUtil.padZeros(minutes, 2) +
                StringUtil.padZeros(seconds, 2) +
                StringUtil.padZeros(milliseconds, 3));
    },

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

    timestamp: function()
    {
        return new Date().getTime();
    },

    yyyymmdd: function(date, separator)
    {
        var d = (date || new Date());
        var year = d.getFullYear();
        var month = d.getMonth() + 1; // getMonth() is zero-based
        var day = d.getDate();
        var sep = (separator || '');
        return (String(year) + sep +
                StringUtil.padZeros(month, 2) + sep +
                StringUtil.padZeros(day, 2));
    }

};