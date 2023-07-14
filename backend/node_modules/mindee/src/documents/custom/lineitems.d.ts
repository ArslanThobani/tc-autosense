import { BBox, Polygon } from "../../geometry";
import { ListField, ListFieldValue } from "./fields";
export declare class Line {
    /**
     * Number of the current line.
     * Starts to 1.
     */
    rowNumber: number;
    /**
     * List of the fields associated to the current line, identified by their column name.
     */
    fields: Map<string, ListFieldValue>;
    /**
     * The BBox of the current line.
     */
    bbox: BBox;
    /**
     * The height tolerance used to build the line.
     * It helps when the height of an expected line can vary.
     */
    heightTolerance: number;
    constructor(rowNumber: number, heightTolerance: number);
    /**
     * Extends the current bbox of the line with the bbox.
     */
    extendWithBbox(bbox: BBox): void;
    /**
     * Extends the current bbox of the line with the polygon.
     */
    extendWith(polygon: Polygon): void;
    /**
     * Check if the bbox fits the current line.
     */
    contains(bbox: BBox): boolean;
    updateField(name: string, fieldValue: ListFieldValue): void;
}
export declare class LineItems {
    rows: Line[];
    constructor(lines: Line[]);
}
export declare function getLineItems(anchorNames: string[], heigthLineTolerance: number, fieldNamesTargeted: string[], fields: Map<string, ListField>): LineItems;
