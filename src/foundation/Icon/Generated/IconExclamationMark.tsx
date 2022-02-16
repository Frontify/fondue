
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconExclamationMark12 from './IconExclamationMark12';import IconExclamationMark16 from './IconExclamationMark16';import IconExclamationMark20 from './IconExclamationMark20';import IconExclamationMark24 from './IconExclamationMark24';import IconExclamationMark32 from './IconExclamationMark32'
    
    function IconExclamationMark(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconExclamationMark12 {...props}/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconExclamationMark16 {...props}/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconExclamationMark20 {...props}/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconExclamationMark24 {...props}/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconExclamationMark32 {...props}/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconExclamationMark);
    export default Memo;
    