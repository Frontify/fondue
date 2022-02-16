/* (c) Copyright Frontify Ltd., all rights reserved. */
type IconShapeTemplateInputs = {
    imports: Array<String>;
    shapeName: String;
    components: Array<String>;
};

export const IconTemplateDynamic = (props: IconShapeTemplateInputs) => {
    return `
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    ${props.imports.join(";")}
    
    function Icon${props.shapeName}(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                ${props.components.join("")}
            </span>
        );
    }
    
    const Memo = memo(Icon${props.shapeName});
    export default Memo;
    `;
};
