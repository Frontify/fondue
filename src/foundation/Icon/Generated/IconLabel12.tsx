import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLabel12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLabel12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.758 7.513a.815.815 0 0 0 .242-.6.867.867 0 0 0-.242-.601L6.035 1.6c-.17-.161-.393-.3-.67-.415A1.975 1.975 0 0 0 4.59 1H1.843a.784.784 0 0 0-.589.254.821.821 0 0 0-.254.6v2.737c0 .239.058.497.173.774.116.285.258.508.427.67l4.723 4.723a.802.802 0 0 0 .59.242.84.84 0 0 0 .6-.242l3.245-3.245Zm-5.299-5.31c3.139 3.132 4.708 4.706 4.71 4.72a688.32 688.32 0 0 1-3.256 3.245L2.19 5.445a1.104 1.104 0 0 1-.245-.393 1.231 1.231 0 0 1-.112-.46c-.003-1.823 0-2.742.01-2.759H4.59c.108 0 .256.036.443.117.198.082.335.167.425.253Zm-.292 1.714a1.246 1.246 0 0 1-1.25 1.25 1.26 1.26 0 0 1-.886-.364 1.236 1.236 0 0 1-.364-.886c0-.335.127-.644.364-.88.238-.24.548-.37.886-.37.337 0 .647.13.886.37.236.236.364.545.364.88Zm-.954-.291c.08.08.12.177.12.29a.4.4 0 0 1-.12.297.415.415 0 0 1-.296.12.416.416 0 0 1-.297-.12.403.403 0 0 1-.12-.296c0-.114.04-.212.12-.291a.406.406 0 0 1 .297-.126c.114 0 .213.042.296.126Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLabel12);
export default Memo;
