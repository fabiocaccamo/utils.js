var PointUtil = {

    add: function(a, b)
    {
        return {
            x: (a.x + b.x),
            y: (a.y + b.y)
        };
    },

    angle: function(a, b)
    {
        var angle = TrigoUtil.angleDeg((b.y - a.y), (b.x - a.x));
        return TrigoUtil.cycleDeg(angle);
    },

    cross: function(a, b)
    {
        // z coordinate of the cross product; x and y coordinates are zero
        return ((a.y * b.x) - (a.x * b.y));
    },

    distance: function(a, b)
    {
        var dX = (b.x - a.x);
        var dY = (b.y - a.y);
        return Math.sqrt((dX * dX) + (dY * dY));
    },

    dot: function(a, b)
    {
        return ((a.x * b.x) + (a.y * b.y));
    },

    equals: function(a, b, tolerance)
    {
        var f = MathUtil.equals;
        return (f(a.x, b.x, tolerance) && f(a.y, b.y, tolerance));
    },

    interpolate: function(a, b, t)
    {
        var f = InterpolationUtil.linear;
        return {
            x: f(a.x, b.x, t),
            y: f(a.y, b.y, t)
        };
    },

    project: function(p, distance, angle)
    {
        return {
            x: (p.x + (distance * TrigoUtil.cosDeg(angle))),
            y: (p.y + (distance * TrigoUtil.sinDeg(angle)))
        }
    },

    rotate: function(p, angle, pivot)
    {
        var pointPivot = (pivot || { x:0.0, y:0.0 });
        var pointRel = PointUtil.subtract(p, pointPivot);
        var angleCos = TrigoUtil.cosDeg(angle);
        var angleSin = TrigoUtil.sinDeg(angle);
        var pointRot = {
            x: (pointRel.x * angleCos) - (pointRel.y * angleSin),
            y: (pointRel.x * angleSin) + (pointRel.y * angleCos)
        };
        var pointAbs = PointUtil.add(pointRot, pointPivot);
        return pointAbs;
    },

    scale: function(p, amount)
    {
        return {
            x: (p.x * amount),
            y: (p.y * amount)
        };
    },

    subtract: function(a, b)
    {
        return {
            x: (a.x - b.x),
            y: (a.y - b.y)
        };
    },

    translate: function(p, x, y)
    {
        return {
            x: (p.x + x),
            y: (p.y + y)
        };
    }

};