import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHome24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconHome24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M15.812 14.195c.8-1.716.788-3.452-.408-4.257-1.173-.79-2.4-.495-3.563.747-1.162-1.242-2.389-1.537-3.562-.747-1.196.805-1.209 2.541-.408 4.257.745 1.597 2.722 3.56 3.94 3.6h.054c1.224-.04 3.201-2.003 3.947-3.6Zm-1.398-2.917c.58.376.588 1.43.04 2.56-.533 1.097-2.057 2.555-2.697 2.574-.615-.02-2.14-1.477-2.672-2.575-.548-1.13-.54-2.183.04-2.559.684-.443 1.39-.207 2.266.876.19.235.567.235.757 0 .876-1.083 1.582-1.319 2.266-.876Z" />
                <path d="M2.142 10.684a.783.783 0 0 0 1.09.193l.611-.428v8.16a2.627 2.627 0 0 0 2.627 2.626h11.06a2.627 2.627 0 0 0 2.627-2.627V10.45l.61.428a.783.783 0 1 0 .899-1.284l-9.217-6.451a.784.784 0 0 0-.898 0l-9.217 6.45a.783.783 0 0 0-.192 1.091ZM18.59 9.353 12 4.74 5.41 9.353v9.255c0 .586.475 1.06 1.06 1.06h11.06a1.06 1.06 0 0 0 1.06-1.06V9.353Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHome24);
export default Memo;
