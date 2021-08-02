/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TemplateData, TemplateOptions } from "@svgr/core";

export default function IconTemplate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { template }: { template: any },
    _opts: TemplateOptions,
    { interfaces, componentName, jsx, imports, exports }: TemplateData,
): string {
    const typeScriptTpl = template.smart({ plugins: ["typescript"] });

    return typeScriptTpl.ast`
      ${imports}
      import IconProps from "@elements/Icon/IconProps";
      import IconSize from "@elements/Icon/IconSize";

      ${interfaces}

      const iconSizeMap = {
          [IconSize.Size8]: "h-2 w-2",
          [IconSize.Size12]: "h-3 w-3",
          [IconSize.Size16]: "h-4 w-4",
          [IconSize.Size20]: "h-5 w-5",
          [IconSize.Size24]: "h-6 w-6",
          [IconSize.Size32]: "h-8 w-8",
      };

      function ${componentName}(props: IconProps): React.ReactElement<IconProps> {
        const customClassName = ["flex items-center justify-center fill-current", iconSizeMap[props.size || IconSize.Size16]].join(' ');

        return ${jsx};
      }

      ${exports}
    `;
}
