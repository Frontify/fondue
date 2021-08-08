import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconRevert(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconRevert"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.36 10.651a.885.885 0 01-.861-.86v-.027l.025-6.37a.906.906 0 01.868-.894h.034a.887.887 0 01.861.888l-.015 4.095C5.934 4.46 8.842 2.8 12.151 2.8a9.35 9.35 0 010 18.7c-4.963 0-9.022-3.866-9.331-7.75a.862.862 0 01-.006-.1c0-.47.38-1 .85-1s.857.53.853 1c.257 2.992 3.577 6.15 7.634 6.15a7.65 7.65 0 000-15.3c-2.846 0-5.329 1.482-6.647 4.38l4.259-.016a.885.885 0 01.888.86l-.001.035a.908.908 0 01-.894.867l-6.396.025z"
            />
        </svg>
    );
}

const MemoIconRevert = React.memo(IconRevert);
export default MemoIconRevert;
