import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconLayoutVertical(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconLayoutVertical"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.75 13.85A1.15 1.15 0 0119.6 15H4.4a1.15 1.15 0 01-1.15-1.15v-2.7c0-.635.515-1.15 1.15-1.15h15.2c.635 0 1.15.515 1.15 1.15v2.7zm-1.5-.35v-2H4.75v2h14.5zM20.75 7.36a1.15 1.15 0 01-1.15 1.15H4.4a1.15 1.15 0 01-1.15-1.15v-2.7c0-.635.515-1.15 1.15-1.15h15.2c.635 0 1.15.515 1.15 1.15v2.7zm-1.5-.35v-2H4.75v2h14.5zM20.75 20.34a1.15 1.15 0 01-1.15 1.15H4.4a1.15 1.15 0 01-1.15-1.15v-2.7c0-.635.515-1.15 1.15-1.15h15.2c.635 0 1.15.515 1.15 1.15v2.7zm-1.5-.35v-2H4.75v2h14.5z"
            />
        </svg>
    );
}

const MemoIconLayoutVertical = React.memo(IconLayoutVertical);
export default MemoIconLayoutVertical;
