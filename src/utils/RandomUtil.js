var RandomUtil = {

    argument: function()
    {
        var args = FunctionUtil.args(arguments);
        return RandomUtil.element(args);
    },

    bit: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : 0);
    },

    boolean: function(chance)
    {
        return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
    },

    color: function()
    {
        return RandomUtil.integer(0, 0xFFFFFF);
    },

    element: function(array)
    {
        return array[RandomUtil.index(array)];
    },

    float: function(min, max)
    {
        return min + (Math.random() * (max - min));
    },

    index: function(array)
    {
        return RandomUtil.integer(0, array.length - 1);
    },

    integer: function(min, max)
    {
        return Math.floor(Math.round(RandomUtil.float(min - 0.5, max + 0.5)));
    },

    sign: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : -1);
    },

    string: function(length, charset)
    {
        charset = (charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*(-_=+).,;');
        var c = charset.split('');
        var r = RandomUtil.element;
        var i = 0;
        var s = '';
        while (i < length) {
            s += r(c);
            i++;
        }
        return s;
    }
};