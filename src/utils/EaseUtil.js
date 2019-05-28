var EaseUtil = {

    backIn: function(t, s)
    {
        // s = overshoot = 1.70158
        s = (isNaN(s) ? 1.70158 : s);
        return t * t * (((s + 1.0) * t) - s);
    },

    backInOut: function(t, s)
    {
        // s = overshoot = 1.70158
        s = (isNaN(s) ? 1.70158 : s);
        if ((t /= 0.5) < 1.0) {
            return 0.5 * (t * t * (((s *= (1.525)) + 1.0) * t - s));
        } else {
            return 0.5 * ((t -= 2.0) * t * (((s *= (1.525)) + 1.0) * t + s) + 2.0);
        }
    },

    backOut: function(t, s)
    {
        // s = overshoot = 1.70158
        s = (isNaN(s) ? 1.70158 : s);
        return (t -= 1.0) * t * (((s + 1.0) * t) + s) + 1.0;
    },

    bounceIn: function(t)
    {
        t = (1.0 - t);

        if (t < (1.0 / 2.75)) {
            return 1.0 - (7.5625 * t * t);
        }
        else if (t < (2.0 / 2.75)) {
            return 1.0 - (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
        }
        else if (t < (2.5 / 2.75)) {
            return 1.0 - (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
        }
        else {
            return 1.0 - (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
        }
    },

    bounceInOut: function(t)
    {
        if (t < 0.5) {
            t = (1.0 - t);

            if (t < (1.0 / 2.75)) {
                return 1.0 - (7.5625 * t * t);
            }
            else if (t < (2.0 / 2.75)) {
                return 1.0 - (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
            }
            else if (t < (2.5 / 2.75)) {
                return 1.0 - (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
            }
            else {
                return 1.0 - (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
            }
        } else {
            if (t < (1.0 / 2.75)) {
                return (7.5625 * t * t);
            }
            else if (t < (2.0 / 2.75)) {
                return (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
            }
            else if (t < (2.5 / 2.75)) {
                return (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
            }
            else {
                return (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
            }
        }
    },

    bounceOut: function(t)
    {
        if (t < (1.0 / 2.75)) {
            return (7.5625 * t * t);
        }
        else if (t < (2.0 / 2.75)) {
            return (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
        }
        else if (t < (2.5 / 2.75)) {
            return (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
        }
        else {
            return (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
        }
    },

    circularIn: function(t)
    {
        return -(Math.sqrt(1.0 - t * t) - 1.0);
    },

    circularInOut: function(t)
    {
        if((t /= 0.5) < 1.0){
            return -0.5 * (Math.sqrt(1.0 - t * t) - 1.0);
        }

        return 0.5 * (Math.sqrt(1.0 - (t -= 2.0) * t) + 1.0);
    },

    circularOut: function(t)
    {
        return Math.sqrt(1.0 - ((t -= 1.0) * t));
    },

    cubicIn: function(t)
    {
        return (t * t * t);
    },

    cubicInOut: function(t)
    {
        if ((t /= 0.5) < 1.0){
            return 0.5 * t * t * t;
        }

        return 0.5 * ((t -= 2.0) * t * t + 2.0);
    },

    cubicOut: function(t)
    {
        return (t -= 1.0) * t * t + 1.0;
    },

    elasticIn: function(t, a, p)
    {
        // a = amplitude = 0.0, p = period = 0.3

        if (t === 0.0) {
            return 0.0;
        }
        if (t === 1.0) {
            return 1.0;
        }

        a = (isNaN(a) ? 0.0 : a);
        p = (isNaN(p) ? 0.3 : p);

        var s;

        if (a < 1.0) {
            a = 1.0;
            s = (p / 4.0);
        } else {
            s = (p / (2.0 * Math.PI) * Math.asin(1.0 / a));
        }
        return -(a * Math.pow(2.0, 10.0 * (t -= 1.0)) * Math.sin((t - s) * (2.0 * Math.PI) / p));
    },

    elasticInOut: function(t, a, p)
    {
        // a = amplitude = 0.0, p = period = 0.3

        if (t === 0.0) {
            return 0.0;
        }
        if ((t /= 0.5) === 2.0) {
            return 1.0;
        }

        a = (isNaN(a) ? 0.0 : a);
        p = (isNaN(p) ? 0.3 : p);

        var s;

        if (p === 0.3) {
            p *= 1.5;
        }
        if (a < 1.0) {
            a = 1.0;
            s = (p / 4.0);
        } else {
            s = (p / (2.0 * Math.PI) * Math.asin(1.0 / a));
        }
        if (t < 1.0) {
            return -0.5 * (a * Math.pow(2.0, 10.0 * (t -= 1.0)) * Math.sin((t - s) * (2.0 * Math.PI) / p));
        }
        return a * Math.pow(2.0, -10.0 * (t -= 1.0)) * Math.sin((t - s) * (2.0 * Math.PI) / p) * 0.5 + 1.0;
    },

    elasticOut: function(t, a, p)
    {
        // a = amplitude = 0.0, p = period = 0.3

        if (t === 0.0) {
            return 0.0;
        }
        if (t === 1.0) {
            return 1.0;
        }

        a = (isNaN(a) ? 0.0 : a);
        p = (isNaN(p) ? 0.3 : p);

        var s;

        if (a < 1.0) {
            a = 1.0;
            s = (p / 4.0);
        } else {
            s = (p / (2.0 * Math.PI) * Math.asin(1.0 / a));
        }
        return (a * Math.pow(2.0, (-10.0 * t)) * Math.sin((t - s) * (2.0 * Math.PI) / p) + 1.0);
    },

    exponentialIn: function(t)
    {
        if (t === 0.0) {
            return 0.0;
        }
        return Math.pow(2.0, (10.0 * (t - 1.0)));
    },

    exponentialInOut: function(t)
    {
        if (t === 0.0) {
            return 0.0;
        }
        if (t === 1.0) {
            return 1.0;
        }
        if ((t /= 0.5) < 1.0) {
            return 0.5 * Math.pow(2.0, 10.0 * (t - 1.0));
        }
        return 0.5 * (-Math.pow(2.0, -10.0 * (t -= 1.0)) + 2.0);
    },

    exponentialOut: function(t)
    {
        if (t === 1.0) {
            return t;
        }
        return -Math.pow(2.0, (-10.0 * t)) + 1.0;
    },

    none: function(t)
    {
        return t;
    },

    quadraticIn: function(t)
    {
        return (t * t);
    },

    quadraticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t;
        }
        return -0.5 * ((t -= 1.0) * (t - 2.0) - 1.0);
    },

    quadraticOut: function(t)
    {
        return -t * (t - 2.0);
    },

    quarticIn: function(t)
    {
        return (t * t * t * t);
    },

    quarticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t * t * t;
        }
        return -0.5 * ((t -= 2.0) * t * t * t - 2.0);
    },

    quarticOut: function(t)
    {
        return -((t -= 1.0) * t * t * t - 1.0);
    },

    quinticIn: function(t)
    {
        return (t * t * t * t * t);
    },

    quinticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t * t * t * t;
        }
        return 0.5 * ((t -= 2.0) * t * t * t * t + 2.0);
    },

    quinticOut: function(t)
    {
        return (t -= 1.0) * t * t * t * t + 1.0;
    },

    sexticIn: function(t)
    {
        return (t * t * t * t * t * t);
    },

    sexticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t * t * t * t * t;
        }
        return -0.5 * ((t -= 2.0) * t * t * t * t * t - 2.0);
    },

    sexticOut: function(t)
    {
        return -((t -= 1.0) * t * t * t * t * t - 1.0);
    },

    sineIn: function(t)
    {
        return -Math.cos(t * (Math.PI / 2.0)) + 1.0;
    },

    sineInOut: function(t)
    {
        return -0.5 * (Math.cos(Math.PI * t) - 1.0);
    },

    sineOut: function(t)
    {
        return Math.sin(t * (Math.PI / 2.0));
    },

    waveCosine: function(t, f, a, i)
    {
        // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
        f = (isNaN(f) ? 1.0 : f);
        a = (a === true ? true : false);
        i = (i === true ? true : false);

        var w = Math.cos(Math.PI * t * f);
        w = (a ? Math.abs(w) : w);
        w = (i ? (1.0 - w) : w);
        return w;
    },

    waveSawtooth: function(t, f, a, i)
    {
        // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
        f = (isNaN(f) ? 1.0 : f);
        a = (a === true ? true : false);
        i = (i === true ? true : false);

        var w = (t * f) % 1.0;
        w = (a ? Math.abs(w) : w);
        w = (i ? (1.0 - w) : w);
        return w;
    },

    waveSine: function(t, f, a, i)
    {
        // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
        f = (isNaN(f) ? 1.0 : f);
        a = (a === true ? true : false);
        i = (i === true ? true : false);

        var w = Math.sin(Math.PI * t * f);
        w = (a ? Math.abs(w) : w);
        w = (i ? (1.0 - w) : w);
        return w;
    }

};