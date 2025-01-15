/** global: MathUtil */
/** global: TrigoUtil */

TrigoUtil = {
    DEG_0: 0.0,
    DEG_90: 90.0,
    DEG_180: 180.0,
    DEG_270: 270.0,
    DEG_360: 360.0,

    DEG_TO_RAD: Math.PI / 180.0, // 0.017453292519943295
    RAD_TO_DEG: 180.0 / Math.PI, // 57.29577951308232

    acosDeg(rad) {
        return Math.acos(rad) * TrigoUtil.RAD_TO_DEG;
    },

    angleDeg(y, x) {
        return TrigoUtil.atan2Deg(y, x);
    },

    angleRad(y, x) {
        return Math.atan2(y, x);
    },

    asinDeg(rad) {
        return Math.asin(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanDeg(rad) {
        return Math.atan(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atan2Deg(y, x) {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    cosDeg(deg) {
        return Math.cos(deg * TrigoUtil.DEG_TO_RAD);
    },

    cycleDeg(deg) {
        return MathUtil.cycle(deg, TrigoUtil.DEG_360);
    },

    degToRad(deg) {
        return deg * TrigoUtil.DEG_TO_RAD;
    },

    fastDeg(degFrom, degTo) {
        const degDiff = degTo - degFrom;
        if (degDiff > TrigoUtil.DEG_180) {
            return -TrigoUtil.DEG_360 + degDiff;
        } else if (degDiff < -TrigoUtil.DEG_180) {
            return TrigoUtil.DEG_360 + degTo;
        } else {
            return degTo;
        }
    },

    haversine(lat1, lon1, lat2, lon2, km) {
        const degToRad = TrigoUtil.degToRad;
        const lat1Rad = degToRad(lat1);
        const lon1Rad = degToRad(lon1);
        const lat2Rad = degToRad(lat2);
        const lon2Rad = degToRad(lon2);
        const latDist = lat2Rad - lat1Rad;
        const lonDist = lon2Rad - lon1Rad;
        // prettier-ignore
        const a = Math.sin(latDist / 2.0) * Math.sin(latDist / 2.0) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                Math.sin(lonDist / 2.0) * Math.sin(lonDist / 2.0);
        const c = Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a)) * 2.0;
        let r; // earth radius
        if (km === false) {
            r = 3956; // miles
        } else {
            r = 6371; // km
        }
        const distance = MathUtil.roundDecimals(r * c, 3);
        return distance;
    },

    hypo(distanceX, distanceY) {
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    },

    radToDeg(rad) {
        return rad * TrigoUtil.RAD_TO_DEG;
    },

    sinDeg(deg) {
        return Math.sin(deg * TrigoUtil.DEG_TO_RAD);
    },

    tanDeg(deg) {
        return Math.tan(deg * TrigoUtil.DEG_TO_RAD);
    },
};
