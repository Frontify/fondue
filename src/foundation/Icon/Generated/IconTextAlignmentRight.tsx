
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTextAlignmentRight12 from './IconTextAlignmentRight12';import IconTextAlignmentRight16 from './IconTextAlignmentRight16';import IconTextAlignmentRight20 from './IconTextAlignmentRight20';import IconTextAlignmentRight24 from './IconTextAlignmentRight24';import IconTextAlignmentRight32 from './IconTextAlignmentRight32'
    
    function IconTextAlignmentRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTextAlignmentRight12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTextAlignmentRight16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTextAlignmentRight20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTextAlignmentRight24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTextAlignmentRight32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTextAlignmentRight);
    export default Memo;
    