import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconProjects(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconProjects"
            {...props}
        >
            <path d="M18.15 15.364v4.826h-1.54v-4.826a1.49 1.49 0 01-.554-.545 1.494 1.494 0 01-.216-.788c0-.276.072-.533.216-.77.144-.238.329-.426.554-.564V7.89h1.54v4.807c.238.138.426.326.564.564.137.237.206.494.206.77 0 .287-.069.55-.206.788-.138.238-.326.42-.564.545zm-10.76 0v4.826H5.85v-4.826a1.387 1.387 0 01-.564-.545 1.546 1.546 0 01-.206-.788c0-.276.069-.533.206-.77a1.52 1.52 0 01.564-.564V7.89h1.54v4.807c.225.138.41.326.554.564.144.237.216.494.216.77 0 .287-.072.55-.216.788a1.49 1.49 0 01-.554.545zm9.22-9.014h3.08c.639 0 1.183.225 1.634.676.45.45.676.989.676 1.615v10.78c0 .638-.225 1.182-.676 1.633-.45.45-.995.676-1.634.676H4.31a2.226 2.226 0 01-1.634-.676A2.226 2.226 0 012 19.42V8.64c0-.625.225-1.163.676-1.614.45-.45.995-.676 1.634-.676h3.08V4.04c0-.426.15-.789.45-1.09.3-.3.664-.45 1.09-.45h6.14c.426 0 .79.15 1.09.45.3.301.45.664.45 1.09v2.31zm-1.54 0V4.81a.742.742 0 00-.225-.545.742.742 0 00-.545-.225H9.68a.72.72 0 00-.525.225.742.742 0 00-.225.545v1.54h6.14zM3.54 9.41v9.24c0 .426.15.789.45 1.09.301.3.658.45 1.071.45h13.86c.425 0 .788-.15 1.088-.45.3-.301.451-.664.451-1.09V9.41c0-.412-.15-.77-.45-1.07-.301-.3-.664-.45-1.09-.45H5.061c-.413 0-.77.15-1.07.45-.3.3-.451.658-.451 1.07z" />
        </svg>
    );
}

const MemoIconProjects = React.memo(IconProjects);
export default MemoIconProjects;
