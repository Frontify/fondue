/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Template } from '@svgr/babel-plugin-transform-svg-component';

export const IconTemplate: Template = ({ interfaces, componentName, jsx }, { tpl }) => {
    return tpl`
      import { ReactElement, memo } from "react";
      import { GeneratedIconProps } from "@foundation/Icon/IconProps";

      ${interfaces}

      function ${componentName}(props: GeneratedIconProps): ReactElement<GeneratedIconProps> {
        const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";

        return ${jsx};
      }

      export default memo(${componentName});
    `;
};
