/** global: FunctionUtil */
/** global: RandomUtil */

RandomUtil = {
    argument() {
        const args = FunctionUtil.args(arguments);
        return RandomUtil.element(args);
    },

    bit(chance) {
        return RandomUtil.boolean(chance) ? 1 : 0;
    },

    boolean(chance) {
        return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
    },

    color() {
        return RandomUtil.integer(0, 0xffffff);
    },

    element(array) {
        return array[RandomUtil.index(array)];
    },

    float(min, max) {
        return min + Math.random() * (max - min);
    },

    index(array) {
        return RandomUtil.integer(0, array.length - 1);
    },

    integer(min, max) {
        return Math.floor(Math.round(RandomUtil.float(min - 0.5, max + 0.5)));
    },

    map(func, count) {
        const m = [];
        for (let i = 0; i < count; i++) {
            m.push(func(i));
        }
        return m;
    },

    sign(chance) {
        return RandomUtil.boolean(chance) ? 1 : -1;
    },

    string(
        length,
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*(-_=+).,;'
    ) {
        const c = charset.split('');
        const r = RandomUtil.element;
        let i = 0;
        let s = '';
        while (i < length) {
            s += r(c);
            i++;
        }
        return s;
    },
};
