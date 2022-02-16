
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTriangle12 from './IconTriangle12';import IconTriangle16 from './IconTriangle16';import IconTriangle20 from './IconTriangle20';import IconTriangle24 from './IconTriangle24';import IconTriangle32 from './IconTriangle32'
    
    function IconTriangle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTriangle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTriangle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTriangle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTriangle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTriangle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTriangle);
    export default Memo;
    