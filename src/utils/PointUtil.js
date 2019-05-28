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
        return ((a.x * b.y) - (a.y * b.x));
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

    length: function(p)
    {
        return PointUtil.distance(p, { x:0, y:0 });
    },

    magnitude: function(p)
    {
        return PointUtil.length(p);
    },

    project: function(p, distance, angle)
    {
        return {
            x: (p.x + (distance * TrigoUtil.cosDeg(angle))),
            y: (p.y + (distance * TrigoUtil.sinDeg(angle)))
        };
    },

    rect: function(points)
    {
        var point, pointsX = [], pointsY = [];

        for (var i = 0, j = points.length; i < j; i++) {
            point = points[i];
            pointsX.push(point.x);
            pointsY.push(point.y);
        }

        var minF = Math.min;
        var minX = minF.apply(null, pointsX);
        var minY = minF.apply(null, pointsY);
        var maxF = Math.max;
        var maxX  = maxF.apply(null, pointsX);
        var maxY = maxF.apply(null, pointsY);

        return {
            topLeft: { x:minX, y:minY },
            topRight: { x:maxX, y:minY },
            bottomRight: { x:maxX, y:maxY },
            bottomLeft: { x:minX, y:maxY }
        };
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