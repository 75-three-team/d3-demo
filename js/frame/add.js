(function () {
    function d3_functor(v) {
        return typeof v === "function" ? v : function () {
            return v;
        };
    }
    d3.functor = d3_functor;
    //贝塞尔曲线连接起始和终止点
    function _diagonal() {
        var source = function (d, i) {
                return d.source;
            },
            target = function (d, i) {
                return d.target;
            },
            data = null,
            projection = function (d) {
                return [d.x, d.y];
            };

        function diagonal(d, i) {
            var p0 = source.call(this, d, i),
                p3 = target.call(this, d, i),
                m = (p0.y + p3.y) / 2,
                p = [p0, {
                    x: p0.x,
                    y: m
                }, {
                    x: p3.x,
                    y: m
                }, p3];
            p = p.map(projection);
            return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
        }
        diagonal.source = function (x) {
            if (!arguments.length) return source;
            source = d3_functor(x);
            return diagonal;
        };
        diagonal.target = function (x) {
            if (!arguments.length) return target;
            target = d3_functor(x);
            return diagonal;
        };
        diagonal.projection = function (x) {
            if (!arguments.length) return projection;
            projection = x;
            return diagonal;
        };
        return diagonal;
    }
    var __proto__ = d3.constructor.prototype;
    __proto__.diagonal = __proto__.diagonal || function () {
        return _diagonal();
    };
}());