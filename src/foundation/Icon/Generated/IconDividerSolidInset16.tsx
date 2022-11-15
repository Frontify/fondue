import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerSolidInset16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDividerSolidInset16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 13.5a.167.167 0 0 0 .166-.167v-2.666a.5.5 0 1 1 1 0v2.666c0 .645-.522 1.167-1.166 1.167H4a1.167 1.167 0 0 1-1.167-1.167v-2.666a.5.5 0 1 1 1 0v2.666c0 .092.075.167.167.167h8Zm0-11c.092 0 .166.075.166.167v2.666a.5.5 0 0 0 1 0V2.667c0-.645-.522-1.167-1.166-1.167H4c-.644 0-1.167.522-1.167 1.167v2.666a.5.5 0 1 0 1 0V2.667c0-.092.075-.167.167-.167h8Zm1.333 5.489a.5.5 0 0 1-.5.5H3.167a.5.5 0 0 1 0-1h9.666a.5.5 0 0 1 .5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerSolidInset16);
