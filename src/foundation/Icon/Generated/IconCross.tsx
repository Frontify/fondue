
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCross12 from './IconCross12';import IconCross16 from './IconCross16';import IconCross20 from './IconCross20';import IconCross24 from './IconCross24';import IconCross32 from './IconCross32'
    
    function IconCross(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCross12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCross16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCross20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCross24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCross32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCross);
    export default Memo;
    