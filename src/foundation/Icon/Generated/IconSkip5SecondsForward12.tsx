import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSkip5SecondsForward12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSkip5SecondsForward12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M5.675 9.78h-2.25A1.925 1.925 0 0 1 1.5 7.857v-2c0-1.064.862-1.925 1.925-1.925h1.68l-.822-.821a.358.358 0 0 1 .001-.505c.14-.14.365-.14.504 0L6.305 4.12a.355.355 0 0 1 0 .504L4.788 6.14a.358.358 0 0 1-.504 0 .356.356 0 0 1 0-.505l.855-.855H3.425c-.594 0-1.075.48-1.075 1.075v2c0 .593.481 1.075 1.075 1.075h2.25a.425.425 0 0 1 0 .85Zm2.117-2.605c.104.539.67.907 1.353.907.847 0 1.446-.577 1.446-1.386 0-.753-.506-1.281-1.237-1.281-.385 0-.644.149-.77.314v-.93h1.798V4.15H7.924V6.4h.61c.099-.22.33-.347.605-.347.418 0 .704.286.704.704 0 .39-.27.688-.688.688-.313 0-.588-.171-.687-.457l-.676.187Z"
            />
        </svg>
    );
}

const Memo = memo(IconSkip5SecondsForward12);
export default Memo;
