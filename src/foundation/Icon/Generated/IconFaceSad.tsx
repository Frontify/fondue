
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconFaceSad12Filled from './IconFaceSad12Filled';import IconFaceSad12 from './IconFaceSad12';import IconFaceSad16Filled from './IconFaceSad16Filled';import IconFaceSad16 from './IconFaceSad16';import IconFaceSad20Filled from './IconFaceSad20Filled';import IconFaceSad20 from './IconFaceSad20';import IconFaceSad24Filled from './IconFaceSad24Filled';import IconFaceSad24 from './IconFaceSad24';import IconFaceSad32Filled from './IconFaceSad32Filled';import IconFaceSad32 from './IconFaceSad32'
    
    function IconFaceSad(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconFaceSad12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconFaceSad12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconFaceSad16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconFaceSad16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconFaceSad20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconFaceSad20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconFaceSad24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconFaceSad24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconFaceSad32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconFaceSad32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconFaceSad);
    export default Memo;
    