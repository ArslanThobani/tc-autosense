export type MinMax = {
    min: number;
    max: number;
};
/** A point on the document defined by 2 coordinates: X, Y */
export type Point = [number, number];
/** A simple bounding box defined by 4 coordinates: xMin, yMin, xMax, yMax */
export type BBox = [number, number, number, number];
/** A bounding box defined by 4 points. */
export type BoundingBox = [Point, Point, Point, Point];
/** A polygon, composed of several Points. */
export type Polygon = Array<Point>;
/**
 * Given a Polygon, calculate a polygon that encompasses all points.
 */
export declare function getBoundingBox(polygon: Polygon): BoundingBox;
/**
 * Given a BBox, generate the associated bounding box.
 */
export declare function getBoundingBoxFromBBox(bbox: BBox): BoundingBox;
/**
 * Given 2 bbox, merge them.
 */
export declare function mergeBbox(bbox1: BBox, bbox2: BBox): BBox;
/**
 * Given a Polygon, calculate a bounding box that encompasses all points.
 */
export declare function getBbox(polygon: Polygon): BBox;
/**
 * Given polygons, calculate a bounding box that encompasses all points.
 */
export declare function getBBoxForPolygons(polygons: Polygon[]): BBox;
/**
 * Get the central point (centroid) given a list of points.
 */
export declare function getCentroid(vertices: Array<Point>): Point;
/**
 * Determine if a Point is within two Y coordinates.
 */
export declare function isPointInY(centroid: Point, yMin: number, yMax: number): boolean;
/**
 * Get the maximum and minimum Y coordinates in a given list of Points.
 */
export declare function getMinMaxY(vertices: Array<Point>): MinMax;
/**
 * Determine if a Point is within a Polygon's Y axis.
 */
export declare function isPointInPolygonY(centroid: Point, polygon: Polygon): boolean;
/**
 * Calculate the relative Y position of a Polygon.
 *
 * Can be used to order (sort) words in the same column.
 */
export declare function relativeY(polygon: Polygon): number;
/**
 * Determine if a Point is within two X coordinates.
 */
export declare function isPointInX(centroid: Point, xMin: number, xMax: number): boolean;
/**
 * Get the maximum and minimum X coordinates in a given list of Points.
 */
export declare function getMinMaxX(vertices: Array<Point>): MinMax;
/**
 * Determine if a Point is within a Polygon's X axis.
 */
export declare function isPointInPolygonX(centroid: Point, polygon: Polygon): boolean;
/**
 * Calculate the relative X position of a Polygon.
 *
 * Can be used to order (sort) words in the same line.
 */
export declare function relativeX(polygon: Polygon): number;
