
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconFaceNeutral12Filled from './IconFaceNeutral12Filled';import IconFaceNeutral12 from './IconFaceNeutral12';import IconFaceNeutral16Filled from './IconFaceNeutral16Filled';import IconFaceNeutral16 from './IconFaceNeutral16';import IconFaceNeutral20Filled from './IconFaceNeutral20Filled';import IconFaceNeutral20 from './IconFaceNeutral20';import IconFaceNeutral24Filled from './IconFaceNeutral24Filled';import IconFaceNeutral24 from './IconFaceNeutral24';import IconFaceNeutral32Filled from './IconFaceNeutral32Filled';import IconFaceNeutral32 from './IconFaceNeutral32'
    
    function IconFaceNeutral(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconFaceNeutral12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconFaceNeutral12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconFaceNeutral16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconFaceNeutral16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconFaceNeutral20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconFaceNeutral20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconFaceNeutral24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconFaceNeutral24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconFaceNeutral32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconFaceNeutral32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconFaceNeutral);
    export default Memo;
    