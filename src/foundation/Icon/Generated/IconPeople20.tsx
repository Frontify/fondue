import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPeople20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPeople20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M14.221 14.31h3.768a5.746 5.746 0 0 0-2.993-5.635 4.014 4.014 0 0 0 1.325-2.985c0-2.222-1.8-4.023-4.02-4.023a4.022 4.022 0 0 0-3.853 2.877c.395.016.78.08 1.148.184a2.872 2.872 0 0 1 5.577.962A2.875 2.875 0 0 1 13.2 8.42c.104.365.173.747.203 1.14.147-.042.29-.092.43-.15a4.603 4.603 0 0 1 3 3.751h-3.445c.315.352.595.737.833 1.15Z" />
                <path
                    fillRule="evenodd"
                    d="M2.5 17.759c0 .194.01.385.028.574h11.438a5.746 5.746 0 0 0-2.993-5.636 4.014 4.014 0 0 0 1.325-2.984c0-2.222-1.8-4.023-4.02-4.023A4.021 4.021 0 0 0 4.26 9.713c0 1.173.502 2.228 1.302 2.964A5.746 5.746 0 0 0 2.5 17.759Zm5.779-4.023c-.554 0-1.08-.112-1.56-.315a4.603 4.603 0 0 0-3.034 3.763h9.124a4.603 4.603 0 0 0-2.999-3.75c-.472.194-.99.302-1.531.302Zm2.87-4.023a2.872 2.872 0 0 1-2.87 2.873 2.872 2.872 0 0 1-2.871-2.873 2.872 2.872 0 0 1 2.87-2.874 2.872 2.872 0 0 1 2.872 2.874Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPeople20);
export default Memo;
