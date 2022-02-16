
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLines12 from './IconLines12';import IconLines16 from './IconLines16';import IconLines20 from './IconLines20';import IconLines24 from './IconLines24';import IconLines32 from './IconLines32'
    
    function IconLines(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLines12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLines16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLines20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLines24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLines32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLines);
    export default Memo;
    