
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTypography12 from './IconTypography12';import IconTypography16 from './IconTypography16';import IconTypography20 from './IconTypography20';import IconTypography24 from './IconTypography24';import IconTypography32 from './IconTypography32'
    
    function IconTypography(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTypography12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTypography16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTypography20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTypography24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTypography32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTypography);
    export default Memo;
    