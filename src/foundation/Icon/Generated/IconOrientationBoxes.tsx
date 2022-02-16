
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconOrientationBoxes12 from './IconOrientationBoxes12';import IconOrientationBoxes16 from './IconOrientationBoxes16';import IconOrientationBoxes20 from './IconOrientationBoxes20';import IconOrientationBoxes24 from './IconOrientationBoxes24';import IconOrientationBoxes32 from './IconOrientationBoxes32'
    
    function IconOrientationBoxes(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconOrientationBoxes12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconOrientationBoxes16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconOrientationBoxes20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconOrientationBoxes24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconOrientationBoxes32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconOrientationBoxes);
    export default Memo;
    