import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconTravelPlaces(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTravelPlaces"
            {...props}
        >
            <path d="M8.75 10h.75a2.5 2.5 0 010 5h-.75v5.19h6.5V7.89h-6.5V10zm-1.5.012V7.89H5.061c-.413 0-.77.15-1.07.45-.3.3-.451.658-.451 1.07v9.24c0 .426.15.789.45 1.09.301.3.658.45 1.071.45H7.25v-5.202a2.5 2.5 0 010-4.976zm9.5-2.122v12.3h2.17c.426 0 .789-.15 1.09-.45.3-.301.45-.664.45-1.09V9.41c0-.412-.15-.77-.45-1.07-.301-.3-.664-.45-1.09-.45h-2.17zm-.14-1.54h3.08c.639 0 1.183.225 1.634.676.45.45.676.989.676 1.615v10.78c0 .638-.225 1.182-.676 1.633-.45.45-.995.676-1.634.676H4.31a2.226 2.226 0 01-1.634-.676A2.226 2.226 0 012 19.42V8.64c0-.625.225-1.163.676-1.614.45-.45.995-.676 1.634-.676h3.08V4.04c0-.426.15-.789.45-1.09.3-.3.664-.45 1.09-.45h6.14c.426 0 .79.15 1.09.45.3.301.45.664.45 1.09v2.31zm-1.54 0V4.81a.742.742 0 00-.225-.545.742.742 0 00-.545-.225H9.68a.72.72 0 00-.525.225.742.742 0 00-.225.545v1.54h6.14zM7.5 11.5a1 1 0 100 2h2a1 1 0 000-2h-2z" />
        </svg>
    );
}

const MemoIconTravelPlaces = React.memo(IconTravelPlaces);
export default MemoIconTravelPlaces;
