import { equals as mathEquals } from '../math.js';
import { linear } from '../interpolation.js';
import { angleDeg, cosDeg, cycleDeg, sinDeg } from '../trigo.js';

export function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export function angle(a, b) {
    const angle = angleDeg(b.y - a.y, b.x - a.x);
    return cycleDeg(angle);
}

export function cross(a, b) {
    // z coordinate of the cross product; x and y coordinates are zero
    return a.x * b.y - a.y * b.x;
}

export function distance(a, b) {
    const dX = b.x - a.x;
    const dY = b.y - a.y;
    return Math.sqrt(dX * dX + dY * dY);
}

export function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

export function equals(a, b, tolerance) {
    const f = mathEquals;
    return f(a.x, b.x, tolerance) && f(a.y, b.y, tolerance);
}

export function interpolate(a, b, t) {
    const f = linear;
    return {
        x: f(a.x, b.x, t),
        y: f(a.y, b.y, t),
    };
}

export function length(p) {
    return distance(p, { x: 0, y: 0 });
}

export function magnitude(p) {
    return length(p);
}

export function project(p, distance, angle) {
    return {
        x: p.x + distance * cosDeg(angle),
        y: p.y + distance * sinDeg(angle),
    };
}

export function rect(points) {
    // single loop instead of Math.min(...values), that throws a RangeError with large arrays
    let point;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0, j = points.length; i < j; i++) {
        point = points[i];
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
    }

    return {
        topLeft: { x: minX, y: minY },
        topRight: { x: maxX, y: minY },
        bottomRight: { x: maxX, y: maxY },
        bottomLeft: { x: minX, y: maxY },
    };
}

export function rotate(p, angle, pivot) {
    const pointPivot = pivot || { x: 0.0, y: 0.0 };
    const pointRel = subtract(p, pointPivot);
    const angleCos = cosDeg(angle);
    const angleSin = sinDeg(angle);
    const pointRot = {
        x: pointRel.x * angleCos - pointRel.y * angleSin,
        y: pointRel.x * angleSin + pointRel.y * angleCos,
    };
    const pointAbs = add(pointRot, pointPivot);
    return pointAbs;
}

export function scale(p, amount) {
    return {
        x: p.x * amount,
        y: p.y * amount,
    };
}

export function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

export function translate(p, x, y) {
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
