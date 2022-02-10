import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMegaphone20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMegaphone20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="m13.396 1.898-4.09 2.697H3.75c-1.15 0-2.083.923-2.083 2.06v3.436c0 .722.376 1.358.945 1.726l1.445 5.989c.074.31.354.527.675.527h1.796a.69.69 0 0 0 .694-.686V12.15h2.083l4.091 2.698c.228.15.496.23.77.23.768 0 1.39-.615 1.39-1.373V3.04c0-.272-.082-.537-.234-.762a1.398 1.398 0 0 0-1.926-.381Zm-6.868 8.88h-2.78a.69.69 0 0 1-.693-.688V6.657a.69.69 0 0 1 .695-.687h2.778v4.808ZM5.28 16.96h.553v-4.81H4.12l1.16 4.809ZM7.916 5.969v4.808h1.81l4.44 2.929V3.04l-4.44 2.928h-1.81Z"
                    clipRule="evenodd"
                />
                <path d="M17.639 5.969a.694.694 0 0 0-.695.694v3.42a.694.694 0 1 0 1.39 0v-3.42a.694.694 0 0 0-.695-.694Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMegaphone20);
export default Memo;
