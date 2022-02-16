
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconWorkflowLanes12 from './IconWorkflowLanes12';import IconWorkflowLanes16 from './IconWorkflowLanes16';import IconWorkflowLanes20 from './IconWorkflowLanes20';import IconWorkflowLanes24 from './IconWorkflowLanes24';import IconWorkflowLanes32 from './IconWorkflowLanes32'
    
    function IconWorkflowLanes(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconWorkflowLanes12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconWorkflowLanes16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconWorkflowLanes20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconWorkflowLanes24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconWorkflowLanes32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconWorkflowLanes);
    export default Memo;
    