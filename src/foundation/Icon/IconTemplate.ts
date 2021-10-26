/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TemplateData, TemplateOptions } from "@svgr/core";

export default function IconTemplate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { template }: { template: any },
    _opts: TemplateOptions,
    { interfaces, componentName, jsx, exports }: TemplateData,
): string {
    const typeScriptTpl = template.smart({ plugins: ["typescript"] });

    return typeScriptTpl.ast`
      import React from "react";
      import { IconProps } from "@elements/Icon/IconProps";
      import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

      ${interfaces}

      function ${componentName}(props: IconProps): React.ReactElement<IconProps> {
        const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current", IconSizeMap[props.size || IconSize.Size16]].join(' ');

        return ${jsx};
      }

      ${exports}
    `;
}
