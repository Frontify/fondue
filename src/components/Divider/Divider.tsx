/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from "react";

export enum DividerStyle {
    NoLine = "noline",
    Dashed = "dashed",
    Solid = "solid",
    Dotted = "dotted",
}

export enum DividerHeight {
    Height10 = "10px",
    Height25 = "25px",
    Height50 = "50px",
    Height75 = "75px",
    Height100 = "100px",
}

export interface DividerProps {
    style?: DividerStyle;
    height?: DividerHeight;
    color?: string;
}

export default function Divider({
    style = DividerStyle.Solid,
    height = DividerHeight.Height50,
    color = "#CCC",
}: DividerProps): React.ReactElement<DividerProps> {
    const divStyle: CSSProperties = { height: height, display: "flex", alignItems: "center" };

    const lineStyle: CSSProperties = {
        border: 0,
        borderTopWidth: "1px",
        borderTopColor: style === "noline" ? "transparent" : color,
        borderStyle: style === "noline" ? "none" : style,
        margin: "0",
        width: "100%",
    };

    return (
        <div style={divStyle} data-test-id="divider">
            <hr style={lineStyle} data-test-id="divider-hr" />
        </div>
    );
}
