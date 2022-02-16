
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLink12 from './IconLink12';import IconLink16 from './IconLink16';import IconLink20 from './IconLink20';import IconLink24 from './IconLink24';import IconLink32 from './IconLink32'
    
    function IconLink(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLink12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLink16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLink20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLink24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLink32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLink);
    export default Memo;
    