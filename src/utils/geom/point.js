import { equals as equalsWithTolerance } from '../math.js';
import { linear } from '../interpolation.js';
import { angleDeg, cosDeg, cycleDeg, sinDeg } from '../trigo.js';
import { isArray } from '../type.js';

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
    const f = equalsWithTolerance;
    return f(a.x, b.x, tolerance) && f(a.y, b.y, tolerance);
}

export function interpolate(a, b, t) {
    const f = linear;
    return {
        x: f(a.x, b.x, t),
        y: f(a.y, b.y, t),
    };
}

export function isInRect(p, rectOrPoints) {
    // accepts both an array of points and a rect object returned by the rect function
    const r = isArray(rectOrPoints) ? rect(rectOrPoints) : rectOrPoints;
    return (
        p.x >= r.topLeft.x &&
        p.x <= r.bottomRight.x &&
        p.y >= r.topLeft.y &&
        p.y <= r.bottomRight.y
    );
}

export function isInTriangle(p, points) {
    // the point is inside (or on the edges of) the triangle when it lies on
    // the same side of all three edges
    const [a, b, c] = points;
    const crossAB = cross(subtract(b, a), subtract(p, a));
    const crossBC = cross(subtract(c, b), subtract(p, b));
    const crossCA = cross(subtract(a, c), subtract(p, c));
    const hasNegative = crossAB < 0 || crossBC < 0 || crossCA < 0;
    const hasPositive = crossAB > 0 || crossBC > 0 || crossCA > 0;
    return !(hasNegative && hasPositive);
}

export function isOnSegment(p, points, tolerance) {
    const [a, b] = points;
    const ab = subtract(b, a);
    const ap = subtract(p, a);
    const abLengthSq = dot(ab, ab);
    // when a and b coincide the segment is a single point
    const t = abLengthSq > 0 ? Math.max(0, Math.min(1, dot(ap, ab) / abLengthSq)) : 0;
    const closest = interpolate(a, b, t);
    return equalsWithTolerance(distance(p, closest), 0, tolerance);
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
    isInRect,
    isInTriangle,
    isOnSegment,
    length,
    magnitude,
    project,
    rect,
    rotate,
    scale,
    subtract,
    translate,
};
