import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDontBox20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDoAndDontBox20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M16.078 12.994a.55.55 0 0 0-.777.012l-1.537 1.586-.404-.456a.55.55 0 1 0-.823.729l.797.9a.55.55 0 0 0 .806.018l1.95-2.012a.55.55 0 0 0-.012-.777ZM4.575 4.575a.55.55 0 0 0 0 .777l.544.544-.544.544a.55.55 0 1 0 .777.777l.544-.544.544.544a.55.55 0 0 0 .777-.777l-.544-.544.544-.544a.55.55 0 0 0-.777-.777l-.544.544-.544-.544a.55.55 0 0 0-.777 0Z" />
                <path
                    fillRule="evenodd"
                    d="M9.274 3.59a4.12 4.12 0 1 0-6.216 5.285v5.932c0 .443.156.82.469 1.134.313.313.69.47 1.133.47h6.066a4.12 4.12 0 1 0 6.216-5.285V5.191c0-.442-.156-.82-.47-1.133a1.544 1.544 0 0 0-1.132-.47H9.274ZM4.21 9.596a4.12 4.12 0 0 0 5.564-4.853h5.565c.136 0 .22.035.317.132s.131.18.131.317v5.212a4.12 4.12 0 0 0-5.564 4.853H4.66a.396.396 0 0 1-.317-.132.396.396 0 0 1-.132-.318v-5.21Zm10.001 7.638a3.022 3.022 0 1 0 0-6.044 3.022 3.022 0 0 0 0 6.044ZM5.787 8.81a3.022 3.022 0 1 0 0-6.044 3.022 3.022 0 0 0 0 6.044Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDontBox20);
export default Memo;
