/** global: FunctionUtil */

export function argument() {
    const args = FunctionUtil.args(arguments);
    return element(args);
}

export function bit(chance) {
    return boolean(chance) ? 1 : 0;
}

export function boolean(chance) {
    return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
}

export function color() {
    return integer(0, 0xffffff);
}

export function element(array) {
    return array[index(array)];
}

export function float(min, max) {
    return min + Math.random() * (max - min);
}

export function index(array) {
    return integer(0, array.length - 1);
}

export function integer(min, max) {
    return Math.floor(Math.round(float(min - 0.5, max + 0.5)));
}

export function map(func, count) {
    const m = [];
    for (let i = 0; i < count; i++) {
        m.push(func(i));
    }
    return m;
}

export function sign(chance) {
    return boolean(chance) ? 1 : -1;
}

export function string(
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
