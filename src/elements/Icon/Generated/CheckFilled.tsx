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

function IconCheckFilled(props: IconProps): React.ReactElement<IconProps> {
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
                d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M7.95259233,12.8176491 C7.67752864,13.0927128 7.67752864,13.5386792 7.95259233,13.8137429 L10.4818892,16.3430398 L16.0287642,10.7961648 C16.3092213,10.5157077 16.3092213,10.0609969 16.0287642,9.78053977 C16.0284374,9.780213 16.0281103,9.77988654 16.0277829,9.77956039 C15.7473269,9.50018718 15.2934956,9.501065 15.0141224,9.78152105 L10.4818892,14.331321 L8.95108626,12.8152373 C8.67430678,12.5411192 8.22804436,12.5421971 7.95259233,12.8176491 Z"
                id="Icon_check_filled"
            />
        </svg>
    );
}

const MemoIconCheckFilled = React.memo(IconCheckFilled);
export default MemoIconCheckFilled;
