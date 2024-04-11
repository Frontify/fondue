/* (c) Copyright Frontify Ltd., all rights reserved. */

const ANGLED_LINE_OFFSET = 4;
const ANGLED_LINE_LENGTH = 30;
const HORIZONTAL_LABEL_LINE_LENGTH = 15;

export const getLineCoordinates = (
    centroidAngle: number,
    centroid: [number, number],
    radius: number,
    flipLabelOrientation: boolean,
) => {
    const [centroidX, centroidY] = centroid;
    const angledLineStart = radius / 2 + ANGLED_LINE_OFFSET;
    const angledLineEnd = angledLineStart + ANGLED_LINE_LENGTH;

    /**
     * The line has two segments: x1,y1 -> x2,y2 and x2,y2 -> x3,y2
     * x1,y1 -> x2,y2 is a continuation of a line connecting the center of the pie circle to the centroid of the slice.
     *  x1,y1 lies 4px outside the pie circle, under the same angle as the centroid of the slice
     *  x2,y2 lies 30px from x1,y1 under the same angle
     * x2,y2 -> x3,y2 is a horizontal line leading away from the circle
     *  x3 lies 15px horizontally from x2
     */
    let x1, y1, x2, y2, x3;

    if (centroidAngle <= Math.PI / 2 || flipLabelOrientation) {
        x1 = centroidX + Math.sin(centroidAngle) * angledLineStart;
        y1 = centroidY - Math.cos(centroidAngle) * angledLineStart;
        x2 = centroidX + Math.sin(centroidAngle) * angledLineEnd;
        y2 = centroidY - Math.cos(centroidAngle) * angledLineEnd;
        x3 = x2 + HORIZONTAL_LABEL_LINE_LENGTH;
    } else if (centroidAngle > Math.PI / 2 && centroidAngle <= Math.PI) {
        x1 = centroidX + Math.cos(centroidAngle - Math.PI / 2) * angledLineStart;
        y1 = centroidY + Math.sin(centroidAngle - Math.PI / 2) * angledLineStart;
        x2 = centroidX + Math.cos(centroidAngle - Math.PI / 2) * angledLineEnd;
        y2 = centroidY + Math.sin(centroidAngle - Math.PI / 2) * angledLineEnd;
        x3 = x2 + HORIZONTAL_LABEL_LINE_LENGTH;
    } else if (centroidAngle > Math.PI && centroidAngle < Math.PI * 1.5) {
        x1 = centroidX - Math.sin(centroidAngle - Math.PI) * angledLineStart;
        y1 = centroidY + Math.cos(centroidAngle - Math.PI) * angledLineStart;
        x2 = centroidX - Math.sin(centroidAngle - Math.PI) * angledLineEnd;
        y2 = centroidY + Math.cos(centroidAngle - Math.PI) * angledLineEnd;
        x3 = x2 - HORIZONTAL_LABEL_LINE_LENGTH;
    } else {
        x1 = centroidX - Math.cos(centroidAngle - Math.PI * 1.5) * angledLineStart;
        y1 = centroidY - Math.sin(centroidAngle - Math.PI * 1.5) * angledLineStart;
        x2 = centroidX - Math.cos(centroidAngle - Math.PI * 1.5) * angledLineEnd;
        y2 = centroidY - Math.sin(centroidAngle - Math.PI * 1.5) * angledLineEnd;
        x3 = x2 - HORIZONTAL_LABEL_LINE_LENGTH;
    }

    return {
        x1,
        y1,
        x2,
        y2,
        x3,
    };
};
