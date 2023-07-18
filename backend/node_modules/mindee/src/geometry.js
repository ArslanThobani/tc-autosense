"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeX = exports.isPointInPolygonX = exports.getMinMaxX = exports.isPointInX = exports.relativeY = exports.isPointInPolygonY = exports.getMinMaxY = exports.isPointInY = exports.getCentroid = exports.getBBoxForPolygons = exports.getBbox = exports.mergeBbox = exports.getBoundingBoxFromBBox = exports.getBoundingBox = void 0;
/**
 * Given a Polygon, calculate a polygon that encompasses all points.
 */
function getBoundingBox(polygon) {
    const bbox = getBbox(polygon);
    return [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[1]],
        [bbox[2], bbox[3]],
        [bbox[0], bbox[3]],
    ];
}
exports.getBoundingBox = getBoundingBox;
/**
 * Given a BBox, generate the associated bounding box.
 */
function getBoundingBoxFromBBox(bbox) {
    return [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[1]],
        [bbox[2], bbox[3]],
        [bbox[0], bbox[3]],
    ];
}
exports.getBoundingBoxFromBBox = getBoundingBoxFromBBox;
/**
 * Given 2 bbox, merge them.
 */
function mergeBbox(bbox1, bbox2) {
    return [
        Math.min(bbox1[0], bbox2[0]),
        Math.min(bbox1[1], bbox2[1]),
        Math.max(bbox1[2], bbox2[2]),
        Math.max(bbox1[3], bbox2[3]),
    ];
}
exports.mergeBbox = mergeBbox;
/**
 * Given a Polygon, calculate a bounding box that encompasses all points.
 */
function getBbox(polygon) {
    const allY = polygon.map((point) => point[1]);
    const allX = polygon.map((point) => point[0]);
    const yMin = Math.min(...allY);
    const yMax = Math.max(...allY);
    const xMin = Math.min(...allX);
    const xMax = Math.max(...allX);
    return [xMin, yMin, xMax, yMax];
}
exports.getBbox = getBbox;
/**
 * Given polygons, calculate a bounding box that encompasses all points.
 */
function getBBoxForPolygons(polygons) {
    const allY = polygons.flatMap((polygon) => polygon.map((point) => point[1]));
    const allX = polygons.flatMap((polygon) => polygon.map((point) => point[0]));
    const yMin = Math.min(...allY);
    const yMax = Math.max(...allY);
    const xMin = Math.min(...allX);
    const xMax = Math.max(...allX);
    return [xMin, yMin, xMax, yMax];
}
exports.getBBoxForPolygons = getBBoxForPolygons;
/**
 * Get the central point (centroid) given a list of points.
 */
function getCentroid(vertices) {
    const numbVertices = vertices.length;
    const xSum = vertices
        .map((point) => point[0])
        .reduce((prev, cur) => prev + cur);
    const ySum = vertices
        .map((point) => point[1])
        .reduce((prev, cur) => prev + cur);
    return [xSum / numbVertices, ySum / numbVertices];
}
exports.getCentroid = getCentroid;
/**
 * Determine if a Point is within two Y coordinates.
 */
function isPointInY(centroid, yMin, yMax) {
    return yMin <= centroid[1] && centroid[1] <= yMax;
}
exports.isPointInY = isPointInY;
/**
 * Get the maximum and minimum Y coordinates in a given list of Points.
 */
function getMinMaxY(vertices) {
    const points = vertices.map((point) => point[1]);
    return { min: Math.min(...points), max: Math.max(...points) };
}
exports.getMinMaxY = getMinMaxY;
/**
 * Determine if a Point is within a Polygon's Y axis.
 */
function isPointInPolygonY(centroid, polygon) {
    const yCoords = getMinMaxY(polygon);
    return isPointInY(centroid, yCoords.min, yCoords.max);
}
exports.isPointInPolygonY = isPointInPolygonY;
/**
 * Calculate the relative Y position of a Polygon.
 *
 * Can be used to order (sort) words in the same column.
 */
function relativeY(polygon) {
    const sum = polygon
        .map((point) => point[1])
        .reduce((prev, cur) => prev + cur);
    return polygon.length * sum;
}
exports.relativeY = relativeY;
/**
 * Determine if a Point is within two X coordinates.
 */
function isPointInX(centroid, xMin, xMax) {
    return xMin <= centroid[0] && centroid[0] <= xMax;
}
exports.isPointInX = isPointInX;
/**
 * Get the maximum and minimum X coordinates in a given list of Points.
 */
function getMinMaxX(vertices) {
    const points = vertices.map((point) => point[0]);
    return { min: Math.min(...points), max: Math.max(...points) };
}
exports.getMinMaxX = getMinMaxX;
/**
 * Determine if a Point is within a Polygon's X axis.
 */
function isPointInPolygonX(centroid, polygon) {
    const xCoords = getMinMaxX(polygon);
    return isPointInX(centroid, xCoords.min, xCoords.max);
}
exports.isPointInPolygonX = isPointInPolygonX;
/**
 * Calculate the relative X position of a Polygon.
 *
 * Can be used to order (sort) words in the same line.
 */
function relativeX(polygon) {
    const sum = polygon
        .map((point) => point[0])
        .reduce((prev, cur) => prev + cur);
    return polygon.length * sum;
}
exports.relativeX = relativeX;
