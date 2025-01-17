import StringUtil from './string.js';

function clone(date) {
    return new Date(date.getTime());
}

function constrain(date, a, b) {
    const dateMin = min(a, b);
    const dateMax = max(a, b);
    return min(max(date, dateMin), dateMax);
}

function format(date, str) {
    // https://docs.djangoproject.com/en/4.0/ref/templates/builtins/#date
    const replace = StringUtil.replace;
    const padZeros = StringUtil.padZeros;
    const months = [
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
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const dt = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthNum = month + 1;
    const monthName = months[month];
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const placeholders = [
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
    let placeholder, occurrence;
    for (let i = 0, j = placeholders.length; i < j; i++) {
        placeholder = placeholders[i];
        occurrence = placeholder[0];
        if (!str.includes(occurrence)) {
            continue;
        }
        str = replace(str, occurrence, placeholder[1]);
    }
    return str;
}

function identifier(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // getMonth() is zero-based
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const milliseconds = d.getMilliseconds();
    return (
        String(year) +
        StringUtil.padZeros(month, 2) +
        StringUtil.padZeros(day, 2) +
        StringUtil.padZeros(hours, 2) +
        StringUtil.padZeros(minutes, 2) +
        StringUtil.padZeros(seconds, 2) +
        StringUtil.padZeros(milliseconds, 3)
    );
}

function isFuture(date, checkTime) {
    const day = new Date(date.getTime());
    const now = new Date();
    if (checkTime !== true) {
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);
    }
    const delta = now.getTime() - day.getTime();
    return delta < 0;
}

function isPast(date, checkTime) {
    const day = new Date(date.getTime());
    const now = new Date();
    if (checkTime !== true) {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
    }
    const delta = now.getTime() - day.getTime();
    return delta > 0;
}

function max(date, other) {
    return date.getTime() > other.getTime() ? date : other;
}

function min(date, other) {
    return date.getTime() <= other.getTime() ? date : other;
}

function normalize(ms) {
    const time = {
        milliseconds: ms % 1000,
        seconds: Math.floor(ms / 1000) % 60,
        minutes: Math.floor(ms / 1000 / 60) % 60,
        hours: Math.floor(ms / 1000 / 60 / 60) % 24,
        days: Math.floor(ms / 1000 / 60 / 60 / 24),
    };
    return time;
}

function parse(date) {
    let timestamp;
    const timestampIsValid = (t) => {
        return (
            TypeUtil.isNumber(t) && t >= 0 && TypeUtil.isNumber(new Date(t).getTime())
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
}

function timestamp(date) {
    const d = date || new Date();
    return d.getTime();
}

function today() {
    const d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

function tomorrow() {
    const d = today();
    d.setDate(d.getDate() + 1);
    return d;
}

function yesterday() {
    const d = today();
    d.setDate(d.getDate() - 1);
    return d;
}

function yyyymmdd(date, separator) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // getMonth() is zero-based
    const day = d.getDate();
    const sep = separator || '';
    // prettier-ignore
    return (String(year) + sep +
            StringUtil.padZeros(month, 2) + sep +
            StringUtil.padZeros(day, 2));
}

export default {
    clone,
    constrain,
    format,
    identifier,
    isFuture,
    isPast,
    max,
    min,
    normalize,
    parse,
    timestamp,
    today,
    tomorrow,
    yesterday,
    yyyymmdd,
};
