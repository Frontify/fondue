
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconStackHorizontalAltFour12 from './IconStackHorizontalAltFour12';import IconStackHorizontalAltFour16 from './IconStackHorizontalAltFour16';import IconStackHorizontalAltFour20 from './IconStackHorizontalAltFour20';import IconStackHorizontalAltFour24 from './IconStackHorizontalAltFour24';import IconStackHorizontalAltFour32 from './IconStackHorizontalAltFour32'
    
    function IconStackHorizontalAltFour(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconStackHorizontalAltFour12 {...props}/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconStackHorizontalAltFour16 {...props}/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconStackHorizontalAltFour20 {...props}/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconStackHorizontalAltFour24 {...props}/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconStackHorizontalAltFour32 {...props}/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconStackHorizontalAltFour);
    export default Memo;
    