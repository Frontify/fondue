
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconWorkflowShapes12 from './IconWorkflowShapes12';import IconWorkflowShapes16 from './IconWorkflowShapes16';import IconWorkflowShapes20 from './IconWorkflowShapes20';import IconWorkflowShapes24 from './IconWorkflowShapes24';import IconWorkflowShapes32 from './IconWorkflowShapes32'
    
    function IconWorkflowShapes(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconWorkflowShapes12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconWorkflowShapes16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconWorkflowShapes20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconWorkflowShapes24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconWorkflowShapes32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconWorkflowShapes);
    export default Memo;
    