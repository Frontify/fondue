/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Template } from '@svgr/babel-plugin-transform-svg-component';

export const IconTemplate: Template = ({ interfaces, componentName, jsx, exports }, { tpl }) => {
    return tpl`
      import React, { memo } from "react";
      import { GeneratedIconProps } from "@foundation/Icon/IconProps";

      ${interfaces}

      function ${componentName}(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const customClassName = "tw-inline-flex tw-justify-center tw-items-center tw-fill-current";

        return ${jsx};
      }

      ${exports}
    `;
};
