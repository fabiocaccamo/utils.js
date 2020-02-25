/** global: MathUtil */
/** global: TrigoUtil */

TrigoUtil = {

    DEG_0: 0.0,
    DEG_90: 90.0,
    DEG_180: 180.0,
    DEG_270: 270.0,
    DEG_360: 360.0,

    DEG_TO_RAD: (Math.PI / 180.0), // 0.017453292519943295
    RAD_TO_DEG: (180.0 / Math.PI), // 57.29577951308232

    acosDeg: function(rad)
    {
        return Math.acos(rad) * TrigoUtil.RAD_TO_DEG;
    },

    angleDeg: function(y, x)
    {
        return TrigoUtil.atan2Deg(y, x);
    },

    angleRad: function(y, x)
    {
        return Math.atan2(y, x);
    },

    asinDeg: function(rad)
    {
        return Math.asin(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanDeg: function(rad)
    {
        return Math.atan(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atan2Deg: function(y, x)
    {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    cosDeg: function(deg)
    {
        return Math.cos(deg * TrigoUtil.DEG_TO_RAD);
    },

    cycleDeg: function(deg)
    {
        return MathUtil.cycle(deg, TrigoUtil.DEG_360);
    },

    degToRad: function(deg)
    {
        return (deg * TrigoUtil.DEG_TO_RAD);
    },

    fastDeg: function(degFrom, degTo)
    {
        var degDiff = (degTo - degFrom);
        return (degDiff > TrigoUtil.DEG_180 ? (-TrigoUtil.DEG_360 + degDiff) : (degDiff < -TrigoUtil.DEG_180 ? (TrigoUtil.DEG_360 + degTo) : degTo));
    },

    haversine: function(lat1, lon1, lat2, lon2, km)
    {
        var degToRad = TrigoUtil.degToRad;
        var lat1Rad = degToRad(lat1);
        var lon1Rad = degToRad(lon1);
        var lat2Rad = degToRad(lat2);
        var lon2Rad = degToRad(lon2);
        var latDist = (lat2Rad - lat1Rad);
        var lonDist = (lon2Rad - lon1Rad);
        var a = Math.sin(latDist / 2.0) * Math.sin(latDist / 2.0) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                Math.sin(lonDist / 2.0) * Math.sin(lonDist / 2.0);
        var c = (Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a)) * 2.0);
        var r; // earth radius
        if (km === false) {
            r = 3956; // miles
        } else {
            r = 6371; // km
        }
        var distance = MathUtil.roundDecimals((r * c), 3);
        return distance;
    },

    hypo: function(distanceX, distanceY)
    {
        return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    },

    radToDeg: function(rad)
    {
        return (rad * TrigoUtil.RAD_TO_DEG);
    },

    sinDeg: function(deg)
    {
        return Math.sin(deg * TrigoUtil.DEG_TO_RAD);
    },

    tanDeg: function(deg)
    {
        return Math.tan(deg * TrigoUtil.DEG_TO_RAD);
    }

};