
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconStackHorizontalAltThree12 from './IconStackHorizontalAltThree12';import IconStackHorizontalAltThree16 from './IconStackHorizontalAltThree16';import IconStackHorizontalAltThree20 from './IconStackHorizontalAltThree20';import IconStackHorizontalAltThree24 from './IconStackHorizontalAltThree24';import IconStackHorizontalAltThree32 from './IconStackHorizontalAltThree32'
    
    function IconStackHorizontalAltThree(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconStackHorizontalAltThree12 {...props}/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconStackHorizontalAltThree16 {...props}/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconStackHorizontalAltThree20 {...props}/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconStackHorizontalAltThree24 {...props}/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconStackHorizontalAltThree32 {...props}/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconStackHorizontalAltThree);
    export default Memo;
    