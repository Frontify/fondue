
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconJohanna12 from './IconJohanna12';import IconJohanna16 from './IconJohanna16';import IconJohanna20 from './IconJohanna20';import IconJohanna24 from './IconJohanna24';import IconJohanna32 from './IconJohanna32'
    
    function IconJohanna(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconJohanna12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconJohanna16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconJohanna20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconJohanna24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconJohanna32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconJohanna);
    export default Memo;
    