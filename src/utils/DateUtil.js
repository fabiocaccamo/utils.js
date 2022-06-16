/** global: DateUtil */
/** global: StringUtil */

DateUtil = {

    clone: function(date)
    {
        return new Date(date.getTime());
    },

    format: function(date, str) {
        // https://docs.djangoproject.com/en/4.0/ref/templates/builtins/#date
        var replace = StringUtil.replace;
        var padZeros = StringUtil.padZeros;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dt = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth();
        var monthNum = (month + 1);
        var monthName = months[month];
        var day = date.getDay();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        var placeholders = [
            ['YYYY', year],
            ['YY', padZeros(year, 4).substring(2, 4)],
            ['MM', padZeros(monthNum, 2)],
            ['M', monthNum],
            ['DD', padZeros(dt, 2)],
            ['D', dt],
            ['hh', padZeros(hours, 2)],
            ['h', hours],
            ['mm', padZeros(minutes, 2)],
            ['m', minutes],
            ['ss', padZeros(seconds, 2)],
            ['s', seconds],
            ['ll', padZeros(milliseconds, 2)],
            ['XX', monthName],
            ['X', monthName.substring(0, 3)],
            ['ZZ', days[day]],
            ['Z', days[day].substring(0, 3)]
        ];
        var placeholder, occurrence;
        for (var i = 0, j = placeholders.length; i < j; i++) {
            placeholder = placeholders[i];
            occurrence = placeholder[0];
            if (str.indexOf(occurrence) === -1) {
                continue;
            }
            str = replace(str, occurrence, placeholder[1]);
        }
        return str;
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