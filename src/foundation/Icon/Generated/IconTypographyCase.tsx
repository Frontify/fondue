
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTypographyCase12 from './IconTypographyCase12';import IconTypographyCase16 from './IconTypographyCase16';import IconTypographyCase20 from './IconTypographyCase20';import IconTypographyCase24 from './IconTypographyCase24';import IconTypographyCase32 from './IconTypographyCase32'
    
    function IconTypographyCase(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTypographyCase12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTypographyCase16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTypographyCase20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTypographyCase24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTypographyCase32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTypographyCase);
    export default Memo;
    