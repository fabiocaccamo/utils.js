/** global: DateUtil */
/** global: StringUtil */
/** global: isDate */

DateUtil = {
    clone: function (date) {
        return new Date(date.getTime());
    },

    constrain: function (date, a, b) {
        var dateMin = DateUtil.min(a, b);
        var dateMax = DateUtil.max(a, b);
        return DateUtil.min(DateUtil.max(date, dateMin), dateMax);
    },

    format: function (date, str) {
        // https://docs.djangoproject.com/en/4.0/ref/templates/builtins/#date
        var replace = StringUtil.replace;
        var padZeros = StringUtil.padZeros;
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        var days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        var dt = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth();
        var monthNum = month + 1;
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
            ['Z', days[day].substring(0, 3)],
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

    identifier: function (date) {
        var d = date || new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1; // getMonth() is zero-based
        var day = d.getDate();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        var milliseconds = d.getMilliseconds();
        return (
            String(year) +
            StringUtil.padZeros(month, 2) +
            StringUtil.padZeros(day, 2) +
            StringUtil.padZeros(hours, 2) +
            StringUtil.padZeros(minutes, 2) +
            StringUtil.padZeros(seconds, 2) +
            StringUtil.padZeros(milliseconds, 3)
        );
    },

    isFuture: function (date, checkTime) {
        var day = new Date(date.getTime());
        var now = new Date();
        if (checkTime !== true) {
            day.setHours(0);
            day.setMinutes(0);
            day.setSeconds(0);
            day.setMilliseconds(0);
        }
        var delta = now.getTime() - day.getTime();
        return delta < 0;
    },

    isPast: function (date, checkTime) {
        var day = new Date(date.getTime());
        var now = new Date();
        if (checkTime !== true) {
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
        }
        var delta = now.getTime() - day.getTime();
        return delta > 0;
    },

    max: function (date, other) {
        return date.getTime() > other.getTime() ? date : other;
    },

    min: function (date, other) {
        return date.getTime() <= other.getTime() ? date : other;
    },

    normalize: function (ms) {
        var time = {
            milliseconds: ms % 1000,
            seconds: Math.floor(ms / 1000) % 60,
            minutes: Math.floor(ms / 1000 / 60) % 60,
            hours: Math.floor(ms / 1000 / 60 / 60) % 24,
            days: Math.floor(ms / 1000 / 60 / 60 / 24),
        };
        return time;
    },

    parse: function (date) {
        var timestamp;
        var timestampIsValid = function (t) {
            return (
                TypeUtil.isNumber(t) &&
                t >= 0 &&
                TypeUtil.isNumber(new Date(t).getTime())
            );
        };
        if (TypeUtil.isDate(date)) {
            return date;
        } else if (TypeUtil.isNumber(date)) {
            timestamp = date;
            if (timestampIsValid(timestamp)) {
                return new Date(timestamp);
            }
        } else if (TypeUtil.isString(date)) {
            timestamp = Number(date);
            if (timestampIsValid(timestamp)) {
                return new Date(timestamp);
            }
            timestamp = Date.parse(date);
            if (timestampIsValid(timestamp)) {
                return new Date(timestamp);
            }
        }
        return null;
    },

    timestamp: function (date) {
        var d = date || new Date();
        return d.getTime();
    },

    today: function () {
        var d = new Date();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    },

    tomorrow: function () {
        var d = DateUtil.today();
        d.setDate(d.getDate() + 1);
        return d;
    },

    yesterday: function () {
        var d = DateUtil.today();
        d.setDate(d.getDate() - 1);
        return d;
    },

    yyyymmdd: function (date, separator) {
        var d = date || new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1; // getMonth() is zero-based
        var day = d.getDate();
        var sep = separator || '';
        // prettier-ignore
        return (String(year) + sep +
                StringUtil.padZeros(month, 2) + sep +
                StringUtil.padZeros(day, 2));
    },
};
