import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCursorClick32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCursorClick32"
            {...props}
        >
            <path
                fill="currentColor"
                d="m29.181 24.694-4-4 3.387-1.613a.8.8 0 0 0-.067-1.467l-3.84-1.333c.112-.625.17-1.259.173-1.894a11.107 11.107 0 1 0-11.093 11.107 9.75 9.75 0 0 0 1.253-.093h.334c.386-.055.768-.13 1.146-.227l.254-.08c.186 0 .36-.093.533-.16l1.067 2.933a.8.8 0 0 0 1.48.067l1.6-3.373 4 4a.532.532 0 0 0 .76 0l3.013-3.014a.56.56 0 0 0 0-.853Zm-12.72-1.627c-.293.094-.6.16-.907.227l-.4.08a9.323 9.323 0 0 1-1.333.12 9.107 9.107 0 1 1 9.093-9.107c-.006.384-.033.767-.08 1.147l-2.053-.747a4.423 4.423 0 0 0 0-.44 7.12 7.12 0 1 0-4.88 6.667l.72 1.987-.16.066Zm-3.293-9.586 2.053 5.666c-.464.156-.95.237-1.44.24a5 5 0 1 1 4.973-5.333l-4.56-1.587a.8.8 0 0 0-1.026 1.014ZM25.78 26.014l-4-4-.933-.933-1.334 2.746-.28.6-.133-.36-.693-1.893-1.587-4.4-.827-2.56 4.387 1.6 1.987.72 1.88.68.973.347-2.12 1.013-1.227.573.64.654 4.28 4.28-1.013.933Z"
            />
        </svg>
    );
}

const Memo = memo(IconCursorClick32);
export default Memo;
