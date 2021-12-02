import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconWorkflow(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconWorkflow"
            {...props}
        >
            <path d="M2 3.918C2 2.858 2.858 2 3.92 2h4.621c1.06 0 1.92.86 1.92 1.918v16.164c0 1.06-.857 1.918-1.92 1.918h-4.62A1.92 1.92 0 0 1 2 20.082V3.918Zm1.538.577V5.66a.96.96 0 0 0 .963.956h3.46c.54 0 .962-.428.962-.956V4.495a.96.96 0 0 0-.963-.957H4.501a.954.954 0 0 0-.963.957Zm0 4.616v1.163a.96.96 0 0 0 .963.957h3.46c.54 0 .962-.429.962-.957V9.111a.96.96 0 0 0-.963-.957H4.501a.954.954 0 0 0-.963.957Zm0 4.615v1.163a.96.96 0 0 0 .963.957h3.46c.54 0 .962-.428.962-.957v-1.163a.96.96 0 0 0-.963-.957H4.501a.954.954 0 0 0-.963.957Zm0 4.615v1.164a.96.96 0 0 0 .963.957h3.46c.54 0 .962-.429.962-.957V18.34a.96.96 0 0 0-.963-.956H4.501a.954.954 0 0 0-.963.956Zm10-14.424c0-1.059.858-1.917 1.92-1.917h4.622C21.14 2 22 2.86 22 3.917v11.55a1.918 1.918 0 0 1-1.92 1.918h-4.621a1.92 1.92 0 0 1-1.92-1.918V3.917Zm1.539.578V5.66a.96.96 0 0 0 .963.956h3.459c.54 0 .963-.428.963-.956V4.495a.96.96 0 0 0-.963-.957h-3.46a.954.954 0 0 0-.962.957Zm0 4.616v1.163a.96.96 0 0 0 .963.957h3.459c.54 0 .963-.429.963-.957V9.111a.96.96 0 0 0-.963-.957h-3.46a.954.954 0 0 0-.962.957Zm0 4.615v1.163a.96.96 0 0 0 .963.957h3.459c.54 0 .963-.428.963-.957v-1.163a.96.96 0 0 0-.963-.957h-3.46a.954.954 0 0 0-.962.957Z" />
        </svg>
    );
}

const Memo = memo(IconWorkflow);
export default Memo;
