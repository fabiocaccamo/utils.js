import MathUtil from '../math.js';
import InterpolationUtil from '../interpolation.js';
import TrigoUtil from '../trigo.js';

function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

function angle(a, b) {
    const angle = TrigoUtil.angleDeg(b.y - a.y, b.x - a.x);
    return TrigoUtil.cycleDeg(angle);
}

function cross(a, b) {
    // z coordinate of the cross product; x and y coordinates are zero
    return a.x * b.y - a.y * b.x;
}

function distance(a, b) {
    const dX = b.x - a.x;
    const dY = b.y - a.y;
    return Math.sqrt(dX * dX + dY * dY);
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

function equals(a, b, tolerance) {
    const f = MathUtil.equals;
    return f(a.x, b.x, tolerance) && f(a.y, b.y, tolerance);
}

function interpolate(a, b, t) {
    const f = InterpolationUtil.linear;
    return {
        x: f(a.x, b.x, t),
        y: f(a.y, b.y, t),
    };
}

function length(p) {
    return distance(p, { x: 0, y: 0 });
}

function magnitude(p) {
    return length(p);
}

function project(p, distance, angle) {
    return {
        x: p.x + distance * TrigoUtil.cosDeg(angle),
        y: p.y + distance * TrigoUtil.sinDeg(angle),
    };
}

function rect(points) {
    let point;
    const pointsX = [];
    const pointsY = [];

    for (let i = 0, j = points.length; i < j; i++) {
        point = points[i];
        pointsX.push(point.x);
        pointsY.push(point.y);
    }

    const minF = Math.min;
    const minX = minF(...pointsX);
    const minY = minF(...pointsY);
    const maxF = Math.max;
    const maxX = maxF(...pointsX);
    const maxY = maxF(...pointsY);

    return {
        topLeft: { x: minX, y: minY },
        topRight: { x: maxX, y: minY },
        bottomRight: { x: maxX, y: maxY },
        bottomLeft: { x: minX, y: maxY },
    };
}

function rotate(p, angle, pivot) {
    const pointPivot = pivot || { x: 0.0, y: 0.0 };
    const pointRel = subtract(p, pointPivot);
    const angleCos = TrigoUtil.cosDeg(angle);
    const angleSin = TrigoUtil.sinDeg(angle);
    const pointRot = {
        x: pointRel.x * angleCos - pointRel.y * angleSin,
        y: pointRel.x * angleSin + pointRel.y * angleCos,
    };
    const pointAbs = add(pointRot, pointPivot);
    return pointAbs;
}

function scale(p, amount) {
    return {
        x: p.x * amount,
        y: p.y * amount,
    };
}

function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

function translate(p, x, y) {
    return {
        x: p.x + x,
        y: p.y + y,
    };
}

export default {
    add,
    angle,
    cross,
    distance,
    dot,
    equals,
    interpolate,
    length,
    magnitude,
    project,
    rect,
    rotate,
    scale,
    subtract,
    translate,
};
