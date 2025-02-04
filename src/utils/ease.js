function backIn(t, s) {
    // s = overshoot = 1.70158
    s = isNaN(s) ? 1.70158 : s;
    return t * t * ((s + 1.0) * t - s);
}

function backInOut(t, s) {
    // s = overshoot = 1.70158
    s = isNaN(s) ? 1.70158 : s;
    t /= 0.5;
    if (t < 1.0) {
        s *= 1.525;
        return 0.5 * (t * t * ((s + 1.0) * t - s));
    }
    t -= 2.0;
    s *= 1.525;
    return 0.5 * (t * t * ((s + 1.0) * t + s) + 2.0);
}

function backOut(t, s) {
    // s = overshoot = 1.70158
    s = isNaN(s) ? 1.70158 : s;
    t -= 1.0;
    return t * t * ((s + 1.0) * t + s) + 1.0;
}

function bounceIn(t) {
    t = 1.0 - t;
    if (t < 1.0 / 2.75) {
        return 1.0 - 7.5625 * t * t;
    } else if (t < 2.0 / 2.75) {
        t -= 1.5 / 2.75;
        return 1.0 - (7.5625 * t * t + 0.75);
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 1.0 - (7.5625 * t * t + 0.9375);
    }
    t -= 2.625 / 2.75;
    return 1.0 - (7.5625 * t * t + 0.984375);
}

function bounceInOut(t) {
    if (t < 0.5) {
        t = 1.0 - t;
        if (t < 1.0 / 2.75) {
            return 1.0 - 7.5625 * t * t;
        } else if (t < 2.0 / 2.75) {
            t -= 1.5 / 2.75;
            return 1.0 - (7.5625 * t * t + 0.75);
        } else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 1.0 - (7.5625 * t * t + 0.9375);
        }
        t -= 2.625 / 2.75;
        return 1.0 - (7.5625 * t * t + 0.984375);
    }
    if (t < 1.0 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2.0 / 2.75) {
        t -= 1.5 / 2.75;
        return 7.5625 * t * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 7.5625 * t * t + 0.9375;
    }
    t -= 2.625 / 2.75;
    return 7.5625 * t * t + 0.984375;
}

function bounceOut(t) {
    if (t < 1.0 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2.0 / 2.75) {
        t -= 1.5 / 2.75;
        return 7.5625 * t * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 7.5625 * t * t + 0.9375;
    }
    t -= 2.625 / 2.75;
    return 7.5625 * t * t + 0.984375;
}

function circularIn(t) {
    return -(Math.sqrt(1.0 - t * t) - 1.0);
}

function circularInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return -0.5 * (Math.sqrt(1.0 - t * t) - 1.0);
    }
    t -= 2.0;
    return 0.5 * (Math.sqrt(1.0 - t * t) + 1.0);
}

function circularOut(t) {
    t -= 1.0;
    return Math.sqrt(1.0 - t * t);
}

function cubicIn(t) {
    return t * t * t;
}

function cubicInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t;
    }
    t -= 2.0;
    return 0.5 * (t * t * t + 2.0);
}

function cubicOut(t) {
    t -= 1.0;
    return t * t * t + 1.0;
}

function elasticIn(t, a, p) {
    // a = amplitude = 0.0, p = period = 0.3
    if (t === 0.0) {
        return 0.0;
    }
    if (t === 1.0) {
        return 1.0;
    }
    a = isNaN(a) ? 0.0 : a;
    p = isNaN(p) ? 0.3 : p;
    let s;
    if (a < 1.0) {
        a = 1.0;
        s = p / 4.0;
    } else {
        s = (p / (2.0 * Math.PI)) * Math.asin(1.0 / a);
    }
    t -= 1.0;
    return -(a * 2.0 ** (10.0 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p));
}

function elasticInOut(t, a, p) {
    // a = amplitude = 0.0, p = period = 0.3
    if (t === 0.0) {
        return 0.0;
    }
    t /= 0.5;
    if (t === 2.0) {
        return 1.0;
    }
    a = isNaN(a) ? 0.0 : a;
    p = isNaN(p) ? 0.3 : p;
    let s;
    if (p === 0.3) {
        p *= 1.5;
    }
    if (a < 1.0) {
        a = 1.0;
        s = p / 4.0;
    } else {
        s = (p / (2.0 * Math.PI)) * Math.asin(1.0 / a);
    }
    if (t < 1.0) {
        t -= 1.0;
        return (
            -0.5 * (a * 2.0 ** (10.0 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p))
        );
    }
    t -= 1.0;
    return (
        a * 2.0 ** (-10.0 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p) * 0.5 + 1.0
    );
}

