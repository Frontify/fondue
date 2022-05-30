/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Template } from '@svgr/babel-plugin-transform-svg-component';

export const IconTemplate: Template = ({ interfaces, componentName, jsx, exports }, { tpl }) => {
    return tpl`
      import React, { memo } from "react";
      import { GeneratedIconProps } from "@foundation/Icon/IconProps";
      import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

      ${interfaces}

      function ${componentName}(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current", IconSizeMap[props.size || IconSize.Size16]].join(' ');

        return ${jsx};
      }

      ${exports}
    `;
};
