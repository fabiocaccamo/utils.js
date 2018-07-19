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
        var angle = TrigoUtil.angleD((b.y - a.y), (b.x - a.x));
        return TrigoUtil.cycleD(angle);
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

    equals: function(a, b)
    {
        return ((a.x === b.x) && (a.y === b.y));
    },

    interpolate: function(a, b, amount)
    {
        var f = MathUtil.interpolate.linear;
        return {
            x: f(a.x, b.x, amount),
            y: f(a.y, b.y, amount)
        };
    },

    project: function(p, distance, angle)
    {
        return {
            x: (p.x + (distance * TrigoUtil.cosD(angle))),
            y: (p.y + (distance * TrigoUtil.sinD(angle)))
        }
    },

    rotate: function(p, angle, pivot)
    {
        var pointPivot = (pivot || { x:0.0, y:0.0 });
        var pointRel = GeomUtil.point.subtract(p, pointPivot);
        var angleCos = Trigo.cosD(angle);
        var angleSin = Trigo.sinD(angle);
        var pointRot = {
            x: (pointRel.x * angleCos) - (pointRel.y * angleSin),
            y: (pointRel.x * angleSin) + (pointRel.y * angleCos)
        };
        var pointAbs = GeomUtil.point.subtract(pointRot, pointPivot);
        return pointAbs;
    },

    scale: function(p, amount)
    {
        return {
            x: (a.x * amount),
            y: (a.y * amount)
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
        p.x += x;
        p.y += y;
        return p;
    }

};