function elasticOut(t, a, p) {
    // a = amplitude = 0.0, p = period = 0.3
    if (t === 0.0) {
        return 0.0;
    }
    if (t === 1.0) {
        return 1.0;
    }
    a = isNaN(a) ? 0.0 : a;
    p = isNaN(p) ? 0.3 : p;
    let s;
    if (a < 1.0) {
        a = 1.0;
        s = p / 4.0;
    } else {
        s = (p / (2.0 * Math.PI)) * Math.asin(1.0 / a);
    }
    return a * 2.0 ** (-10.0 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p) + 1.0;
}

function exponentialIn(t) {
    if (t === 0.0) {
        return 0.0;
    }
    return 2.0 ** (10.0 * (t - 1.0));
}

function exponentialInOut(t) {
    if (t === 0.0) {
        return 0.0;
    }
    if (t === 1.0) {
        return 1.0;
    }
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * 2.0 ** (10.0 * (t - 1.0));
    }
    t -= 1.0;
    return 0.5 * (-(2.0 ** (-10.0 * t)) + 2.0);
}

function exponentialOut(t) {
    if (t === 1.0) {
        return t;
    }
    return -(2.0 ** (-10.0 * t)) + 1.0;
}

function none(t) {
    return t;
}

function quadraticIn(t) {
    return t * t;
}

function quadraticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t;
    }
    t -= 1.0;
    return -0.5 * (t * (t - 2.0) - 1.0);
}

function quadraticOut(t) {
    return -t * (t - 2.0);
}

function quarticIn(t) {
    return t * t * t * t;
}

function quarticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t * t;
    }
    t -= 2.0;
    return -0.5 * (t * t * t * t - 2.0);
}

function quarticOut(t) {
    t -= 1.0;
    return -(t * t * t * t - 1.0);
}

function quinticIn(t) {
    return t * t * t * t * t;
}

function quinticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t * t * t;
    }
    t -= 2.0;
    return 0.5 * (t * t * t * t * t + 2.0);
}

function quinticOut(t) {
    t -= 1.0;
    return t * t * t * t * t + 1.0;
}

function sexticIn(t) {
    return t * t * t * t * t * t;
}

function sexticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t * t * t * t;
    }
    t -= 2.0;
    return -0.5 * (t * t * t * t * t * t - 2.0);
}

function sexticOut(t) {
    t -= 1.0;
    return -(t * t * t * t * t * t - 1.0);
}

function sineIn(t) {
    return -Math.cos(t * (Math.PI / 2.0)) + 1.0;
}

function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1.0);
}

function sineOut(t) {
    return Math.sin(t * (Math.PI / 2.0));
}

function waveCosine(t, f, a, i) {
    // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
    f = isNaN(f) ? 1.0 : f;
    a = a === true ? true : false;
    i = i === true ? true : false;

    let w = Math.cos(Math.PI * t * f);
    w = a ? Math.abs(w) : w;
    w = i ? 1.0 - w : w;
    return w;
}

function waveSawtooth(t, f, a, i) {
    // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
    f = isNaN(f) ? 1.0 : f;
    a = a === true ? true : false;
    i = i === true ? true : false;

    let w = (t * f) % 1.0;
    w = a ? Math.abs(w) : w;
    w = i ? 1.0 - w : w;
    return w;
}

function waveSine(t, f, a, i) {
    // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
    f = isNaN(f) ? 1.0 : f;
    a = a === true ? true : false;
    i = i === true ? true : false;

    let w = Math.sin(Math.PI * t * f);
    w = a ? Math.abs(w) : w;
    w = i ? 1.0 - w : w;
    return w;
}

export default {
    backIn,
    backInOut,
    backOut,
    bounceIn,
    bounceInOut,
    bounceOut,
    circularIn,
    circularInOut,
    circularOut,
    cubicIn,
    cubicInOut,
    cubicOut,
    elasticIn,
    elasticInOut,
    elasticOut,
    exponentialIn,
    exponentialInOut,
    exponentialOut,
    none,
    quadraticIn,
    quadraticInOut,
    quadraticOut,
    quarticIn,
    quarticInOut,
    quarticOut,
    quinticIn,
    quinticInOut,
    quinticOut,
    sexticIn,
    sexticInOut,
    sexticOut,
    sineIn,
    sineInOut,
    sineOut,
    waveCosine,
    waveSawtooth,
    waveSine,
};
