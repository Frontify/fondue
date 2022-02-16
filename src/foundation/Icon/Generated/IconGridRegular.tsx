
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconGridRegular12Filled from './IconGridRegular12Filled';import IconGridRegular12 from './IconGridRegular12';import IconGridRegular16Filled from './IconGridRegular16Filled';import IconGridRegular16 from './IconGridRegular16';import IconGridRegular20Filled from './IconGridRegular20Filled';import IconGridRegular20 from './IconGridRegular20';import IconGridRegular24Filled from './IconGridRegular24Filled';import IconGridRegular24 from './IconGridRegular24';import IconGridRegular32Filled from './IconGridRegular32Filled';import IconGridRegular32 from './IconGridRegular32'
    
    function IconGridRegular(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconGridRegular12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconGridRegular12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconGridRegular16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconGridRegular16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconGridRegular20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconGridRegular20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconGridRegular24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconGridRegular24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconGridRegular32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconGridRegular32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconGridRegular);
    export default Memo;
    