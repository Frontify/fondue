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

function IconLightningFilled(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path
                d="M4.583 13.908h6.353l-2.948 7.29a.583.583 0 00.938.646l11.608-10.806a.583.583 0 00-.398-1.01h-6.782l2.788-7.235a.583.583 0 00-.952-.627L4.176 12.906a.583.583 0 00.407 1.002z"
                fillRule="nonzero"
                fill="none"
            />
        </svg>
    );
}

const MemoIconLightningFilled = React.memo(IconLightningFilled);
export default MemoIconLightningFilled;
