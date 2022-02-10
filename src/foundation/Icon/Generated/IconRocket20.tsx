import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRocket20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconRocket20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M11.41 8.658c-.847-.846-.847-2.154 0-2.923.848-.77 2.157-.847 2.927 0 .77.846.848 2.154 0 2.923-.847.77-2.156.847-2.927 0Zm2.08-.846c-.308.385-.847.385-1.232 0s-.308-.846 0-1.23c.308-.386.847-.309 1.232 0 .385.307.385.845 0 1.23Z" />
                <path d="m3.246 13.736 1.58-2.345 3.818 3.813-2.394 1.61.539.538c1.463 1.308 4.16 1.308 6.162 0 1.971-1.363 2.823-3.696 1.747-5.383 2.835-3.128 4.642-8.085 3.029-9.696-1.617-1.615-6.598.2-9.728 3.043-1.68-.984-3.954-.131-5.293 1.727-1.386 2-1.386 4.693 0 6.155l.54.538Zm3.697-7.54-.965 1.436a11.58 11.58 0 0 0-.197.294l-2.613 3.887c-.462-1.077-.308-2.77.54-4 .847-1.309 2.233-1.924 3.235-1.617Zm5.315 10.156c-1.31.846-2.927 1-4.006.539l5.623-3.77c.308 1-.308 2.385-1.617 3.231Zm4.621-13.156c1.079 1.077-.77 5.77-3.466 8.463-1.155 1.154-2.542 2.077-3.851 2.77l-3.775-3.77c.54-1.462 1.464-2.847 2.62-4.001 2.618-2.693 7.394-4.54 8.472-3.462Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket20);
export default Memo;
