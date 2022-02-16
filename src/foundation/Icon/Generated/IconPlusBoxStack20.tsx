import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlusBoxStack20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlusBoxStack20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.022 13.587a.652.652 0 0 1-1.305 0v-1.304H6.413a.652.652 0 0 1 0-1.305h1.304V9.674a.652.652 0 1 1 1.305 0v1.304h1.304a.652.652 0 1 1 0 1.305H9.022v1.304Z" />
                <path
                    fillRule="evenodd"
                    d="M15.428 2.5H7.833A2.072 2.072 0 0 0 5.76 4.572V5.76H4.57A2.072 2.072 0 0 0 2.5 7.832v7.596c0 1.145.927 2.072 2.072 2.072h7.596a2.072 2.072 0 0 0 2.071-2.072V14.24h1.19a2.072 2.072 0 0 0 2.071-2.072V4.573A2.072 2.072 0 0 0 15.428 2.5ZM14.24 7.832v5.026h1.19a.69.69 0 0 0 .69-.69V4.572a.69.69 0 0 0-.69-.69H7.832a.69.69 0 0 0-.691.69V5.76h5.026a2.07 2.07 0 0 1 2.071 2.071ZM3.804 7.768c0-.388.315-.703.703-.703h7.725c.388 0 .703.315.703.703v7.725a.702.702 0 0 1-.703.703H4.507a.702.702 0 0 1-.703-.703V7.768Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusBoxStack20);
export default Memo;
