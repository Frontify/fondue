import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAnnotations(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAnnotations"
            {...props}
        >
            <path d="M16.643 22a5.357 5.357 0 1 1 0-10.714 5.357 5.357 0 0 1 0 10.714Zm0-1.429a3.929 3.929 0 1 0 0-7.857 3.929 3.929 0 0 0 0 7.857Zm-.656-4.996h-1.29v-.077c0-.802.58-1.684 1.923-1.684 1.178 0 1.937.648 1.937 1.5 0 .783-.525 1.232-.944 1.665l-.985 1.028v.058h2.01v1.078h-3.86v-.844l1.861-1.884c.272-.272.572-.575.572-.963 0-.314-.261-.575-.618-.575-.38 0-.61.287-.61.61 0 .03.004.069.004.088Zm-8.63-2.86A5.357 5.357 0 1 1 7.357 2a5.357 5.357 0 0 1 0 10.714Zm0-1.43a3.929 3.929 0 1 0 0-7.856 3.929 3.929 0 0 0 0 7.857ZM8.44 9.858H7.077V5.86h-.065l-1.166.813V5.48l1.231-.86H8.44v5.237Z" />
        </svg>
    );
}

const Memo = memo(IconAnnotations);
export default Memo;
