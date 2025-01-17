import * as MathUtil from './math.js';

export default {
    acosDeg,
    angleDeg,
    angleRad,
    asinDeg,
    atanDeg,
    atan2Deg,
    cosDeg,
    cycleDeg,
    degToRad,
    fastDeg,
    haversine,
    hypo,
    radToDeg,
    sinDeg,
    tanDeg,
};

const DEG_0 = 0.0;
const DEG_90 = 90.0;
const DEG_180 = 180.0;
const DEG_270 = 270.0;
const DEG_360 = 360.0;
const DEG_TO_RAD = Math.PI / 180.0; // 0.017453292519943295
const RAD_TO_DEG = 180.0 / Math.PI; // 57.29577951308232

function acosDeg(rad) {
    return Math.acos(rad) * RAD_TO_DEG;
}

function angleDeg(y, x) {
    return atan2Deg(y, x);
}

function angleRad(y, x) {
    return Math.atan2(y, x);
}

function asinDeg(rad) {
    return Math.asin(rad) * RAD_TO_DEG;
}

function atanDeg(rad) {
    return Math.atan(rad) * RAD_TO_DEG;
}

function atan2Deg(y, x) {
    return Math.atan2(y, x) * RAD_TO_DEG;
}

function cosDeg(deg) {
    return Math.cos(deg * DEG_TO_RAD);
}

function cycleDeg(deg) {
    return MathUtil.cycle(deg, DEG_360);
}

function degToRad(deg) {
    return deg * DEG_TO_RAD;
}

function fastDeg(degFrom, degTo) {
    const degDiff = degTo - degFrom;
    if (degDiff > DEG_180) {
        return -DEG_360 + degDiff;
    } else if (degDiff < -DEG_180) {
        return DEG_360 + degTo;
    } else {
        return degTo;
    }
}

function haversine(lat1, lon1, lat2, lon2, km) {
    const degToRad = degToRad;
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
}

function hypo(distanceX, distanceY) {
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function radToDeg(rad) {
    return rad * RAD_TO_DEG;
}

function sinDeg(deg) {
    return Math.sin(deg * DEG_TO_RAD);
}

function tanDeg(deg) {
    return Math.tan(deg * DEG_TO_RAD);
}
