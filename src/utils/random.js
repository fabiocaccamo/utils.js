import FuncUtil from './func.js';

function argument(...args) {
    return element(args);
}

function bit(chance) {
    return boolean(chance) ? 1 : 0;
}

function boolean(chance) {
    return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
}

function color() {
    return integer(0, 0xffffff);
}

function element(array) {
    return array[index(array)];
}

function float(min, max) {
    return min + Math.random() * (max - min);
}

function index(array) {
    return integer(0, array.length - 1);
}

function integer(min, max) {
    return Math.floor(Math.round(float(min - 0.5, max + 0.5)));
}

function map(func, count) {
    const m = [];
    for (let i = 0; i < count; i++) {
        m.push(func(i));
    }
    return m;
}

function sign(chance) {
    return boolean(chance) ? 1 : -1;
}

function string(
    length,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*(-_=+).,;'
) {
    const c = charset.split('');
    const r = element;
    let i = 0;
    let s = '';
    while (i < length) {
        s += r(c);
        i++;
    }
    return s;
}

export default {
    argument,
    bit,
    boolean,
    color,
    element,
    float,
    index,
    integer,
    map,
    sign,
    string,
};
