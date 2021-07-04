/* (c) Copyright Frontify Ltd., all rights reserved. */

function IconTemplate({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) {
    const plugins = ["jsx"];

    if (opts.typescript) {
        plugins.push("typescript");
    }

    const typeScriptTpl = template.smart({ plugins });

    return typeScriptTpl.ast`
      ${imports}

      import { IconSize } from '@components/Icon/Icon';
      import css from '@components/Icon/Icon.module.css';

      ${interfaces}

      function ${componentName}(${props}) {
        const customClassName = [css.icon, css[props.size || IconSize.Size16]].join(' ');
        return ${jsx};
      }

      ${exports}
    `;
}

module.exports = IconTemplate;
