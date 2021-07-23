/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum DividerStyle {
    NoLine = "border-none",
    Dashed = "border-dashed",
    Solid = "border-solid",
    Dotted = "border-dotted",
}

export enum DividerHeight {
    Height10 = "h-[10px]",
    Height25 = "h-[25px]",
    Height50 = "h-[50px]",
    Height75 = "h-[75px]",
    Height100 = "h-[100px]",
}

export type DividerProps = {
    style?: DividerStyle;
    height?: DividerHeight;
    color?: string;
};

export default function Divider({
    style = DividerStyle.Solid,
    height = DividerHeight.Height50,
    color: borderTopColor = "#CCC",
}: DividerProps): React.ReactElement<DividerProps> {
    return (
        <div className={`flex items-center ${height}`} data-test-id="divider">
            <hr className={`border-t m-0 w-full ${style}`} style={{ borderTopColor }} data-test-id="divider-hr" />
        </div>
    );
}
