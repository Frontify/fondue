
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMapPointer12 from './IconMapPointer12';import IconMapPointer16 from './IconMapPointer16';import IconMapPointer20 from './IconMapPointer20';import IconMapPointer24 from './IconMapPointer24';import IconMapPointer32 from './IconMapPointer32'
    
    function IconMapPointer(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMapPointer12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMapPointer16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMapPointer20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMapPointer24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMapPointer32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMapPointer);
    export default Memo;
    