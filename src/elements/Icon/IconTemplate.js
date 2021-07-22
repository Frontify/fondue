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

      function ${componentName}(${props}) {
        const customClassName = ["flex items-center justify-center fill-current stroke-current", IconSize[props.size || IconSize.Size16]].join(' ');
        return ${jsx};
      }

      ${exports}
    `;
}

module.exports = IconTemplate;
