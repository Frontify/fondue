import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconAlignTop(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path
                d="M3.86498663,2 L20.1350134,2 C20.6127323,2 21,2.38931761 21,2.86956522 C21,3.34981283 20.6127323,3.73913043 20.1350134,3.73913043 L3.86498663,3.73913043 C3.3872677,3.73913043 3,3.34981283 3,2.86956522 C3,2.38931761 3.3872677,2 3.86498663,2 Z M11.0869565,8 L6.47826087,12.6086957 C6.13043478,12.9565217 5.60869565,12.9565217 5.26086957,12.6086957 C4.91304348,12.2608696 4.91304348,11.7391304 5.26086957,11.3913043 L11.3478261,5.30434783 C11.6956522,4.95652174 12.2173913,4.95652174 12.5652174,5.30434783 L18.6521739,11.3913043 C19,11.7391304 19,12.2608696 18.6521739,12.6086957 C18.3043478,12.9565217 17.7826087,12.9565217 17.4347826,12.6086957 L12.826087,8 L12.826087,21.1304348 C12.826087,21.6521739 12.4782609,22 11.9565217,22 C11.4347826,22 11.0869565,21.6521739 11.0869565,21.1304348 L11.0869565,8 Z"
                id="Icon_AlignTop"
            />
        </svg>
    );
}

const MemoIconAlignTop = React.memo(IconAlignTop);
export default MemoIconAlignTop;
