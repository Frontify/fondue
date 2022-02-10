import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSkip5SecondsBackward12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSkip5SecondsBackward12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.325 9.78h2.25A1.925 1.925 0 0 0 10.5 7.857v-2A1.925 1.925 0 0 0 8.575 3.93h-1.68l.822-.821a.358.358 0 0 0-.001-.505.356.356 0 0 0-.504 0L5.695 4.12a.355.355 0 0 0 0 .504L7.212 6.14a.358.358 0 0 0 .504 0 .356.356 0 0 0 0-.505l-.855-.855h1.714c.594 0 1.075.48 1.075 1.075v2c0 .593-.481 1.075-1.075 1.075h-2.25a.425.425 0 0 0 0 .85ZM1.542 7.175c.104.539.67.907 1.352.907.847 0 1.447-.577 1.447-1.386 0-.753-.506-1.281-1.238-1.281-.385 0-.643.149-.77.314v-.93h1.799V4.15H1.674V6.4h.61c.099-.22.33-.347.605-.347.418 0 .704.286.704.704 0 .39-.27.688-.688.688-.313 0-.588-.171-.687-.457l-.676.187Z"
            />
        </svg>
    );
}

const Memo = memo(IconSkip5SecondsBackward12);
export default Memo;
