var TrigoUtil = {

    DEG_0: 0.0,
    DEG_90: 90.0,
    DEG_180: 180.0,
    DEG_270: 270.0,
    DEG_360: 360.0,

    DEG_TO_RAD: (Math.PI / 180.0), // 0.017453292519943295 DEG_TO_RAD
    RAD_TO_DEG: (180.0 / Math.PI),

    acosD: function(rad)
    {
        return Math.acos(rad) * TrigoUtil.RAD_TO_DEG;
    },

    angleD: function(y, x)
    {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    angleR: function(y, x)
    {
        return Math.atan2(y, x);
    },

    asinD: function(rad)
    {
        return Math.asin(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanD: function(rad)
    {
        return Math.atan(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanD2: function(y, x)
    {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    cosD: function(deg)
    {
        return Math.cos(deg * TrigoUtil.DEG_TO_RAD);
    },

    cycleD: function(deg)
    {
        return MathUtil.cycle(deg, TrigoUtil.DEG_360);
    },

    degToRad: function(deg)
    {
        return (deg * TrigoUtil.DEG_TO_RAD);
    },

    fastD: function(degFrom, degTo)
    {
        var degDiff = (degTo - degFrom);
        return (degDiff > TrigoUtil.DEG_180 ? (-TrigoUtil.DEG_360 + degDiff) : (degDiff < -TrigoUtil.DEG_180 ? (TrigoUtil.DEG_360 + degTo) : degTo));
    },

    hypo: function(distanceX, distanceY)
    {
        return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    },

    radToDeg: function(rad)
    {
        return (rad * TrigoUtil.RAD_TO_DEG);
    },

    sinD: function(deg)
    {
        return Math.sin(deg * TrigoUtil.DEG_TO_RAD);
    },

    tanD: function(deg)
    {
        return Math.tan(deg * TrigoUtil.DEG_TO_RAD);
    }

};