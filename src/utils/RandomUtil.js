var RandomUtil = {

    /**
     * Return a random argument
     *
     * @memberof random
     * @return {*} - Random argument
     */
    argument: function()
    {
        var args = FunctionUtil.args(arguments);
        return RandomUtil.element(args);
    },

    /**
     * Return a random bit (0 or 1)
     *
     * @memberof random
     * @param {Number} [chance=0.5] - The chance
     * @return {Number} - The chance to generate a 1, 1.0 means 100%, 0.0 means 0%.
     */
    bit: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : 0);
    },

    /**
     * Return a random boolean (true or false)
     *
     * @memberof random
     * @param {Number} [chance=0.5] - The chance
     * @return {Boolean} - The chance to generate a true value, 1.0 means 100%, 0.0 means 0%.
     */
    boolean: function(chance)
    {
        return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
    },

    /**
     * Return a random color (uint)
     *
     * @memberof random
     * @return {Number} - Random color
     */
    color: function()
    {
        return RandomUtil.integer(0, 0xFFFFFF);
    },

    /**
     * Return a random element from the given array
     *
     * @memberof random
     * @param {Array} array - The array
     * @return {*} - Random array element
     */
    element: function(array)
    {
        return array[RandomUtil.index(array)];
    },

    /**
     * Return a random float where n >= min && n <= max
     *
     * @memberof random
     * @param {Number} min - The minimum
     * @param {Number} max - The maximum
     * @return {Number} - Random float
     */
    float: function(min, max)
    {
        return min + (Math.random() * (max - min));
    },

    /**
     * Return a random valid index for the given array
     *
     * @memberof random
     * @param {Array} array - The array
     * @return {Number} - Random array index
     */
    index: function(array)
    {
        return RandomUtil.integer(0, array.length - 1);
    },

    /**
     * Return a random integer where n >= min && n <= max
     *
     * @memberof random
     * @param {Number} min - The minimum
     * @param {Number} max - The maximum
     * @return {Number} - Random integer
     */
    integer: function(min, max)
    {
        return Math.floor(Math.round(RandomUtil.float(min - 0.5, max + 0.5)));
    },

    /**
     * Return a random sign (1 or -1), useful to randomize positive/negative multiplications.
     *
     * @memberof random
     * @param {Number} [chance=0.5] - The chance to generate a positive sign, 1.0 means 100%, 0.0 means 0%.
     * @return {Number} - Random sign (1 or -1)
     */
    sign: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : -1);
    },

    /**
     * Return a random string of the desired length with the possibility to use a restricted charset.
     *
     * @memberof random
     * @param {Number} length - The length of the returned string
     * @param {String} charset - The charset used to generate the random string, optional.
     * @return {String} - Random string
     */
    string: function(length, charset)
    {
        charset = (charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*(-_=+).,;');
        var c = charset.split('');
        var r = RandomUtil.element;
        var i = 0;
        var s = '';
        while (i++ < length) {
            s += r(c);
        }
        return s;
    }
};