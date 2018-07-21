var TestUtil = {

    assertArray: function(val)
    {
        if (!TypeUtil.isArray(val)) {
            throw new Error('value is not array.');
        }
    },

    assertBase64: function(val)
    {
        if (!TypeUtil.isBase64(val)) {
            throw new Error('value is not base64.');
        }
    },

    assertBoolean: function(val)
    {
        if (!TypeUtil.isBoolean(val)) {
            throw new Error('value is not boolean.');
        }
    },

    assertDate: function(val)
    {
        if (!TypeUtil.isDate(val)) {
            throw new Error('value is not date.');
        }
    },

    assertEquals: function(val1, val2)
    {
        if (!ObjectUtil.equals(val1, val2)) {
            throw new Error('values are not equals.');
        }
    },

    assertError: function(val)
    {
        if (!TypeUtil.isError(val)) {
            throw new Error('value is not error.');
        }
    },

    assertFalse: function(val)
    {
        TestUtil.assertBoolean(val);
        if (val !== false) {
            throw new Error('value is not false.');
        }
    },

    assertFunction: function(val)
    {
        if (!TypeUtil.isFunction(val)) {
            throw new Error('value is not function.');
        }
    },

    assertJSON: function(val)
    {
        if (!TypeUtil.isJSON(val)) {
            throw new Error('value is not json.');
        }
    },

    assertLength: function(val, length)
    {
        TestUtil.assertArray(val);
        TestUtil.assertEquals(val.length, length);
    },

    assertObject: function(val)
    {
        if (!TypeUtil.isObject(val)) {
            throw new Error('value is not object.');
        }
    },

    assertNotEquals: function(val1, val2)
    {
        if (ObjectUtil.equals(val1, val2)) {
            throw new Error('values are equals.');
        }
    },

    assertNumber: function(val)
    {
        if (!TypeUtil.isNumber(val)) {
            throw new Error('value is not number.');
        }
    },

    assertNull: function(val)
    {
        if (!TypeUtil.isNull(val)) {
            throw new Error('value is not null.');
        }
    },

    assertRegExp: function(val)
    {
        if (!TypeUtil.isRegExp(val)) {
            throw new Error('value is not regexp.');
        }
    },

    assertString: function(val)
    {
        if (!TypeUtil.isString(val)) {
            throw new Error('value is not string.');
        }
    },

    assertThrowError: function(val)
    {
        TestUtil.assertFunction(val);
        try {
            FunctionUtil.call.apply(null, val, FunctionUtil.args(arguments, 1));
            return;
        } catch(e) {
        }
        throw new Error('value didn\'t throw error.');
    },

    assertTrue: function(val)
    {
        TestUtil.assertBoolean(val);
        if (val !== true) {
            throw new Error('value is not true.');
        }
    },

    assertUndefined: function(val)
    {
        if (!TypeUtil.isUndefined(val)) {
            throw new Error('value is not undefined.');
        }
    },

    assertXML: function(val)
    {
        if (!TypeUtil.isXML(val)) {
            throw new Error('value is not xml.');
        }
    }

};