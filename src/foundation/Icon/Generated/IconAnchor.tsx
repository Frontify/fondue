
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconAnchor12 from './IconAnchor12';import IconAnchor16 from './IconAnchor16';import IconAnchor20 from './IconAnchor20';import IconAnchor24 from './IconAnchor24';import IconAnchor32 from './IconAnchor32'
    
    function IconAnchor(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconAnchor12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconAnchor16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconAnchor20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconAnchor24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconAnchor32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconAnchor);
    export default Memo;
    