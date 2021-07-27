/* (c) Copyright Frontify Ltd., all rights reserved. */

function IconTemplate({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) {
    const plugins = ["jsx"];

    if (opts.typescript) {
        plugins.push("typescript");
    }

    const typeScriptTpl = template.smart({ plugins });

    return typeScriptTpl.ast`
      ${imports}

      import { IconSize } from '@elements/Icon/Icon';

      ${interfaces}

      const iconSizeMap = {
          [IconSize.Size8]: "h-2 w-2",
          [IconSize.Size12]: "h-3 w-3",
          [IconSize.Size16]: "h-4 w-4",
          [IconSize.Size20]: "h-5 w-5",
          [IconSize.Size24]: "h-6 w-6",
          [IconSize.Size32]: "h-8 w-8",
      };

      function ${componentName}(${props}) {
        const customClassName = ["flex items-center justify-center fill-current", iconSizeMap[props.size || IconSize.Size16]].join(' ');
        return ${jsx};
      }

      ${exports}
    `;
}

module.exports = IconTemplate;
