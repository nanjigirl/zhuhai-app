define(function () {
    var Point = cesc.require('esri/geometry/Point'),
        Polyline = cesc.require('esri/geometry/Polyline'),
        Polygon = cesc.require('esri/geometry/Polygon');
    var regExes = {
        'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
        'spaces': /\s+/,
        'parenComma': /\)\s*,\s*\(/,
        'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,  // can't use {2} here
        'trimParens': /^\s*\(?(.*?)\)?\s*$/
    };
    return {
        WkbToPolyline : function (wkt, spatialreference){
            var points = this.readByWKB(wkt);
            var json = {
                paths: [points],
                spatialReference: spatialreference
            }
            var polyline = new Polyline(json);
            return polyline;
        },
        /**
         *wkt转化成arcgis的Point对象
         * @param wkt
         * @returns {Polyline}
         * @constructor
         */
        WktToPoint : function (wkt,spatialreference){
            var pt = this.read(wkt);
            var json = {
                x:pt[0],
                y:pt[1],
                spatialReference: spatialreference
            }
            var point = new Point(json);
            return point;
        },
        /**
         *wkt转化成arcgis的Polyline对象
         * @param wkt
         * @returns {Polyline}
         * @constructor
         */
        WktToPolyline : function (wkt, spatialreference){
            var points = this.read(wkt);
            var json = {
                paths: [points],
                spatialReference: spatialreference
            }
            var polyline = new Polyline(json);
            return polyline;
        },
        /**
         * wkt转化成arcgis的Polygon对象
         * @param wkt
         * @returns {Polygon}
         * @constructor
         */
        WktToPolygon : function (wkt, spatialreference){
            var points = this.read(wkt);
            var json = {
                rings: points,
                spatialReference: {"wkid":4326}
            }
            var polygon = new Polygon(json);
            return polygon;
        },
        /**
         * @param geometry
         */
        PointToWKT : function (geometry){
            console.log(geometry);
            return "POINT ("+geometry.x+" "+geometry.y+")";
        },
        /**
         * @param geometry
         */
        PolygonToWKT : function (geometry){
            var wkt = [];
            var rings = geometry.rings;
            for(var i in rings){
                var ring = rings[i];
                for(var j in ring){
                    var p = ring[j];
                    wkt.push(p.join(" "));
                }
            }
            return "POLYGON (("+wkt.join(",")+"))";
        },
        /**
         * @param geometry
         */
        LineToWKT :function (geometry){
            var wkt = [];
            var paths = geometry.paths;
            for(var i in paths){
                var path = paths[i];
                for(var j in path){
                    var p = path[j];
                    wkt.push(p.join(" "));
                }
            }
            return "LINESTRING ("+wkt.join(",")+")";
        },
        read: function(wkt) {
            var features, type, str;
            wkt = wkt.replace(/[\n\r]/g, " ");
            var matches = regExes.typeStr.exec(wkt);
            if(matches) {
                type = matches[1].toLowerCase();
                str = matches[2];
                if(this.parse[type]) {
                    features = this.parse[type].apply(this, [str]);
                    //console.log(features);
                }


            }
            return features;
        },
        readByWKB: function(wkt) {
            var features, type, str;
            wkt = wkt.replace(/[\n\r]/g, " ");
            var matches = regExes.typeStr.exec(wkt);
            if(matches) {
                type = matches[1].toLowerCase()+matches[2].toLowerCase();
                str = matches[3];
                if(this.parse[type]) {
                    features = this.parse[type].apply(this, [str]);
                    //console.log(features);
                }


            }
            return features;
        },
        /**
         * Method: extractGeometry
         * Entry point to construct the WKT for a single Geometry object.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.Geometry>}
         *
         * Returns:
         * {String} A WKT string of representing the geometry
         */
        extractGeometry: function(geometry) {
            var type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
            if (!this.extract[type]) {
                return null;
            }
            if (this.internalProjection && this.externalProjection) {
                geometry = geometry.clone();
                geometry.transform(this.internalProjection, this.externalProjection);
            }
            var wktType = type == 'collection' ? 'GEOMETRYCOLLECTION' : type.toUpperCase();
            var data = wktType + '(' + this.extract[type].apply(this, [geometry]) + ')';
            return data;
        },
        trim: function(str){
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        },
        /**
         * Object with properties corresponding to the geometry types.
         * Property values are functions that do the actual parsing.
         */
        parse: {
            /**
             * Return point feature given a point WKT fragment.
             * @param {String} str A WKT fragment representing the point
             * @returns {OpenLayers.Feature.Vector} A point feature
             * @private
             */
            'point': function (str) {
                var coords = this.trim(str).split(regExes.spaces);
                for (i in coords)
                    coords[i]=Number(coords[i]);
                return coords;//new esri.geometry.Point(coords[0], coords[1]);
            },
            'pointzm': function (str) {
                var coords = this.trim(str).split(regExes.spaces);
                for (i in coords)
                    coords[i]=Number(coords[i]);
                return coords.slice(0,2);//new esri.geometry.Point(coords[0], coords[1]);
            },
            /**
             * Return a multipoint feature given a multipoint WKT fragment.
             * @param {String} str A WKT fragment representing the multipoint
             * @returns {OpenLayers.Feature.Vector} A multipoint feature
             * @private
             */
            'multipoint': function (str) {
                var point;
                var points = this.trim(str).split(',');
                var components = [];
                for (var i = 0, len = points.length; i < len; ++i) {
                    point = points[i].replace(regExes.trimParens, '$1');
                    components.push(this.parse.point.apply(this, [point]).geometry);
                }
                return new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.MultiPoint(components)
                );
            },

            /**
             * Return a linestring feature given a linestring WKT fragment.
             * @param {String} str A WKT fragment representing the linestring
             * @returns {OpenLayers.Feature.Vector} A linestring feature
             * @private
             */
            'linestring': function (str) {
                var points = this.trim(str).split(',');

                var components = [];
                for (var i = 0, len = points.length; i < len; ++i) {
                    components.push(this.parse.point.apply(this, [points[i]]));
                }
                return components//new esri.geometry.Polyline(components);
            },
            /**
             * Return a linestring feature given a linestring WKT fragment.
             * @param {String} str A WKT fragment representing the linestring
             * @returns {OpenLayers.Feature.Vector} A linestring feature
             * @private
             */
            'linestringzm': function (str) {
                var points = this.trim(str).split(',');

                var components = [];
                for (var i = 0, len = points.length; i < len; ++i) {
                    components.push(this.parse.pointzm.apply(this, [points[i]]));
                }
                return components//new esri.geometry.Polyline(components);
            },

            /**
             * Return a multilinestring feature given a multilinestring WKT fragment.
             * @param {String} str A WKT fragment representing the multilinestring
             * @returns {OpenLayers.Feature.Vector} A multilinestring feature
             * @private
             */
            'multilinestring': function (str) {
                var line;
                var lines = OpenLayers.String.trim(str).split(regExes.parenComma);
                var components = [];
                for (var i = 0, len = lines.length; i < len; ++i) {
                    line = lines[i].replace(regExes.trimParens, '$1');
                    components.push(this.parse.linestring.apply(this, [line]).geometry);
                }
                return new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.MultiLineString(components)
                );
            },

            /**
             * Return a polygon feature given a polygon WKT fragment.
             * @param {String} str A WKT fragment representing the polygon
             * @returns {OpenLayers.Feature.Vector} A polygon feature
             * @private
             */
            'polygon': function (str) {
                var ring, linestring, linearring;
                var rings = this.trim(str).split(regExes.parenComma);

                var components = [];
                for (var i = 0, len = rings.length; i < len; ++i) {
                    ring = rings[i].replace(regExes.trimParens, '$1');
                    linestring = this.parse.linestring.apply(this, [ring]);
                    components.push(linestring);
                }
                return components;
            }
        }
    }
});


