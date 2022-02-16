import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconArrowRoundClockwise32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowRoundClockwise32"
            {...props}
        >
            <path
                fill="currentColor"
                d="m18.071 23.727.259.966-.259-.966Zm4.691-9.539a1 1 0 1 0 1.932-.517l-1.932.517Zm.334 7.426a1 1 0 1 0-1.65-1.13l1.65 1.13ZM19.5 14a1 1 0 1 0 0 2v-2Zm5.5 1v1h1v-1h-1Zm1-5.5a1 1 0 1 0-2 0h2Zm-8.188 13.262c-3.813 1.021-7.551-1.137-8.573-4.95l-1.932.517c1.308 4.88 6.143 7.672 11.023 6.364l-.518-1.931Zm-8.573-4.95c-1.022-3.814 1.136-7.552 4.95-8.573l-.518-1.932C8.791 8.614 6 13.449 7.307 18.329l1.932-.517Zm4.95-8.573c3.813-1.022 7.551 1.136 8.573 4.95l1.932-.518C23.386 8.79 18.55 5.999 13.67 7.307l.518 1.932Zm8.082 11.81-.825-.565v-.001l.001-.001.001-.002.001-.001-.003.004-.029.039a3.764 3.764 0 0 1-.146.176 5.889 5.889 0 0 1-.653.63 7.331 7.331 0 0 1-2.806 1.434l.518 1.931a9.33 9.33 0 0 0 3.567-1.827 7.88 7.88 0 0 0 .876-.847 5.537 5.537 0 0 0 .292-.361l.02-.027.006-.01a.135.135 0 0 0 .003-.004v-.001l.001-.001-.824-.566ZM19.5 16H25v-2h-5.5v2Zm6.5-1V9.5h-2V15h2Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundClockwise32);
export default Memo;
