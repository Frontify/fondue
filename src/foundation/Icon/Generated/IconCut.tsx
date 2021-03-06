import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCut(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCut"
            {...props}
        >
            <path d="m10.586 10.421 5.3-5.299c1.528-1.529 3.974-1.529 5.4 0l.714.713-6.013 6.013 5.81 5.809-.714.713c-1.529 1.53-3.975 1.53-5.401 0l-4.383-4.382 1.325-1.325 6.522-6.522c-.611-.204-1.324 0-1.834.51L9.16 14.804c.917 1.426.714 3.363-.611 4.687-1.529 1.53-3.975 1.53-5.402 0-1.426-1.528-1.528-3.974 0-5.4 1.223-1.224 3.16-1.428 4.688-.612l1.427-1.427-1.427-1.427c-1.426.917-3.363.714-4.688-.611-1.528-1.733-1.528-4.179 0-5.605 1.53-1.427 3.975-1.53 5.402 0 1.223 1.223 1.427 3.159.611 4.688l1.427 1.324Zm3.363 3.465 3.057 3.058c.51.51 1.223.713 1.835.51l-4.179-4.18-.713.612ZM7.223 8.383c.713-.713.713-1.936 0-2.751-.713-.714-1.936-.714-2.752 0-.713.713-.713 1.936 0 2.751.816.815 1.937.815 2.752 0Zm0 9.58c.713-.714.713-1.937 0-2.752-.713-.713-1.936-.713-2.752 0-.713.714-.713 1.936 0 2.752.816.713 1.937.713 2.752 0Z" />
        </svg>
    );
}

const Memo = memo(IconCut);
export default Memo;
