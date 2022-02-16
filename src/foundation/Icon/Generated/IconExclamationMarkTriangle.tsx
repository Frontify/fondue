
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconExclamationMarkTriangle12 from './IconExclamationMarkTriangle12';import IconExclamationMarkTriangle16 from './IconExclamationMarkTriangle16';import IconExclamationMarkTriangle20 from './IconExclamationMarkTriangle20';import IconExclamationMarkTriangle24 from './IconExclamationMarkTriangle24';import IconExclamationMarkTriangle32 from './IconExclamationMarkTriangle32'
    
    function IconExclamationMarkTriangle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconExclamationMarkTriangle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconExclamationMarkTriangle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconExclamationMarkTriangle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconExclamationMarkTriangle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconExclamationMarkTriangle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconExclamationMarkTriangle);
    export default Memo;
    